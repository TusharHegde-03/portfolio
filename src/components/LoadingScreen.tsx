import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onSelectMode: (mode: 'dark-tushiro' | 'light-tushar') => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSelectMode }) => {
  const [progress, setProgress] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s rapid loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsInitializing(false);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-[10000] bg-[#050a14] flex flex-col items-center justify-center font-display overflow-hidden px-4"
      >
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105"
          style={{ backgroundImage: `url('/images/backgroun_homepage.png')` }}
        />

        {/* Lightened Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/90 via-[#050a14]/60 to-[#050a14]/80" />
        <div className="absolute inset-0 bg-scanline pointer-events-none opacity-15" />

        {isInitializing ? (
          /* Step 1: System Initializing Progress */
          <div className="relative z-10 flex flex-col items-center p-8 rounded-2xl bg-[#0a1120]/80 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-center max-w-md w-full">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold tracking-[0.25em] text-white mb-6 relative"
            >
              TUSHIRO
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#00f0ff]" />
            </motion.div>

            <div className="text-xs md:text-sm tracking-widest text-cyan-400 font-mono mb-6 uppercase flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              SYSTEM INITIALIZING... {progress}%
            </div>

            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-cyan-500/30 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 shadow-[0_0_15px_#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          /* Step 2: Interactive Theme / Mode Selection Screen */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-4xl w-full text-center space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 font-mono text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
                <Sparkles size={14} className="text-cyan-400" /> Choose Your Experience
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Select Portfolio Style
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-2 leading-relaxed">
                Choose between the interactive cyberpunk hero journey or the minimal white professional portfolio.
              </p>
            </div>

            {/* 2 Handcrafted Mode Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
              {/* Option 1: Dark Cyberpunk Tushiro Mode */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMode('dark-tushiro')}
                className="group relative p-8 rounded-2xl bg-[#091322] border border-cyan-500/40 hover:border-cyan-400 shadow-2xl flex flex-col justify-between min-h-[250px] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-bold tracking-wider uppercase">
                      DARK HERO JOURNEY
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Tushiro Version
                  </h3>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed font-normal">
                    Interactive 120-frame canvas hero, cyberpunk visual aesthetics, animated timeline, and interactive project showcase.
                  </p>
                </div>

                <div className="pt-6 font-mono text-xs font-bold text-cyan-400 flex items-center justify-between group-hover:text-white transition-colors border-t border-slate-800">
                  <span>ENTER CYBERPUNK MODE</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.button>

              {/* Option 2: Light Minimal Professional Tushar Mode */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMode('light-tushar')}
                className="group relative p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 shadow-2xl flex flex-col justify-between min-h-[250px] transition-all duration-300 text-slate-900"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-mono text-[11px] font-bold tracking-wider uppercase">
                      LIGHT MINIMAL THEME
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Tushar Hegde
                  </h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed font-normal">
                    Clean, minimal, humanized professional portfolio. Highlighting Information Science Engineering credentials, clean project cards, and core skills.
                  </p>
                </div>

                <div className="pt-6 font-mono text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center justify-between transition-colors border-t border-slate-100">
                  <span>VIEW MINIMAL PORTFOLIO</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
