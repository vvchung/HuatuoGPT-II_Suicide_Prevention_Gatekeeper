import React, { useEffect, useState } from 'react';

interface MindfulnessToolProps {
  onClose: () => void;
}

const MindfulnessTool: React.FC<MindfulnessToolProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(4);
  const [instruction, setInstruction] = useState('吸氣');

  useEffect(() => {
    let interval: number;
    
    const cycle = () => {
      if (phase === 'inhale') {
        if (timer > 1) {
          setTimer(t => t - 1);
        } else {
          setPhase('hold');
          setTimer(2);
          setInstruction('屏氣');
        }
      } else if (phase === 'hold') {
        if (timer > 1) {
          setTimer(t => t - 1);
        } else {
          setPhase('exhale');
          setTimer(6);
          setInstruction('慢慢吐氣');
        }
      } else if (phase === 'exhale') {
        if (timer > 1) {
          setTimer(t => t - 1);
        } else {
          setPhase('inhale');
          setTimer(4);
          setInstruction('吸氣');
        }
      }
    };

    interval = window.setInterval(cycle, 1000);
    return () => clearInterval(interval);
  }, [phase, timer]);

  // Dynamic circle size classes
  const getCircleSize = () => {
    if (phase === 'inhale') return 'scale-150 duration-[4000ms] ease-out';
    if (phase === 'hold') return 'scale-150 duration-[0ms]';
    if (phase === 'exhale') return 'scale-100 duration-[6000ms] ease-in-out';
    return 'scale-100';
  };

  return (
    <div className="fixed inset-0 z-[60] bg-emerald-900/95 flex flex-col items-center justify-center text-white backdrop-blur-sm">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-3xl font-light mb-12 tracking-widest">正念呼吸 4-2-6</h2>

      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer glow ring */}
        <div className={`absolute w-full h-full rounded-full border-4 border-emerald-400/30 transition-transform ${getCircleSize()}`}></div>
        
        {/* Inner animated circle */}
        <div className={`absolute w-40 h-40 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full shadow-[0_0_50px_rgba(52,211,153,0.5)] flex items-center justify-center transition-transform ${getCircleSize()}`}>
           <span className="text-4xl font-bold">{timer}</span>
        </div>
      </div>

      <p className="mt-12 text-2xl font-medium animate-pulse">{instruction}</p>
      <p className="mt-4 text-emerald-200 text-sm max-w-xs text-center">
        跟隨圓圈的縮放調整呼吸，這能幫助活化副交感神經，緩解焦慮。
      </p>
    </div>
  );
};

export default MindfulnessTool;