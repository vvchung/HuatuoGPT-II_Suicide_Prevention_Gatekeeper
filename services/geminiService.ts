import { GoogleGenAI, Type } from "@google/genai";
import { Message, Role, SafetyLabel, GuardrailResponse, Language } from "../types";
import { SYSTEM_INSTRUCTION_ZH, SYSTEM_INSTRUCTION_EN, GUARDRAIL_PROMPT } from "../constants";

// Helper to get API key
const getApiKey = () => process.env.API_KEY || '';

// Initialize client
const createClient = () => new GoogleGenAI({ apiKey: getApiKey() });

/**
 * Stage 1: The Guardrail (Simulating BART-large-mnli)
 * Uses the fast gemini-2.5-flash model to classify intent.
 */
export const runGuardrail = async (inputText: string): Promise<GuardrailResponse> => {
  const client = createClient();
  
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: GUARDRAIL_PROMPT + `\n\nUser Input: "${inputText}"` }] }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING, enum: [SafetyLabel.SAFE, SafetyLabel.SUICIDE_RISK, SafetyLabel.PRESCRIPTION_REQUEST] },
            reasoning: { type: Type.STRING }
          },
          required: ['label']
        },
        temperature: 0.1 // Low temperature for consistent classification
      }
    });

    const result = JSON.parse(response.text || '{}') as GuardrailResponse;
    return result;
  } catch (error) {
    console.error("Guardrail check failed, defaulting to SAFE:", error);
    return { label: SafetyLabel.SAFE, reasoning: "Error in guardrail" };
  }
};

/**
 * Stage 2: The Core Chat (HuatuoGPT-II)
 * Uses gemini-3-pro-preview for deep empathy and reasoning.
 */
export const streamChatResponse = async (
  history: Message[], 
  userInput: string, 
  safetyContext: GuardrailResponse,
  language: Language,
  onChunk: (text: string) => void
): Promise<string> => {
  const client = createClient();

  // Select base instruction based on language
  let dynamicInstruction = language === 'en' ? SYSTEM_INSTRUCTION_EN : SYSTEM_INSTRUCTION_ZH;
  
  // Dynamic adjustments based on safety context
  if (safetyContext.label === SafetyLabel.SUICIDE_RISK) {
    dynamicInstruction += `\n\n[CRITICAL WARNING]: The user has been classified as SUICIDE RISK. Activate CRISIS INTERVENTION MODE immediately. 
    1. Acknowledge their pain validation. 
    2. Do not leave them alone in the conversation. 
    3. Gently guide them to call ${language === 'en' ? '988 or 911' : '1925 or 119'}. 
    4. Use short, grounding sentences.`;
  } else if (safetyContext.label === SafetyLabel.PRESCRIPTION_REQUEST) {
    dynamicInstruction += `\n\n[WARNING]: User is asking for prescriptions. Politely REFUSE to prescribe medication. Explain that you are an AI assistant, not a doctor, and provide general health education instead.`;
  }

  // Convert app history to API history format
  const apiHistory = history.map(msg => ({
    role: msg.role === Role.USER ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const chat = client.chats.create({
    model: 'gemini-3-pro-preview',
    history: apiHistory,
    config: {
      systemInstruction: dynamicInstruction,
      temperature: 0.7,
      maxOutputTokens: 8192, // Ensure long responses are not truncated
    }
  });

  try {
    const resultStream = await chat.sendMessageStream({ message: userInput });
    
    let fullText = '';
    for await (const chunk of resultStream) {
      const text = chunk.text || '';
      fullText += text;
      onChunk(fullText);
    }
    return fullText;
  } catch (error) {
    console.error("Chat generation failed:", error);
    throw error;
  }
};