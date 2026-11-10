import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import './theme-picker.css';

interface LoadingScreenProps {
  onSelectMode: (mode: 'dark-tushiro' | 'light-tushar') => void;
}

type ThemeMode = 'dark-tushiro' | 'light-tushar';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSelectMode }) => {
  const [leaving, setLeaving] = useState(false);
  const [picked, setPicked] = useState<ThemeMode | null>(null);
  const [crackProgress, setCrackProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  const choose = (mode: ThemeMode) => {
    if (leaving) return;
    setPicked(mode);
    setCrackProgress(1);
    setLeaving(true);
    window.setTimeout(() => onSelectMode(mode), reduceMotion ? 350 : 1180);
  };
  const trackCrack = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const progress = scrollHeight <= clientHeight ? 0 : Math.min(1, scrollTop / (scrollHeight - clientHeight));
    setCrackProgress(current => Math.max(current, progress));
  };

  return (
    <AnimatePresence>
      <motion.div
        className={leaving ? 'experience-curtain is-ripping' : 'experience-curtain'}
        onScroll={trackCrack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: .16 } }}
        aria-label="Choose a portfolio experience"
      >
        <AnimatePresence>
        {!leaving && <motion.div
          key="experience-sheet"
          className="experience-sheet"
          style={{ '--crack-progress': crackProgress } as React.CSSProperties}
          initial={{ rotateX: -8, y: 26, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: picked === 'light-tushar' ? 82 : -82, y: picked === 'light-tushar' ? 110 : -150, opacity: 0, transition: { duration: 1.08, ease: [.7, 0, .2, 1] } }}
        >
          <svg className="paper-fractures" viewBox="0 0 1440 1050" preserveAspectRatio="none" aria-hidden="true">
            <path className="fracture-main" pathLength="1000" style={{ strokeDashoffset: 1000 * (1 - crackProgress), opacity: crackProgress * .65 }} d="M721 -18 L699 45 L728 93 L690 145 L717 201 L682 252 L712 308 L675 363 L704 418 L668 471 L699 526 L671 584 L703 640 L674 701 L706 756 L680 813 L711 871 L683 930 L706 988 L696 1070" />
            <path className="fracture-branch" pathLength="1000" style={{ strokeDashoffset: 1000 * (1 - crackProgress), opacity: crackProgress * .44 }} d="M691 145 L630 160 L591 197 L548 211" />
            <path className="fracture-branch" pathLength="1000" style={{ strokeDashoffset: 1000 * (1 - crackProgress), opacity: crackProgress * .44 }} d="M704 418 L764 439 L803 482 L860 496" />
            <path className="fracture-branch" pathLength="1000" style={{ strokeDashoffset: 1000 * (1 - crackProgress), opacity: crackProgress * .44 }} d="M674 701 L610 723 L574 767 L525 783" />
            <path className="fracture-branch" pathLength="1000" style={{ strokeDashoffset: 1000 * (1 - crackProgress), opacity: crackProgress * .44 }} d="M711 871 L775 891 L818 931 L870 950" />
          </svg>
          <header className="news-masthead"><span>ENGINEER / AI BUILDER</span><b>TUSHAR HEGDE</b><span>BENGALURU, INDIA</span></header>
          <div className="news-headline"><h1>BUILDING<br /><em>WHAT’S NEXT.</em></h1><p>An Information Science Engineer making useful things with data, AI, and software.</p></div>
          <div className="news-grid">
            <article className="news-column news-column-copy"><span className="news-label">THE PERSON BEHIND THE WORK</span><p className="news-dropcap">I like turning a real question into something people can use. Start with a clear problem, build a working first pass, then make the rough edges easier to live with.</p><p>My work moves between data analysis, machine learning, APIs, and the details that turn a prototype into a product.</p><strong>Useful work starts by paying attention.</strong></article>
            <figure className="news-portrait"><img src="/images/portraits/tushar-looking-away.jpg" alt="Tushar Hegde, looking toward the next thing" /><figcaption><span>FIG. 01</span><i>Curiosity, in progress.</i></figcaption></figure>
            <nav className="news-column news-contents" aria-label="Choose a portfolio theme"><span className="news-label">CHOOSE YOUR EDITION</span><p className="news-note">Two ways into the same story.</p>
              <button className="news-choice news-choice-dark" onClick={() => choose('dark-tushiro')} disabled={leaving} aria-label="Open the dark portfolio"><span><i>01</i><b>BLACK & RED</b></span><small>Projects, process, and the things I build <ArrowDownRight size={14} /></small></button>
              <button className="news-choice news-choice-light" onClick={() => choose('light-tushar')} disabled={leaving} aria-label="Open the white portfolio"><span><i>02</i><b>WHITE EDITION</b></span><small>A clearer view of my work <ArrowDownRight size={14} /></small></button>
              <div className="news-index"><span>INSIDE</span><p>Data & AI <i>03</i></p><p>Selected work <i>06</i></p><p>Notes from the process <i>11</i></p></div>
            </nav>
          </div>
          <footer className="news-footer"><span>ISSUE 01&nbsp; / &nbsp;PERSONAL EDITION</span><span>SCROLL TO CREASE THE PAGE&nbsp; ↓</span></footer>
        </motion.div>}
        </AnimatePresence>
        {leaving && <div className="paper-rip" aria-hidden="true">
          <motion.div className="paper-rip-half paper-rip-left" initial={{ x: 0 }} animate={{ x: '-104%', rotate: -5 }} transition={{ duration: 1.05, ease: [.72, 0, .2, 1], delay: .08 }} />
          <motion.div className="paper-rip-half paper-rip-right" initial={{ x: 0 }} animate={{ x: '104%', rotate: 5 }} transition={{ duration: 1.05, ease: [.72, 0, .2, 1], delay: .08 }} />
        </div>}
      </motion.div>
    </AnimatePresence>
  );
};

