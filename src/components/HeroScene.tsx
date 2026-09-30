import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profileData } from '../data/profile';
import { HeroFrameRenderer } from '../utils/heroFrameRenderer';

interface HeroSceneProps {
  onScrollClick: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ onScrollClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<HeroFrameRenderer | null>(null);

  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [isFrameLoaded, setIsFrameLoaded] = useState<boolean>(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Device & Pointer detection
  useEffect(() => {
    const checkDevice = () => {
      const desktopPointer = window.matchMedia('(pointer: fine)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const wideScreen = window.innerWidth >= 768;

      setIsDesktop(wideScreen && desktopPointer && !reducedMotion);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Desktop 120 PNG Frame Canvas Renderer Setup
  useEffect(() => {
    if (!isDesktop || !canvasRef.current) return;

    const FRAME_COUNT = 120;
    const getFrameUrl = (index: number) => {
      // 1-indexed filenames: ezgif-frame-001.png to ezgif-frame-120.png
      const frameNum = String(index + 1).padStart(3, '0');
      return `/character-frames/ezgif-frame-${frameNum}.png`;
    };

    const renderer = new HeroFrameRenderer({
      canvas: canvasRef.current,
      frameCount: FRAME_COUNT,
      getFrameUrl,
      onFirstFrameLoaded: () => {
        setIsFrameLoaded(true);
      },
    });

    rendererRef.current = renderer;
    renderer.startLoading();
    renderer.startLoop();

    const handleMouseMove = (e: MouseEvent) => {
      // Inverted progress so moving cursor left turns character left, cursor right turns character right
      const progress = 1 - (e.clientX / window.innerWidth);
      renderer.setTargetProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.destroy();
      rendererRef.current = null;
    };
  }, [isDesktop]);

  // Split TUSHIRO title into letters with alternating entrance vectors
  const titleLetters = profileData.name.split('');
  const letterVectors = [
    { x: -140, y: -90 },  // T
    { x: 120, y: 100 },   // U
    { x: -100, y: 110 },  // S
    { x: 130, y: -80 },   // H
    { x: -150, y: 60 },   // I
    { x: 110, y: 90 },    // R
    { x: 160, y: -100 },  // O
  ];

  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden flex items-center bg-[#050a14]">
      {/* Desktop Mode: High-Performance 120 PNG Canvas Renderer */}
      {isDesktop ? (
        <canvas
          ref={canvasRef}
          className={`fixed inset-0 w-full h-full z-0 transition-opacity duration-700 ${
            isFrameLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            objectFit: 'cover',
          }}
        />
      ) : (
        /* Mobile / Fallback Mode: Optimized Video / Image Layer */
        <video
          src="/videos/Man_rotating_head_horizontally.mp4"
          muted
          playsInline
          autoPlay
          loop
          className="fixed inset-0 w-full h-full object-cover z-0"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            objectFit: 'cover',
            objectPosition: '70% center',
          }}
        />
      )}

      {/* Subtle Bottom Vignette Only */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-t from-[#050a14]/40 via-transparent to-transparent pointer-events-none" />

      {/* Hero Foreground Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16 flex flex-col justify-between min-h-screen"
      >
        <div className="my-auto max-w-3xl pt-12">
          {/* Top Label: Pops in from Top-Left (-X, -Y) */}
          <motion.div
            initial={{ opacity: 0, x: -120, y: -60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.2 }}
            className="flex items-center gap-3 text-cyan-300 font-mono text-xs md:text-sm font-bold tracking-[0.25em] mb-4 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#00f0ff]" />
            <span>DEVELOPER / BUILDER / EXPLORER</span>
          </motion.div>

          {/* Main Title "TUSHIRO": Letters pop in from opposite directions */}
          <div className="flex items-center overflow-visible my-2">
            {titleLetters.map((letter, idx) => {
              const vector = letterVectors[idx % letterVectors.length];
              return (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, x: vector.x, y: vector.y, scale: 1.4, rotate: idx % 2 === 0 ? 15 : -15 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 20,
                    delay: 0.35 + idx * 0.07,
                  }}
                  className="font-display text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.12em] text-white inline-block drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(0,240,255,0.5)]"
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>

          {/* Subtext: Pops in from Bottom-Left (-X, +Y) */}
          <motion.div
            initial={{ opacity: 0, x: -100, y: 80 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.85 }}
            className="relative pl-4 border-l-2 border-cyan-400 mb-8 mt-4"
          >
            <p className="font-display text-lg md:text-2xl tracking-[0.2em] text-white font-semibold uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {profileData.tagline}
            </p>

            {/* Handwritten Accent: Pops in from Right (+X, +Y) */}
            <motion.p
              initial={{ opacity: 0, x: 120, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 1.05 }}
              className="font-handwriting text-cyan-300 text-xl md:text-3xl mt-1 font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_#00f0ff]"
            >
              {profileData.handwrittenAccents.hero}
            </motion.p>
          </motion.div>

          {/* CTA Button: Pops in from Bottom (+Y) */}
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 1.2 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={onScrollClick}
              className="group relative px-8 py-4 bg-slate-950/70 border border-cyan-400 rounded-lg font-display text-xs tracking-widest text-cyan-300 hover:text-white uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] overflow-hidden drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
            >
              <span className="relative z-10 flex items-center gap-2 font-bold">
                EXPLORE WORK
                <span className="group-hover:translate-x-1.5 transition-transform text-cyan-400">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Left Scroll Indicator: Pops in from Bottom-Left (-X, +Y) */}
        <motion.div
          initial={{ opacity: 0, x: -60, y: 60 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 1.35 }}
          className="flex items-center gap-4 text-xs font-mono tracking-widest text-slate-300 uppercase pt-8 cursor-pointer group"
          onClick={onScrollClick}
        >
          <div className="w-10 h-10 rounded-full border border-cyan-500/40 bg-slate-900/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
            <span className="animate-bounce">↓</span>
          </div>
          <span className="group-hover:text-cyan-300 transition-colors tracking-[0.2em] font-semibold text-slate-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">SCROLL TO EXPLORE</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
