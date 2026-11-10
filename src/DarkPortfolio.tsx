import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, Github, Linkedin, Mail, MapPin, Menu, MousePointer2, Send, X } from 'lucide-react';
import { profileData } from './data/profile';
import { skillsData } from './data/skills';
import { projectsData, Project } from '../shared/projects';
import './experience-motion.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);
const LazySkillTower = React.lazy(() => import('./components/SkillTower').then(module => ({ default: module.SkillTower })));

const reveal: Variants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: 'easeOut' } } };

const worldFrames = [
  {
    id: 'portrait-1',
    src: '/images/portraits/tushar-portrait.jpg',
    alt: 'Tushar in a black shirt, photographed at home',
    caption: 'One of the quieter days.',
    rotate: -2.5,
  },
  {
    id: 'nami-code',
    src: '/images/frames/nami-code-editor.jpg',
    alt: 'VS Code editor with Nami hospital assistant python robot code',
    caption: 'Late night robot logic & FastAPI.',
    rotate: 2,
  },
  {
    id: 'portrait-2',
    src: '/images/portraits/tushar-cap-close.jpg',
    alt: 'A candid portrait of Tushar in a cap',
    caption: 'A moment between things.',
    rotate: -1.5,
  },
  {
    id: 'spotify',
    src: '/images/frames/spotify-starboy.jpg',
    alt: 'Spotify playing Starboy by The Weeknd',
    caption: 'Starboy on repeat.',
    rotate: 2.8,
  },
  {
    id: 'portrait-3',
    src: '/images/portraits/tushar-looking-away.jpg',
    alt: 'Tushar in a red shirt, looking into the distance',
    caption: 'Off the clock.',
    rotate: -2,
  },
  {
    id: 'tsushima',
    src: '/images/frames/ghost-of-tsushima.jpg',
    alt: 'Ghost of Tsushima samurai wallpaper',
    caption: 'Way of the Ghost.',
    rotate: 1.8,
  },
  {
    id: 'coursera',
    src: '/images/frames/coursera-skills.png',
    alt: 'Coursera dashboard showing Generative AI and deep learning skill progress',
    caption: 'Never done learning.',
    rotate: -1.8,
  },
];

function PortraitStory({ onSeeWork }: { onSeeWork: () => void }) {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeNote, setActiveNote] = useState('');
  const notes = [
    { key: 'observe', label: 'Eyes', note: 'Notice the person before the problem.' },
    { key: 'prototype', label: 'Head', note: 'Stay curious about what is really happening.' },
    { key: 'refine', label: 'Hands', note: 'Make the first idea real enough to test.' },
  ];

  useGSAP(() => {
    if (!storyRef.current || !stageRef.current) return;
    const mm = gsap.matchMedia(storyRef);

    mm.add('(min-width: 721px) and (prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .to('.hero-name-back', { yPercent: -22, scale: .9, autoAlpha: .15, ease: 'none' }, 0)
        .to('.hero-lede', { x: '-5vw', autoAlpha: 0, ease: 'none' }, .08)
        .to('.hero-cutout-mood', { autoAlpha: 0, scale: .94, ease: 'none' }, .2)
        .fromTo('.hero-cutout-thoughtful', { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, ease: 'none' }, .2)
        .fromTo('.hero-hotspots', { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none' }, .3)
        .to('.hero-portrait-layer', { x: '-12vw', scale: 1.2, ease: 'none' }, .48)
        .to('.hero-hotspots', { autoAlpha: 0, ease: 'none' }, .44)
        .to('.hero-scroll-left', { x: 0, autoAlpha: 1, ease: 'none' }, .5)
        .to('.hero-scroll-bio', { x: 0, autoAlpha: 1, ease: 'none' }, .64);
    });

    mm.add('(max-width: 720px), (prefers-reduced-motion: reduce)', () => {
      gsap.set(['.hero-scroll-left', '.hero-scroll-bio', '.hero-hotspots', '.hero-cutout-thoughtful'], {
        autoAlpha: 1,
        clearProps: 'transform',
      });
    });

    return () => mm.revert();
  }, { scope: storyRef, revertOnUpdate: true });

  return <section ref={storyRef} className="hero-scroll" id="top" aria-label="Introduction to Tushar Hegde">
    <div ref={stageRef} className="hero-stage">
      <div className="hero-topline"><span><i /> ENGINEER / AI BUILDER</span><span>BENGALURU, INDIA</span></div>
      <h1 className="hero-name-back">TUSHAR HEGDE</h1>
      <div className="hero-portrait-layer">
        <img className="hero-cutout hero-cutout-mood" src="/images/portraits/tushar-moody-cutout.png" alt="Tushar tipping his flat cap" />
        <img className="hero-cutout hero-cutout-thoughtful" src="/images/portraits/tushar-thoughtful-cutout.png" alt="Tushar looking thoughtful, one hand at his chin" />
      </div>
      <div className="hero-lede">
        <p className="eyebrow"><span className="availability-dot" /> INFORMATION SCIENCE ENGINEER</p>
        <motion.h2 initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.08, delay: .36, ease: [.72, 0, .2, 1] }}>Welcome to<br /><em>my universe.</em></motion.h2>
        <p>I build useful things with data, AI, and software—starting with a real question and seeing where it leads.</p>
        <div className="hero-actions"><button className="button-primary" onClick={onSeeWork}>See what I’ve built <ArrowDownRight size={16} /></button><a className="button-quiet" href="/Tushar.v4.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} /></a></div>
      </div>
      <aside className="hero-scroll-bio" aria-label="About Tushar">
        <span className="eyebrow">A LITTLE ABOUT ME</span>
        <h2>Still curious.<br /><em>Still building.</em></h2>
        <p>I’m Tushar Hegde, an Information Science Engineer who learns by making. I like systems that work quietly, tools that save someone time, and teams that care about what they ship.</p>
        <p className="hero-scroll-signoff">The work is technical.<br /><strong>The reason is human.</strong></p>
        <button className="text-link" onClick={onSeeWork}>Follow the work <ArrowDownRight size={15} /></button>
      </aside>
      <aside className="hero-scroll-left" aria-label="How I work">
        <span className="eyebrow">HOW I LIKE TO WORK</span>
        <p>Curiosity first.<br /><em>Then a working thing.</em></p>
        <span className="left-note-rule" />
        <small>DATA · AI · SOFTWARE</small>
      </aside>
      <div className="hero-hotspots" aria-label="Portrait annotations; move your pointer over a note">
        <svg className="portrait-mark-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <defs><marker id="portrait-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10" /></marker></defs>
          <path markerEnd="url(#portrait-arrow)" d="M280 330 C430 340 600 395 820 400" /><path markerEnd="url(#portrait-arrow)" d="M1135 315 C1040 305 960 285 865 270" /><path markerEnd="url(#portrait-arrow)" d="M1120 500 C1040 515 960 532 855 540" />
        </svg>
        {notes.map((item, index) => <button key={item.key} type="button" className={`portrait-annotation portrait-annotation-${index + 1}${activeNote === item.key ? ' is-active' : ''}`} onMouseEnter={() => setActiveNote(item.key)} onMouseLeave={() => setActiveNote('')} onFocus={() => setActiveNote(item.key)} onBlur={() => setActiveNote('')} aria-label={`${item.label}: ${item.note}`}>
          <span className="annotation-label">{item.label}</span><span className="annotation-note">{item.note}</span>
        </button>)}
      </div>
      <div className="hero-bottomline"><span>BUILT WITH CURIOSITY / BENGALURU</span><span>SCROLL TO UNWRAP <ArrowDown size={13} /></span></div>
    </div>
  </section>;
}

export function ProjectArtwork({ index }: { index: number }) {
  if (index === 0) return <div className="project-art project-art-hospital" aria-hidden="true">
    <div className="art-masthead"><span>NAMI / CARE SYSTEMS</span><span>01: VOICE + MOTION</span></div>
    <div className="hospital-grid"><div className="hospital-cross">N</div><div className="pulse-readout"><span>VOICE EVENT</span><strong>“ROOM 204”</strong><i>ROUTE CONFIRMED <b /></i></div><svg viewBox="0 0 800 220"><path d="M0 120H140l24-32 22 62 31-90 32 61h120l29-26 25 52 28-104 34 77h145l28-19 24 37 23-62 24 44h71" /></svg><div className="hospital-route"><span>WARD 02</span><b>→</b><span>ROOM 204</span><i>EST. 00:42</i></div></div>
    <span className="art-coordinate">HOSPITAL ASSISTANT / LIVEKIT + GEMINI</span><strong className="art-display-word">nami<span>.</span></strong><span className="art-microcopy">A QUIETER KIND OF HELP<br />DESIGNED AROUND CARE</span>
  </div>;
  if (index === 1) return <div className="project-art project-art-clinical" aria-hidden="true">
    <div className="art-masthead"><span>FIELD NOTES / CLINICAL TRIALS</span><span>RETRIEVAL MAP 08</span></div><div className="paper-stack"><div className="paper-sheet sheet-back"><b>STUDY 1187</b><i>phase / II</i><span>outcomes · safety · cohort</span></div><div className="paper-sheet sheet-mid"><b>TRIAL INDEX</b><i>eligibility criteria</i><span>population / intervention / result</span></div><div className="paper-sheet sheet-front"><b>Find the signal.</b><div className="paper-lines"><i /><i /><i /><i /></div><span>QDRANT / LANGCHAIN</span></div><div className="search-orbit"><span>QUERY</span><b>→</b><span>EVIDENCE</span></div></div><strong className="art-display-word">evidence<span> /</span></strong><span className="art-coordinate">SEMANTIC SEARCH / DOCUMENT INTELLIGENCE</span>
  </div>;
  if (index === 2) return <div className="project-art project-art-market" aria-hidden="true">
    <div className="art-masthead"><span>MARKET TAPE / 2018—24</span><span>HISTORICAL SERIES</span></div><div className="market-chart"><div className="chart-axis"><span>+24%</span><span>+12%</span><span>00</span><span>-12%</span></div><svg viewBox="0 0 1000 500" preserveAspectRatio="none"><path className="chart-area" d="M0 390 L62 360 105 380 148 275 193 296 240 220 278 245 323 172 370 224 418 154 466 190 507 135 554 178 600 98 644 154 694 91 742 113 788 58 838 96 884 44 928 68 1000 18V500H0Z"/><path className="chart-line" d="M0 390 L62 360 105 380 148 275 193 296 240 220 278 245 323 172 370 224 418 154 466 190 507 135 554 178 600 98 644 154 694 91 742 113 788 58 838 96 884 44 928 68 1000 18"/></svg><div className="chart-marker"><b>+18.42%</b><span>2024 / 06</span></div></div><strong className="art-display-word">read<span> the curve.</span></strong><span className="art-coordinate">INGEST → CLEAN → UNDERSTAND</span>
  </div>;
  return <div className="project-art project-art-tickets" aria-hidden="true">
    <div className="art-masthead"><span>SUPPORT / INTAKE ROUTER</span><span>CLASSIFIER v.04</span></div><div className="ticket-machine"><div className="ticket ticket-back"><b>REQUEST #201</b><i>Login issue</i><span>account / access</span></div><div className="ticket ticket-front"><b>INCOMING TICKET</b><i>“I can’t access my account”</i><span>LANGUAGE MODEL / FASTAPI</span></div><div className="route-result"><small>ROUTED TO</small><strong>ACCOUNT<br />ACCESS</strong><em>CONFIDENCE 0.94</em></div></div><strong className="art-display-word">right<br />team<span>.</span></strong><span className="art-coordinate">LOW LATENCY / HUMAN REVIEW READY</span>
  </div>;
}

function InteractiveProjectImage({ project, index }: { project: Project; index: number }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 19 });
  const y = useSpring(pointerY, { stiffness: 90, damping: 19 });
  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) * .045);
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) * .045);
  };
  const onLeave = () => { pointerX.set(0); pointerY.set(0); };
  return <div className="project-circle-trigger" aria-hidden="true" onPointerMove={onMove} onPointerLeave={onLeave}>
    <span className="project-circle"><motion.div className="project-art-kinetic" style={{ x, y }} whileHover={{ scale: 1.025 }} transition={{ type: 'spring', stiffness: 100, damping: 18 }}><ProjectArtwork index={index} /></motion.div></span>
    <span className="project-circle-index">{project.id} <i>—</i> {String(projectsData.length).padStart(2, '0')}</span>
  </div>;
}

export function ProjectShowcase({ projects, onOpen, reducedMotion, theme = 'dark' }: { projects: Project[]; onOpen: (project: Project) => void; reducedMotion: boolean; theme?: 'dark' | 'light' }) {
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current || !frameRef.current) return;
    const mm = gsap.matchMedia(trackRef);

    mm.add('(min-width: 721px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.project-slide', trackRef.current);
      gsap.set(panels, { autoAlpha: 0 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      panels.forEach((panel, index) => {
        const circle = panel.querySelector('.project-circle-trigger') as HTMLElement;
        const story = panel.querySelector('.project-story') as HTMLElement;
        timeline.set(panel, { autoAlpha: 1 }, index);
        timeline.fromTo(circle, { scale: .002 }, { scale: 1, duration: .72, ease: 'none' }, index);
        timeline.fromTo(story, { x: -46, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .28, ease: 'power2.out' }, index + .24);
        if (index < panels.length - 1) timeline.to(panel, { autoAlpha: 0, duration: .09, ease: 'none' }, index + .93);
      });
    });

    mm.add('(max-width: 720px), (prefers-reduced-motion: reduce)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.project-slide', trackRef.current);
      gsap.set(panels, { autoAlpha: 1, clearProps: 'transform' });
      panels.forEach(panel => {
        const circle = panel.querySelector('.project-circle-trigger');
        if (circle) gsap.set(circle, { scale: 1, clearProps: 'transform' });
      });
    });

    return () => mm.revert();
  }, { scope: trackRef, dependencies: [projects, reducedMotion], revertOnUpdate: true });

  return <section ref={trackRef} style={{ height: `${(Math.max(1, projects.length) + 1) * 100}svh` }} className={`project-showcase${reducedMotion ? ' reduce-motion' : ''}${theme === 'light' ? ' project-showcase-light' : ''}`} aria-label="Selected projects">
    <div ref={frameRef} className="project-showcase-frame">
      {projects.map((project, index) => <article key={project.id} className={`project-slide project-slide-${index + 1}`} aria-label={project.title}>
        <InteractiveProjectImage project={project} index={index} />
        <div className="project-story">
          <span className="project-number">CASE NOTE {project.id} <span>·</span> {project.techDisplay}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p className="project-first-feature">{project.features[0]}</p>
          <div className="project-tags">{project.technologies.slice(0, 5).map(technology => <span key={technology}>{technology}</span>)}</div>
          <button className="project-read" type="button" onClick={() => onOpen(project)}>OPEN CASE NOTE <ArrowUpRight size={14} /></button>
        </div>
        <span className="project-slide-coordinate">{String(index + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')}</span>
      </article>)}
      <div className="project-frame-counter" aria-hidden="true"><span>SCROLL /</span><span>ONE PROJECT AT A TIME</span></div>
    </div>
  </section>;
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = ''; };
  }, [project, onClose]);
  return <AnimatePresence>{project && <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.article className="project-dialog" initial={{ opacity: 0, y: 32, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={{ duration: .34 }} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <button className="dialog-close icon-button" onClick={onClose} aria-label="Close project details"><X size={18} /></button>
      <div className="dialog-art"><ProjectArtwork index={projectsData.findIndex(item => item.id === project.id)} /></div>
      <p className="eyebrow accent">PROJECT / {project.id}</p><h2 id="dialog-title">{project.title}</h2><p className="dialog-description">{project.description}</p>
      <div className="tech-list">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
      <h3>What it does</h3><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      {project.githubUrl && <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">View source <ArrowUpRight size={15} /></a>}
    </motion.article>
  </motion.div>}</AnimatePresence>;
}

function CustomPointer() {
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(-80); const my = useMotionValue(-80);
  const x = useSpring(mx, { stiffness: 115, damping: 16, mass: .7 });
  const y = useSpring(my, { stiffness: 115, damping: 16, mass: .7 });
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    setEnabled(media.matches);
    const move = (event: PointerEvent) => { mx.set(event.clientX); my.set(event.clientY); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my]);
  return enabled ? <motion.div className="custom-pointer" style={{ x, y }} aria-hidden="true"><span /><i /><b /></motion.div> : null;
}

export const DarkPortfolio: React.FC<{ onToggleTheme: () => void }> = ({ onToggleTheme }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [skillTowerReady, setSkillTowerReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const [projectFilter, setProjectFilter] = useState<'All' | 'Data & AI' | 'Systems'>('All');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(max > 0 ? window.scrollY / max : 0); };
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
    const timer = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (skillTowerReady) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [skillTowerReady]);

  useEffect(() => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || skillTowerReady) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setSkillTowerReady(true);
      observer.disconnect();
    }, { rootMargin: '420px 0px' });
    observer.observe(skillsSection);
    return () => observer.disconnect();
  }, [skillTowerReady]);

  const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const visibleProjects = useMemo(() => projectsData.filter(project => {
    if (projectFilter === 'Systems') return project.title.includes('Hospital') || project.title.includes('Ticket');
    if (projectFilter === 'Data & AI') return project.technologies.some(technology => ['Python', 'Gemini', 'LangChain', 'Machine Learning', 'RAG', 'ML'].includes(technology));
    return true;
  }), [projectFilter]);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setFormState('sending');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Message could not be sent.');
      setFormState('sent'); setForm({ name: '', email: '', message: '' });
    } catch { setFormState('error'); }
  };

  return <div className="portfolio-shell">
    <motion.div className="scroll-progress" style={{ scaleX: scrollProgress, transformOrigin: '0%' }} />
    <CustomPointer />
    <header className="site-header"><a href="#top" className="wordmark" aria-label="Tushar Hegde, home">TH<span>.</span><small>PERSONAL INDEX</small></a>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <button onClick={() => goTo('work')}>01 / Work</button><button onClick={() => goTo('journey')}>02 / Journey</button><button onClick={() => goTo('about')}>03 / About</button>
      </nav>
      <div className="header-actions"><a href={`mailto:${profileData.socials.email}`} className="header-contact">Start a conversation <ArrowUpRight size={14} /></a><button onClick={onToggleTheme} className="theme-toggle" aria-label="Switch to light theme">LIGHT ↗</button></div>
      <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <PortraitStory onSeeWork={() => goTo('work')} />

      <section className="work-section" id="work">
        <motion.div className="work-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={reveal}><p className="eyebrow">A FEW THINGS I’VE MADE</p><h2>Selected<br /><em>work.</em></h2><p className="work-intro-copy">Scroll once. One project takes the whole frame. Keep going to turn the page.</p><span className="work-intro-orb" aria-hidden="true" /></motion.div>
        <div className="work-controls"><div className="work-filters" role="group" aria-label="Filter projects">{(['All', 'Data & AI', 'Systems'] as const).map(filter => <button key={filter} className={projectFilter === filter ? 'filter-button active' : 'filter-button'} onClick={() => setProjectFilter(filter)}>{filter}</button>)}</div><span>{String(visibleProjects.length).padStart(2, '0')} PROJECTS / OPEN ANY TO READ THE NOTES</span></div>
        <ProjectShowcase projects={visibleProjects} onOpen={setSelectedProject} reducedMotion={Boolean(reduceMotion)} />
      </section>

      <section className="photo-notes section-wrap" aria-labelledby="photo-notes-title">
        <div className="photo-notes-top">
          <motion.div className="photo-notes-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={reveal}>
            <p className="eyebrow">OUTSIDE THE BUILD LOG</p>
            <h2 id="photo-notes-title">A few frames<br />from <em>my world.</em></h2>
            <p>Outside the projects, there’s the rest of me. Music, late-night code, games, and the quiet moments between things.</p>
          </motion.div>
          <div className="photo-notes-badge" aria-hidden="true">
            <span>FILM ROLL 01</span>
            <small>HOVER TO PAUSE LOOP</small>
          </div>
        </div>

        <div className="photo-notes-carousel" aria-label="A few frames from my world horizontal loop">
          <div className="photo-notes-track">
            {[...worldFrames, ...worldFrames].map((frame, index) => (
              <figure
                key={`${frame.id}-${index}`}
                className="photo-note"
                style={{
                  transform: `rotate(${frame.rotate}deg)`,
                }}
              >
                <img loading="lazy" src={frame.src} alt={frame.alt} />
                <figcaption>{frame.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section section-wrap" id="journey">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={reveal}><div><p className="eyebrow">JOURNEY SO FAR</p><h2>Still learning.<br /><em>Still making.</em></h2></div><p className="section-aside">A few turning points on the way from studying systems to building them.</p></motion.div>
        <div className="journey-line"><article><span>2022 — 2026</span><h3>Information Science</h3><p>B.E. at SDM Institute of Technology. Foundations in software, data systems, and the discipline of breaking hard things into smaller ones.</p></article><article><span>2026</span><h3>Technical Intern</h3><p>Castle Rock. First-hand experience taking engineering work from a brief into a working product.</p></article><article className="journey-now"><span>RIGHT NOW</span><h3>Looking for the next problem</h3><p>Building practical AI and data projects, sharpening fundamentals, and ready to join a team that cares about what it ships.</p></article></div>
      </section>

      <section className="about-section section-wrap" id="about"><motion.div className="about-lead" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={reveal}><p className="eyebrow">A LITTLE ABOUT ME</p><h2>Same roots.<br /><em>Bigger vision.</em></h2><p className="about-side-note">The work is technical.<br />The reason is human.</p></motion.div><motion.div className="about-body" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={reveal}><p className="about-bio">{profileData.bio}</p><div className="about-facts"><div><span>EDUCATION</span><strong>{profileData.education.degree}</strong><p>{profileData.education.institution} · {profileData.education.period}</p></div><div><span>EXPERIENCE</span><strong>{profileData.experience.role} · {profileData.experience.company}</strong><p>{profileData.experience.period} · {profileData.experience.status}</p></div></div><div className="personal-notes"><p className="eyebrow">A FEW THINGS I COME BACK TO</p><details><summary>Understand the whole system <span>+</span></summary><p>Small decisions make more sense when I understand what they connect to—data, people, and the work around them.</p></details><details><summary>Keep the first version honest <span>+</span></summary><p>A prototype should expose what we still don’t know. That’s more useful than polishing a guess.</p></details><details><summary>Leave things clearer <span>+</span></summary><p>Good engineering makes the next decision easier, whether that’s a teammate’s or a user’s.</p></details></div><a href="/Tushar.v4.pdf" target="_blank" rel="noreferrer" className="text-link">View résumé <ArrowUpRight size={15} /></a></motion.div></section>

      <section className="skills-section section-wrap" id="skills">
        <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={reveal}><div><p className="eyebrow">THE PRACTICE / TOOLS & APPROACH</p><h2>Think clearly.<br /><em>Build early.</em></h2></div><p className="section-aside">I like to get the rough version working early. A real prototype makes the unknowns visible and gives the team something concrete to improve.</p></motion.div>
        <div className="practice-grid"><article><span>01 / UNDERSTAND</span><h3>Start with the problem.</h3><p>Trace the user, the data, and the real constraint before reaching for a model or framework.</p></article><article><span>02 / MAKE</span><h3>Make it tangible.</h3><p>Build a small working slice. Test assumptions in code and let the behavior guide the design.</p></article><article><span>03 / REFINE</span><h3>Keep what works.</h3><p>Measure the result, simplify the rough edges, and leave the system easier to extend.</p></article></div>
        <div className="skill-game-stage">
        <div className="toolkit-heading"><div><span>THE THINGS I BUILD WITH</span><p>Build a stack, one skill at a time.</p></div><span className="toolkit-note">A SMALL STACK / BUILT ONE PIECE AT A TIME</span></div>
        <div className="skills-layout">
          {skillTowerReady ? <React.Suspense fallback={<div className="skill-tower-loading" aria-label="Loading the 3D skill game" />}><LazySkillTower skills={skillsData} activeSkill={skillsData[0].id} onSelect={() => {}} reducedMotion={Boolean(reduceMotion)} /></React.Suspense> : <div className="skill-tower-loading" aria-hidden="true" />}
        </div>
        </div>
      </section>

      <section className="contact-section section-wrap" id="contact"><div className="contact-copy"><motion.p className="eyebrow" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>HAVE A GOOD PROBLEM?</motion.p><motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>Let’s make<br /><em>something matter.</em></motion.h2><motion.p className="contact-note" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>Open to full-time roles, thoughtful collaborations, and interesting problems in data and AI.</motion.p><div className="contact-details"><span><MapPin size={14} /> {profileData.location}</span><a href={`mailto:${profileData.socials.email}`}><Mail size={14} /> {profileData.socials.email}</a></div></div>
        <form className="contact-form" onSubmit={submit}><label>Your name<input required name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" /></label><label>Email address<input required type="email" name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></label><label>What’s on your mind?<textarea required name="message" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about it…" /></label><button className="button-primary" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending…' : formState === 'sent' ? <>Message sent <Check size={16} /></> : <>Send a note <Send size={15} /></>}</button>{formState === 'error' && <p className="form-feedback error">Couldn’t send that just now. Try emailing me directly.</p>}{formState === 'sent' && <p className="form-feedback">Thanks for reaching out. I’ll be in touch.</p>}</form>
      </section>
    </main>

    <footer className="site-footer section-wrap"><a href="#top" className="footer-mark">t<span>.</span>h</a><p>Designed and built with intent.<br /><span>© {new Date().getFullYear()} Tushar Hegde</span></p><div className="social-links"><a href={profileData.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href={`mailto:${profileData.socials.email}`} aria-label="Email"><Mail size={17} /></a></div><span className="footer-location">BENGALURU, IN <ArrowUpRight size={13} /></span></footer>
    <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>;
};

export default DarkPortfolio;

