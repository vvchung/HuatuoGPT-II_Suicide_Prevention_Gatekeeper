export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export enum SafetyLabel {
  SAFE = 'SAFE',
  SUICIDE_RISK = 'SUICIDE_RISK',
  PRESCRIPTION_REQUEST = 'PRESCRIPTION_REQUEST'
}

export type Language = 
  | 'en'     // English (International/US context for Judges)
  | 'zh-TW'  // Traditional Chinese (Taiwan context)
  | 'zh-CN'  // Simplified Chinese
  | 'ja'     // Japanese
  | 'ko'     // Korean
  | 'vi'     // Vietnamese
  | 'id'     // Indonesian
  | 'th'     // Thai
  | 'ms'     // Malay
  | 'hi';    // Hindi

export interface Message {
  id: string;
  role: Role;
  text: string;
  isThinking?: boolean;
  safetyLabel?: SafetyLabel; // For internal tracking of the guardrail result
  timestamp: number;
}

export interface GuardrailResponse {
  label: SafetyLabel;
  reasoning: string;
}