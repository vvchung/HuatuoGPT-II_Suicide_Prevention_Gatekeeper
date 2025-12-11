import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface MindfulnessToolProps {
  onClose: () => void;
  language: Language;
}

const MindfulnessTool: React.FC<MindfulnessToolProps> = ({ onClose, language }) => {
  const t = TRANSLATIONS[language];
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(4);
  const [instruction, setInstruction] = useState(t.inhale);

  useEffect(() => {
    // Reset instruction immediately when language changes or tool opens
    if (phase === 'inhale') setInstruction(t.inhale);
    if (phase === 'hold') setInstruction(t.hold);
    if (phase === 'exhale') setInstruction(t.exhale);
  }, [language, t]);

  useEffect(() => {
    let interval: number;
    
    const cycle = () => {
      if (phase === 'inhale') {
        if (timer > 1) {
          setTimer(t => t - 1);
        } else {
          setPhase('hold');
          setTimer(4); // Hold for 4s (previously 2)
          setInstruction(t.hold);
        }
      } else if (phase === 'hold') {
        if (timer > 1) {
          setTimer(t => t - 1);
        } else {
          setPhase('exhale');
          setTimer(4); // Exhale for 4s (previously 6)
          setInstruction(t.exhale);
        }
      } else if (phase === 'exhale') {
        if (timer > 1) {
          setTimer(t => t - 1);
        } else {
          setPhase('inhale');
          setTimer(4); // Inhale for 4s
          setInstruction(t.inhale);
        }
      }
    };

    interval = window.setInterval(cycle, 1000);
    return () => clearInterval(interval);
  }, [phase, timer, t]);

  // Dynamic circle size classes
  const getCircleSize = () => {
    if (phase === 'inhale') return 'scale-150 duration-[4000ms] ease-out';
    if (phase === 'hold') return 'scale-150 duration-[0ms]';
    // Matches the 4s duration for exhale
    if (phase === 'exhale') return 'scale-100 duration-[4000ms] ease-in-out';
    return 'scale-100';
  };

  return (
    <div className="fixed inset-0 z-[60] bg-emerald-900/95 flex flex-col items-center justify-center text-white backdrop-blur-sm px-4">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-2xl sm:text-3xl font-light mb-12 tracking-widest text-center">{t.mindfulnessTitle}</h2>

      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer glow ring */}
        <div className={`absolute w-full h-full rounded-full border-4 border-emerald-400/30 transition-transform ${getCircleSize()}`}></div>
        
        {/* Inner animated circle */}
        <div className={`absolute w-40 h-40 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full shadow-[0_0_50px_rgba(52,211,153,0.5)] flex items-center justify-center transition-transform ${getCircleSize()}`}>
           <span className="text-4xl font-bold">{timer}</span>
        </div>
      </div>

      <p className="mt-12 text-2xl font-medium animate-pulse">{instruction}</p>
      <p className="mt-4 text-emerald-200 text-sm max-w-xs text-center leading-relaxed">
        {t.mindfulnessDesc}
      </p>
    </div>
  );
};

export default MindfulnessTool;