import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { journeyChapters, JourneyChapter } from '../data/journey';
import { profileData } from '../data/profile';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeChapter = journeyChapters[activeChapterIndex];

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selectChapter = (index: number) => {
    const chapter = journeyChapters[index];
    const video = videoRef.current;

    setActiveChapterIndex(index);
    if (video) {
      video.currentTime = chapter.videoStart;
      void video.play().catch(() => undefined);
    }
  };

  return (
    <section ref={sectionRef} id="journey" className="relative w-full py-24 bg-[#142a46] overflow-hidden border-t border-slate-600">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <div className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase mb-2">
            THE JOURNEY
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-widest text-white uppercase leading-tight">
            FROM A SMALL TOWN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400">
              TO A BIGGER VISION
            </span>
          </h2>
          <p className="font-handwriting text-cyan-300 text-xl mt-2">
            Same roots. Bigger vision.
          </p>
        </div>

        {/* Journey Interactive Layout (Timeline Left + Strip View Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Timeline Navigation */}
          <div className="lg:col-span-4 bg-[#1b3859]/90 backdrop-blur-md border border-cyan-400/35 rounded-xl p-6 relative shadow-[0_12px_30px_rgba(3,14,29,0.2)]">
            <div className="absolute top-8 bottom-8 left-[31px] w-[2px] bg-slate-800 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {journeyChapters.map((chapter, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={chapter.id}
                    onClick={() => selectChapter(idx)}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-500/15 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'hover:bg-slate-700/70 border border-transparent'
                    }`}
                  >
                    {/* Node Dot */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-400 shadow-[0_0_10px_#00f0ff]'
                          : 'border-slate-400 bg-slate-700'
                      }`}
                    >
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>

                    {/* Chapter Number & Title */}
                    <div>
                      <div className={`font-mono text-xs tracking-widest ${isActive ? 'text-cyan-300 font-bold' : 'text-slate-300'}`}>
                        {chapter.number}
                      </div>
                      <div className={`font-display text-sm tracking-wider ${isActive ? 'text-white font-semibold' : 'text-slate-100'}`}>
                        {chapter.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Strip & Chapter Details View */}
          <div className="lg:col-span-8 space-y-6">
            {/* Wide Horizontal Chapter Visual Card */}
            <motion.div
              key={activeChapter.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-72 md:h-96 rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] group"
            >
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/videos/The_Journey.mp4"
                muted
                playsInline
                preload="metadata"
                aria-label="Animated journey through Tushiro's career milestones"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142a46]/75 via-[#142a46]/20 to-transparent" />
              <div className="absolute inset-0 bg-scanline pointer-events-none opacity-30" />

              {/* Chapter Details Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 rounded text-cyan-300 font-mono text-xs tracking-widest">
                    CHAPTER {activeChapter.number}
                  </span>
                  <span className="font-handwriting text-cyan-300 text-lg">
                    Tushiro Storyline
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl md:text-4xl font-bold tracking-wider text-white mb-2">
                    {activeChapter.title}
                  </h3>
                  <p className="text-cyan-300 font-mono text-xs md:text-sm tracking-wide mb-3">
                    {activeChapter.subtitle}
                  </p>
                  <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
                    {activeChapter.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* HUD Overlays / Interactive Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* HUD Items Box */}
              {activeChapter.hudItems && (
                <div className="bg-[#1b3859]/90 backdrop-blur-md border border-cyan-400/30 rounded-lg p-5">
                  <div className="text-xs font-mono text-cyan-400 tracking-widest mb-3 uppercase">
                    KEY DISCIPLINE FOCUS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeChapter.hudItems.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-900/90 border border-cyan-500/30 rounded text-xs font-mono text-cyan-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Status List Box (Job Hunt Phase) */}
              {activeChapter.statusList && (
                <div className="bg-[#1b3859]/90 backdrop-blur-md border border-cyan-400/30 rounded-lg p-5">
                  <div className="text-xs font-mono text-cyan-400 tracking-widest mb-3 uppercase">
                    APPLICATION LOG STATUS
                  </div>
                  <div className="space-y-2">
                    {activeChapter.statusList.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-mono text-slate-300">
                        {item.status === 'completed' && <CheckCircle2 size={16} className="text-cyan-400" />}
                        {item.status === 'in-progress' && <Clock size={16} className="text-blue-400 animate-spin" />}
                        {item.status === 'pending' && <AlertCircle size={16} className="text-amber-400" />}
                        {item.status === 'rejected' && <XCircle size={16} className="text-rose-400" />}
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Handwriting Accent */}
            <div className="text-right pt-2">
              <span className="font-handwriting text-cyan-400 text-2xl md:text-3xl">
                {profileData.handwrittenAccents.journey}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
