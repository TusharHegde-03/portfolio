import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

interface LightHeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

export const LightHero: React.FC<LightHeroProps> = ({ onScrollToProjects, onScrollToContact }) => {
  return (
    <section className="relative w-full min-h-screen bg-[#f3f4f6] text-slate-900 pt-6 pb-16 overflow-hidden flex flex-col justify-between">
      {/* Outer Card Frame Container (Matching Reference Image Frame) */}
      <div className="relative max-w-[1400px] w-full mx-auto px-4 sm:px-8 my-auto">
        <div className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-10 md:p-14 overflow-hidden min-h-[780px] flex flex-col justify-between">
          
          {/* Top Bar Header */}
          <div className="flex items-center justify-between z-20 pb-6 border-b border-slate-100">
            {/* Available for New Opportunities Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for New Opportunities
            </div>

            {/* Navigation & Let's Talk Pill */}
            <div className="flex items-center gap-4 sm:gap-8 text-xs font-medium text-slate-600">
              <button onClick={onScrollToProjects} className="hover:text-black transition-colors hidden sm:block">
                Work <span className="text-slate-400 font-mono">[04]</span>
              </button>
              <button onClick={onScrollToProjects} className="hover:text-black transition-colors hidden sm:block">
                Skills <span className="text-slate-400 font-mono">[08]</span>
              </button>
              <button onClick={onScrollToContact} className="hover:text-black transition-colors hidden md:block">
                Contact
              </button>
              <button
                onClick={onScrollToContact}
                className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                Let's Talk <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Center Main Stage Composition */}
          <div className="relative my-auto py-12 flex flex-col items-center justify-center min-h-[420px]">
            {/* Giant Background Typography: TUSHAR HEGDE */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
              <div className="font-display text-[65px] sm:text-[110px] md:text-[150px] lg:text-[190px] font-extrabold tracking-tight leading-none uppercase flex justify-center items-center gap-2 sm:gap-6">
                {/* Outlined Stroke Text for "TUSHAR" */}
                <span
                  className="inline-block text-transparent"
                  style={{ WebkitTextStroke: '2px #0f172a' }}
                >
                  TUSHAR
                </span>
                {/* Solid Filled Text for "HEGDE" */}
                <span className="text-slate-900">
                  HEGDE
                </span>
              </div>
            </div>

            {/* Center Foreground Character Portrait Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 max-w-[340px] sm:max-w-[440px] md:max-w-[500px] w-full mx-auto translate-y-6 sm:translate-y-8"
            >
              <img
                src="/characters/tushiro_cyber_suit_448x437.png"
                alt="Tushar Hegde"
                className="w-full h-auto object-contain max-h-[460px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] filter grayscale contrast-[1.08] hover:grayscale-0 hover:scale-105 transition-all duration-500 cursor-pointer"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)'
                }}
              />
              {/* Soft Ground Base Shadow */}
              <div className="w-3/4 h-4 bg-slate-900/15 rounded-full blur-md mx-auto -mt-2 pointer-events-none" />
            </motion.div>
          </div>

          {/* Bottom Stage Details (Role on Left + Social Pills on Right) */}
          <div className="relative z-20 pt-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-slate-100">
            {/* Left Side: Role, Bio & Collaborate Button */}
            <div className="max-w-md space-y-3">
              <div className="font-display text-2xl font-bold text-slate-900">
                {profileData.title}
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Fresh Graduate & Information Science Engineer building intelligent data pipelines, AI models, and real-world software solutions.
              </p>
              <div className="pt-2">
                <button
                  onClick={onScrollToProjects}
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-semibold tracking-wide transition-all shadow-lg flex items-center gap-2"
                >
                  Let's collaborate <ArrowUpRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Side: Stacked Social Pill Links (Matching Reference) */}
            <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <Github size={14} className="text-slate-600" /> GitHub <ArrowUpRight size={12} className="ml-auto" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <Linkedin size={14} className="text-blue-600" /> LinkedIn <ArrowUpRight size={12} className="ml-auto" />
              </a>
              <a
                href={`mailto:${profileData.socials.email}`}
                className="px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <Mail size={14} className="text-slate-600" /> Email <ArrowUpRight size={12} className="ml-auto" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
