import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { Message, Role, SafetyLabel, GuardrailResponse, Language } from "../types";
import { GET_SYSTEM_INSTRUCTION, GUARDRAIL_PROMPT } from "../constants";

// Helper to get API key
const getApiKey = () => process.env.API_KEY || '';

// Initialize client
const createClient = () => new GoogleGenAI({ apiKey: getApiKey() });

/**
 * PII Sanitizer based on Cross-domain De-identification Guide (Medical x Legal)
 */
const sanitizePII = (text: string): string => {
  let sanitized = text;

  const patterns = {
    // 身分證號 / 居留證號
    id: /[A-Z][12]\d{8}/g,
    // 電話號碼 (手機、市話、國際碼)
    phone: /(09\d{8})|(\d{2,4}-\d{6,8})|(\+886\d{9})/g,
    // 具體日期 (YYYY/MM/DD, YYYY-MM-DD, 某年某月某日)
    date: /\d{4}[-/年]\d{1,2}[-/月]\d{1,2}日?/g,
    // 地址關鍵字 (路, 街, 巷, 弄, 號, 樓)
    address: /[^,\s\n]+[路街巷弄號樓]/g,
    // 姓名引導格式 (姓名：王大明) -> 轉為「當事人」
    nameIntro: /姓名[:：]\s?[\u4e00-\u9fa5]{2,4}/g,
    // 車牌號碼
    plate: /[A-Z]{1,3}-\d{3,4}/g,
    // 法院案號 (例如：112-123字第456號)
    caseNo: /\d{1,3}-\d{1,3}字第\d+號/g
  };

  const sensitiveTerms = [
    "義大醫院", "高雄榮總", "長庚醫院", "海軍總醫院", "健仁醫院", "右昌聯合醫院",
    "高雄地方法院", "橋頭地院", "台北地院", "台中地院",
    "台積電", "中華電信", "鴻海",
    "小港區百貨", "信義區百貨", "夢時代"
  ];

  sanitized = sanitized.replace(patterns.id, "[ID]");
  sanitized = sanitized.replace(patterns.phone, "[CONTACT]");
  sanitized = sanitized.replace(patterns.date, "[DATE]");
  sanitized = sanitized.replace(patterns.address, "[ADDR]");
  sanitized = sanitized.replace(patterns.nameIntro, "姓名：當事人");
  sanitized = sanitized.replace(patterns.plate, "[VEHICLE]");
  sanitized = sanitized.replace(patterns.caseNo, "[ID]"); // 案號也歸類為 ID

  sensitiveTerms.forEach(term => {
    // 根據功能化地點原則替換
    let replacement = "[PLACE]";
    if (term.includes("醫院")) replacement = "某醫療院所";
    if (term.includes("法院") || term.includes("地院")) replacement = "某法院";
    if (term.includes("公司") || term.includes("電")) replacement = "某企業";
    
    sanitized = sanitized.split(term).join(replacement);
  });

  return sanitized;
};

/**
 * Stage 1: The Guardrail (Simulating BART-large-mnli)
 */
export const runGuardrail = async (inputText: string): Promise<GuardrailResponse> => {
  const client = createClient();
  const sanitizedText = sanitizePII(inputText);
  
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: GUARDRAIL_PROMPT + `\n\nUser Input: "${sanitizedText}"` }] }
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
        temperature: 0.1,
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE }
        ]
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
 */
export const streamChatResponse = async (
  history: Message[], 
  userInput: string, 
  safetyContext: GuardrailResponse,
  language: Language,
  onChunk: (text: string) => void
): Promise<string> => {
  const client = createClient();
  const sanitizedInput = sanitizePII(userInput);

  // Get dynamic instruction base
  let dynamicInstruction = GET_SYSTEM_INSTRUCTION(language);
  
  // Dynamic adjustments based on safety context
  if (safetyContext.label === SafetyLabel.SUICIDE_RISK) {
    const emergencyNum = '1925 or 119';

    dynamicInstruction += `\n\n[CRITICAL]: ACTIVATE CRISIS MODE. 1. Validate pain. 2. Guide to ${emergencyNum}. 3. Stay grounded.`;
  }

  const apiHistory = history.map(msg => ({
    role: msg.role === Role.USER ? 'user' : 'model',
    parts: [{ text: sanitizePII(msg.text) }] // Ensure history is also sanitized
  }));

  const chat = client.chats.create({
    model: 'gemini-3-pro-preview',
    history: apiHistory,
    config: {
      systemInstruction: dynamicInstruction,
      temperature: 0.7,
      maxOutputTokens: 8192,
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE }
      ]
    }
  });

  try {
    const resultStream = await chat.sendMessageStream({ message: sanitizedInput });
    
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
