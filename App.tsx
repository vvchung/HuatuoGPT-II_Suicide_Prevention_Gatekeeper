import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role, SafetyLabel } from './types';
import { runGuardrail, streamChatResponse } from './services/geminiService';
import EmergencyHeader from './components/EmergencyHeader';
import MindfulnessTool from './components/MindfulnessTool';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      text: '你好，我是 HuatuoGPT-II。我具備專業醫療知識，並已通過執業藥師考試。\n\n我可以為您提供健康諮詢、藥物衛教或心理支持。請注意，我無法開立處方，若有緊急心理困擾，我會盡力陪伴您。\n\n如果您遭遇了不公平的對待或感到受傷，這裡是一個安全的空間，我會在這裡聽你說。',
      timestamp: Date.now(),
      safetyLabel: SafetyLabel.SAFE
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages]);

  // Auto-resize textarea
  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: userText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 1. Placeholder for AI Response
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: aiMsgId,
        role: Role.MODEL,
        text: '',
        isThinking: true,
        timestamp: Date.now()
      }]);

      // 2. Run Guardrail (Simulating BART-large-mnli with Flash)
      const guardrailResult = await runGuardrail(userText);
      
      // Update the placeholder with the safety label immediately (visual feedback)
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId 
          ? { ...msg, safetyLabel: guardrailResult.label } 
          : msg
      ));

      // 3. Run Main Chat (Gemini 3 Pro)
      await streamChatResponse(
        messages, // Send previous history
        userText,
        guardrailResult,
        (chunkText) => {
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId 
              ? { ...msg, text: chunkText, isThinking: false } 
              : msg
          ));
        }
      );

    } catch (error) {
      console.error("Error flow", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: Role.SYSTEM,
        text: "連線發生錯誤，請稍後再試。若有緊急狀況請直接撥打 119 或 1925。",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSafetyLabelText = (label: SafetyLabel) => {
    switch (label) {
      case SafetyLabel.SAFE: return '安全';
      case SafetyLabel.SUICIDE_RISK: return '自殺風險';
      case SafetyLabel.PRESCRIPTION_REQUEST: return '處方請求';
      default: return label;
    }
  };

  return (
    <div className="flex flex-col h-full bg-emerald-50">
      <EmergencyHeader onMindfulnessClick={() => setShowMindfulness(true)} />

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm text-sm sm:text-base leading-relaxed break-words relative ${
                  msg.role === Role.USER 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : msg.role === Role.SYSTEM
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-white text-slate-800 rounded-bl-none border border-emerald-100'
                }`}
              >
                {/* Avatar / Label */}
                {msg.role !== Role.USER && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${msg.safetyLabel === SafetyLabel.SUICIDE_RISK ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`}></div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      {msg.role === Role.SYSTEM ? 'System Alert' : 'HuatuoGPT-II'}
                    </span>
                  </div>
                )}

                {/* Content */}
                {msg.isThinking ? (
                  <div className="flex space-x-1 h-6 items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full typing-dot"></div>
                  </div>
                ) : (
                  <div className="markdown-body">
                    <ReactMarkdown 
                      components={{
                        strong: ({node, ...props}) => <span className="font-bold text-emerald-700" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="font-bold text-lg mt-4 mb-2 text-emerald-800 border-b border-emerald-100 pb-1" {...props} />,
                        a: ({node, ...props}) => <a className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>

                    {/* Guardrail Status Footer (Only for Model) */}
                    {msg.role === Role.MODEL && msg.safetyLabel && (
                      <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end items-center gap-2 text-[10px] text-slate-400">
                        <span>守衛檢測:</span>
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          msg.safetyLabel === SafetyLabel.SAFE 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : msg.safetyLabel === SafetyLabel.SUICIDE_RISK 
                              ? 'bg-red-50 text-red-600' 
                              : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          {getSafetyLabelText(msg.safetyLabel)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Spacer to push content above fixed footer */}
          <div ref={bottomRef} className="h-32 w-full" />
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white/90 backdrop-blur border-t border-emerald-100 p-4 fixed bottom-0 w-full z-40">
        <div className="max-w-3xl mx-auto relative">
          
          <div className="flex items-end gap-2 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-200 focus-within:border-emerald-400 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputResize}
              onKeyDown={handleKeyDown}
              placeholder="請輸入您的對話... (Shift + Enter 換行)"
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 text-slate-700 placeholder-slate-400"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-xl transition-all ${
                input.trim() && !isLoading
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transform hover:-translate-y-0.5' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            AI 提供的資訊僅供參考，緊急情況請務必尋求專業協助。
          </p>
        </div>
      </footer>

      {/* Mindfulness Overlay */}
      {showMindfulness && (
        <MindfulnessTool onClose={() => setShowMindfulness(false)} />
      )}
    </div>
  );
};

export default App;