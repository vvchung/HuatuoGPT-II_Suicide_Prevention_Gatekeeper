import { SafetyLabel, Language } from './types';

// --- System Instructions Generator ---

/**
 * Generates the system instruction based on the language.
 * 
 * Strategy:
 * - 'en': Uses US/International context for Hackathon Judges (911/988).
 * - 'zh-TW': Uses Taiwan context (119/1925).
 * - All others (International Students in Taiwan): Use Native Language + Taiwan Resources (119/1925).
 */
export const GET_SYSTEM_INSTRUCTION = (lang: Language): string => {
  const commonPersonality = `
You are HuatuoGPT-II, a compassionate mental health gatekeeper with professional medical knowledge (simulated Pharmacist/Counselor level).
Your goal is to provide warm, supportive dialogue, perform crisis intervention, and provide correct health education.

**Core Personality & Principles:**
1.  **Empathetic Listening**: Use a warm, non-judgmental tone. Validate emotions first, then address solutions.
2.  **Professional Boundaries**: You can provide medical knowledge and psychological support, but **NEVER prescribe medication**.
3.  **Anti-Victim Blaming**: Stand firmly on the side of "It's not the victim's fault."
`;

  // 1. English (International/Judge Context)
  if (lang === 'en') {
    return `${commonPersonality}
**Context**: You are helping a user in an International/US setting (Demo Mode).
**Language**: English.
**Resources**: 
- Emergency: 911
- Suicide & Crisis Lifeline: 988
- Crisis Text Line: Text HOME to 741741

If danger is detected, prioritize crisis assessment and promote 988.
`;
  }

  // 2. Traditional Chinese (Taiwan Context)
  if (lang === 'zh-TW') {
    return `
你現在是 HuatuoGPT-II (華佗GPT II)，一個具備專業醫療知識（通過2023年執業藥師考試）且擁有高度同理心的心理健康守門員。
你的目標是提供溫暖、支持性的對話，進行危機干預，並提供正確的醫療衛生教育。

**核心人格與原則：**
1.  **同理心傾聽**：使用溫暖、不評判的語氣（繁體中文）。先同理情緒，再處理解決方案。
2.  **專業界線**：你可以提供醫療知識、心理支持和法律常識（特別是台灣法規），但**絕不能開立處方箋**。
3.  **自殺防治**：若偵測到危險，優先進行危機評估，提供 1925、1995 等資源。
4.  **反對二度傷害**：對於性騷擾、性侵害受害者，絕對站在「非受害者之錯」的立場。

**知識庫（台灣適用）：**
*   **緊急專線**：110 (報警), 119 (救護車), 113 (保護專線), 1925 (依舊愛我-安心專線), 1995 (生命線)。
*   **法律資源**：性別平等教育法、性侵害犯罪防治法。

請用溫柔、堅定、像是一位充滿智慧的守護者的口吻對話。
`;
  }

  // 3. International Students in Taiwan (Native Lang + Taiwan Resources)
  // We construct a prompt that instructs the model to speak the target language but use Taiwan numbers.
  const langNameMap: Record<string, string> = {
    'zh-CN': 'Simplified Chinese (简体中文)',
    'ja': 'Japanese (日本語)',
    'ko': 'Korean (한국어)',
    'vi': 'Vietnamese (Tiếng Việt)',
    'id': 'Indonesian (Bahasa Indonesia)',
    'th': 'Thai (ภาษาไทย)',
    'ms': 'Malay (Bahasa Melayu)',
    'hi': 'Hindi (हिंदी)'
  };

  const targetLang = langNameMap[lang] || 'English';

  return `${commonPersonality}
**Context**: You are helping an international student **currently studying in Taiwan**.
**Language**: You must reply in **${targetLang}**.
**Resources (Taiwan Local)**:
- Emergency (Ambulance/Police): **119** (Universal in Taiwan) or 110.
- Suicide Prevention Hotline: **1925** (An-Xin Line).
- Foreigner Services: 1990.

**Critical Instruction**: Even though you are speaking ${targetLang}, you MUST provide **Taiwanese emergency numbers (119, 1925)** because the user is physically in Taiwan. Do not give numbers for their home country.
`;
};

// --- Guardrail Prompt ---

export const GUARDRAIL_PROMPT = `
You are a fast safety classifier acting as a guardrail. 
Analyze the user's input and classify it into one of three categories:

1. "${SafetyLabel.SUICIDE_RISK}": The user expresses intent to harm themselves, hopelessness, or acts of suicide.
2. "${SafetyLabel.PRESCRIPTION_REQUEST}": The user is asking for specific prescription drugs or medical diagnosis that requires a doctor.
3. "${SafetyLabel.SAFE}": General conversation, mental health distress (without immediate suicide intent), legal questions, or seeking comfort.

Return ONLY a JSON object: { "label": "CATEGORY", "reasoning": "brief explanation" }
`;

// --- UI Translations ---

type TranslationSet = {
  title: string;
  subtitle: string;
  callPolice: string;
  callHotline: string;
  callHotlineNum: string;
  callPoliceNum: string;
  mindfulness: string;
  mindfulnessTitle: string;
  mindfulnessDesc: string;
  inhale: string;
  hold: string;
  exhale: string;
  inputPlaceholder: string;
  disclaimer: string;
  welcome: string;
  safetySafe: string;
  safetyRisk: string;
  safetyPrescription: string;
  guardrailLabel: string;
  errorMsg: string;
};

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  'zh-TW': {
    title: 'HuatuoGPT-II',
    subtitle: '自殺防治守門員',
    callPolice: '撥打 119',
    callHotline: '撥打 1925',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: '正念呼吸',
    mindfulnessTitle: '正念呼吸 4-2-6',
    mindfulnessDesc: '跟隨圓圈的縮放調整呼吸，這能幫助活化副交感神經，緩解焦慮。',
    inhale: '吸氣',
    hold: '屏氣',
    exhale: '慢慢吐氣',
    inputPlaceholder: '請輸入您的對話... (Shift + Enter 換行)',
    disclaimer: 'AI 提供的資訊僅供參考，緊急情況請務必尋求專業協助。',
    welcome: '你好，我是 HuatuoGPT-II。我具備專業醫療知識，是你在台灣求學期間的健康守護者。\n\n我可以為您提供健康諮詢或心理支持。請注意，我無法開立處方。若有緊急狀況，我會協助您聯繫台灣的緊急資源 (119/1925)。\n\n這裡是一個安全的空間，我會在這裡聽你說。',
    safetySafe: '安全',
    safetyRisk: '自殺風險',
    safetyPrescription: '處方請求',
    guardrailLabel: '守衛檢測',
    errorMsg: '連線發生錯誤，請稍後再試。若有緊急狀況請直接撥打 119 或 1925。'
  },
  'en': {
    title: 'HuatuoGPT-II',
    subtitle: 'Suicide Prevention',
    callPolice: 'Call 911',
    callHotline: 'Call 988',
    callHotlineNum: '988', // US Judge Context
    callPoliceNum: '911',  // US Judge Context
    mindfulness: 'Breathe',
    mindfulnessTitle: 'Mindful Breathing 4-2-6',
    mindfulnessDesc: 'Follow the circle to regulate your breathing to reduce anxiety.',
    inhale: 'Inhale',
    hold: 'Hold',
    exhale: 'Exhale',
    inputPlaceholder: 'Type your message here...',
    disclaimer: 'AI info is for reference. For emergencies, seek professional help.',
    welcome: 'Hello, I am HuatuoGPT-II. I am an AI mental health companion.\n\nI can provide health education and emotional support. Note: I cannot prescribe medication.\n\n(Demo Mode: Using US Emergency Numbers 911/988)',
    safetySafe: 'SAFE',
    safetyRisk: 'RISK',
    safetyPrescription: 'RX REQ',
    guardrailLabel: 'Guardrail',
    errorMsg: 'Connection error. Dial 911 or 988 if urgent.'
  },
  'zh-CN': {
    title: 'HuatuoGPT-II',
    subtitle: '自杀防治守门员',
    callPolice: '拨打 119',
    callHotline: '拨打 1925',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: '正念呼吸',
    mindfulnessTitle: '正念呼吸 4-2-6',
    mindfulnessDesc: '跟随圆圈缩放调整呼吸，活化副交感神经，缓解焦虑。',
    inhale: '吸气',
    hold: '屏气',
    exhale: '慢慢吐气',
    inputPlaceholder: '请输入对话... (Shift + Enter 换行)',
    disclaimer: 'AI 资讯仅供参考，紧急情况请寻求台湾专业协助。',
    welcome: '你好，我是 HuatuoGPT-II。作为你在台湾求学的健康守护者，我可以提供健康咨询与心理支持。\n\n若有紧急心理困扰，我会协助你联系台湾的紧急资源 (1925/119)。这里很安全，我会陪着你。',
    safetySafe: '安全',
    safetyRisk: '风险',
    safetyPrescription: '处方请求',
    guardrailLabel: '检测',
    errorMsg: '连接错误。紧急情况请拨打 119 或 1925。'
  },
  'ja': {
    title: 'HuatuoGPT-II',
    subtitle: '自殺予防の守り手',
    callPolice: '119番通報',
    callHotline: '1925番相談',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: '呼吸法',
    mindfulnessTitle: 'マインドフルネス呼吸',
    mindfulnessDesc: '円の動きに合わせて呼吸を整え、不安を和らげましょう。',
    inhale: '吸って',
    hold: '止めて',
    exhale: '吐いて',
    inputPlaceholder: 'メッセージを入力... (Shift+Enterで改行)',
    disclaimer: 'AIの情報は参考用です。緊急時は専門機関へ連絡してください。',
    welcome: 'こんにちは、HuatuoGPT-IIです。台湾で学ぶあなたの心の支えになります。\n\n医療知識や心理的サポートを提供できますが、薬の処方はできません。辛い時は、台湾の緊急連絡先 (119/1925) も案内します。安心してお話しください。',
    safetySafe: '安全',
    safetyRisk: 'リスク',
    safetyPrescription: '処方要求',
    guardrailLabel: 'ガードレール',
    errorMsg: 'エラーが発生しました。緊急時は119または1925へ。'
  },
  'ko': {
    title: 'HuatuoGPT-II',
    subtitle: '자살 예방 지킴이',
    callPolice: '119 전화',
    callHotline: '1925 전화',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: '호흡하기',
    mindfulnessTitle: '마음챙김 호흡 4-2-6',
    mindfulnessDesc: '원의 움직임에 맞춰 호흡하며 불안을 줄여보세요.',
    inhale: '들이마시기',
    hold: '멈춤',
    exhale: '내뱉기',
    inputPlaceholder: '메시지를 입력하세요...',
    disclaimer: 'AI 정보는 참고용입니다. 응급 상황 시 전문가의 도움을 받으세요.',
    welcome: '안녕하세요, HuatuoGPT-II입니다. 대만에서 유학 중인 당신의 건강을 지원합니다.\n\n건강 상담이나 심리적 지원을 제공할 수 있습니다. 응급 상황 시 대만의 긴급 번호(119/1925)를 안내해 드립니다. 이곳은 안전하니 편하게 말씀하세요.',
    safetySafe: '안전',
    safetyRisk: '위험',
    safetyPrescription: '처방 요청',
    guardrailLabel: '가드레일',
    errorMsg: '오류가 발생했습니다. 급한 경우 119나 1925로 전화하세요.'
  },
  'vi': {
    title: 'HuatuoGPT-II',
    subtitle: 'Phòng chống tự sát',
    callPolice: 'Gọi 119',
    callHotline: 'Gọi 1925',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: 'Thở',
    mindfulnessTitle: 'Hít thở chánh niệm',
    mindfulnessDesc: 'Hít thở theo vòng tròn để giảm lo âu và căng thẳng.',
    inhale: 'Hít vào',
    hold: 'Giữ',
    exhale: 'Thở ra',
    inputPlaceholder: 'Nhập tin nhắn...',
    disclaimer: 'Thông tin AI chỉ để tham khảo. Khẩn cấp hãy gọi trợ giúp.',
    welcome: 'Xin chào, tôi là HuatuoGPT-II. Tôi ở đây để hỗ trợ sức khỏe tinh thần cho bạn khi đang học tập tại Đài Loan.\n\nNếu bạn gặp khó khăn, tôi có thể giúp bạn kết nối với các nguồn hỗ trợ khẩn cấp tại Đài Loan (119/1925). Hãy yên tâm chia sẻ.',
    safetySafe: 'An toàn',
    safetyRisk: 'Rủi ro',
    safetyPrescription: 'Kê đơn',
    guardrailLabel: 'Kiểm duyệt',
    errorMsg: 'Lỗi kết nối. Khẩn cấp hãy gọi 119 hoặc 1925.'
  },
  'id': {
    title: 'HuatuoGPT-II',
    subtitle: 'Pencegahan Bunuh Diri',
    callPolice: 'Panggil 119',
    callHotline: 'Panggil 1925',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: 'Bernapas',
    mindfulnessTitle: 'Pernapasan Sadar',
    mindfulnessDesc: 'Ikuti lingkaran untuk mengatur napas dan meredakan kecemasan.',
    inhale: 'Tarik',
    hold: 'Tahan',
    exhale: 'Hembuskan',
    inputPlaceholder: 'Ketik pesan Anda...',
    disclaimer: 'Info AI hanya referensi. Untuk darurat, cari bantuan profesional.',
    welcome: 'Halo, saya HuatuoGPT-II. Saya di sini untuk mendukung kesehatan mental Anda selama studi di Taiwan.\n\nSaya tidak bisa meresepkan obat, tetapi saya bisa menemani Anda. Dalam keadaan darurat, hubungi nomor Taiwan 119 atau 1925.',
    safetySafe: 'Aman',
    safetyRisk: 'Risiko',
    safetyPrescription: 'Resep',
    guardrailLabel: 'Pengawal',
    errorMsg: 'Koneksi error. Darurat hubungi 119 atau 1925.'
  },
  'th': {
    title: 'HuatuoGPT-II',
    subtitle: 'ป้องกันการฆ่าตัวตาย',
    callPolice: 'โทร 119',
    callHotline: 'โทร 1925',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: 'ฝึกหายใจ',
    mindfulnessTitle: 'การหายใจอย่างมีสติ',
    mindfulnessDesc: 'หายใจตามวงกลมเพื่อผ่อนคลายความกังวล',
    inhale: 'หายใจเข้า',
    hold: 'กลั้น',
    exhale: 'หายใจออก',
    inputPlaceholder: 'พิมพ์ข้อความ...',
    disclaimer: 'AI ให้ข้อมูลเบื้องต้นเท่านั้น ฉุกเฉินโปรดติดต่อแพทย์',
    welcome: 'สวัสดี ฉันคือ HuatuoGPT-II ฉันพร้อมดูแลสุขภาพใจของคุณขณะเรียนที่ไต้หวัน\n\nฉันไม่สามารถสั่งยาได้ แต่ฉันพร้อมรับฟัง หากฉุกเฉิน โปรดติดต่อเบอร์ฉุกเฉินไต้หวัน 119 หรือ 1925',
    safetySafe: 'ปลอดภัย',
    safetyRisk: 'เสี่ยง',
    safetyPrescription: 'ขอยา',
    guardrailLabel: 'ตัวกรอง',
    errorMsg: 'เกิดข้อผิดพลาด ฉุกเฉินโทร 119 หรือ 1925'
  },
  'ms': {
    title: 'HuatuoGPT-II',
    subtitle: 'Pencegahan Bunuh Diri',
    callPolice: 'Hubungi 119',
    callHotline: 'Hubungi 1925',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: 'Bernafas',
    mindfulnessTitle: 'Pernafasan Minda',
    mindfulnessDesc: 'Ikut bulatan untuk mengawal pernafasan dan kurangkan keresahan.',
    inhale: 'Tarik',
    hold: 'Tahan',
    exhale: 'Hembus',
    inputPlaceholder: 'Taip mesej anda...',
    disclaimer: 'Info AI sebagai rujukan. Jika kecemasan, cari bantuan pakar.',
    welcome: 'Helo, saya HuatuoGPT-II. Saya sedia membantu kesihatan mental anda semasa belajar di Taiwan.\n\nJika anda dalam kesusahan, saya boleh bantu hubungkan dengan talian kecemasan Taiwan (119/1925). Ruang ini selamat untuk anda.',
    safetySafe: 'Selamat',
    safetyRisk: 'Risiko',
    safetyPrescription: 'Preskripsi',
    guardrailLabel: 'Pengawal',
    errorMsg: 'Ralat sambungan. Kecemasan hubungi 119 atau 1925.'
  },
  'hi': {
    title: 'HuatuoGPT-II',
    subtitle: 'आत्महत्या रोकथाम',
    callPolice: '119 कॉल करें',
    callHotline: '1925 कॉल करें',
    callHotlineNum: '1925',
    callPoliceNum: '119',
    mindfulness: 'सांस लें',
    mindfulnessTitle: 'माइंडफुल ब्रीदिंग',
    mindfulnessDesc: 'चिंता कम करने के लिए सर्कल के साथ सांस लें।',
    inhale: 'सांस लें',
    hold: 'रोकें',
    exhale: 'छोड़ें',
    inputPlaceholder: 'अपना संदेश टाइप करें...',
    disclaimer: 'AI जानकारी केवल संदर्भ के लिए है। आपात स्थिति में मदद लें।',
    welcome: 'नमस्ते, मैं HuatuoGPT-II हूँ। ताइवान में आपकी पढ़ाई के दौरान मैं आपके मानसिक स्वास्थ्य का साथी हूँ।\n\nआपात स्थिति में, ताइवान के आपातकालीन नंबर 119 या 1925 पर संपर्क करें।',
    safetySafe: 'सुरक्षित',
    safetyRisk: 'जोखिम',
    safetyPrescription: 'पर्चा',
    guardrailLabel: 'सुरक्षा',
    errorMsg: 'त्रुटि। आपात स्थिति में 119 या 1925 डायल करें।'
  }
};