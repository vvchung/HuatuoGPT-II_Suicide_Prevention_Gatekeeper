import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface EmergencyHeaderProps {
  onMindfulnessClick: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const EmergencyHeader: React.FC<EmergencyHeaderProps> = ({ onMindfulnessClick, language, setLanguage }) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Left: Life Saving Action */}
        <div className="flex items-center gap-2">
          <a 
            href={`tel:${t.callPoliceNum}`}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-full font-bold shadow-lg transition-transform active:scale-95 animate-pulse text-xs sm:text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="whitespace-nowrap">{t.callPolice}</span>
          </a>
        </div>

        {/* Center: Title (Hidden on small screens) */}
        <div className="hidden lg:block text-center">
          <h1 className="text-emerald-800 font-bold text-lg">{t.title}</h1>
          <p className="text-xs text-emerald-600">{t.subtitle}</p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
           {/* Language Dropdown */}
           <div className="relative">
             <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="appearance-none w-14 sm:w-auto bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200 rounded-lg py-1.5 pl-2 pr-6 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
             >
               <option value="zh-TW">🇹🇼 繁體中文</option>
               <option value="en">🇺🇸 English (Demo)</option>
               <option value="zh-CN">🇨🇳 简体中文</option>
               <option value="ja">🇯🇵 日本語</option>
               <option value="ko">🇰🇷 한국어</option>
               <option value="vi">🇻🇳 Tiếng Việt</option>
               <option value="id">🇮🇩 Indonesia</option>
               <option value="th">🇹🇭 ไทย</option>
               <option value="ms">🇲🇾 Melayu</option>
               <option value="hi">🇮🇳 हिंदी</option>
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-500">
              <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
           </div>

           <a 
            href={`tel:${t.callHotlineNum}`}
            className="flex items-center gap-1 bg-orange-400 hover:bg-orange-500 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors shadow-md"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">{t.callHotline}</span>
            <span className="sm:hidden">{t.callHotlineNum}</span>
          </a>
          
          <button 
            onClick={onMindfulnessClick}
            className="flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">{t.mindfulness}</span>
            <span className="sm:hidden">Zen</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default EmergencyHeader;