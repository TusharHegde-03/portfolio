import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData, Project } from '../../shared/projects';
import { ProjectModal } from './ProjectModal';
import { ArrowLeft, ArrowRight, GripHorizontal, Maximize2, Terminal } from 'lucide-react';

const circularDistance = (index: number, activeIndex: number) => {
  const length = projectsData.length;
  let distance = index - activeIndex;
  if (distance > length / 2) distance -= length;
  if (distance < -length / 2) distance += length;
  return distance;
};

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragged = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % projectsData.length), 3300);
    return () => window.clearInterval(timer);
  }, [isPaused, isVisible]);

  const moveTo = (index: number) => {
    const normalized = (index + projectsData.length) % projectsData.length;
    setActiveIndex(normalized);
  };
  const handleDrag = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 4) dragged.current = true;
  };
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const direction = info.offset.x < -32 ? 1 : info.offset.x > 32 ? -1 : 0;
    moveTo(activeIndex + direction);
    resumeTimer.current = window.setTimeout(() => {
      dragged.current = false;
      setIsPaused(false);
    }, 700);
  };

  return (
    <section ref={sectionRef} id="work" className="projects-showcase relative w-full min-h-screen overflow-hidden border-t border-cyan-400/15">
      <div className="projects-showcase__background absolute inset-0 pointer-events-none" />
      <div className="projects-showcase__veil absolute inset-0 pointer-events-none" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1680px] flex-col px-6 pb-12 pt-28 md:px-12 md:pt-32">
        <div className="mb-8 max-w-4xl md:mb-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">MY PROJECTS</div>
          <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-[0.12em] text-white md:text-5xl lg:text-6xl">REAL-WORLD PROBLEMS. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">INTELLIGENT SOLUTIONS.</span></h2>
          <p className="mt-4 text-sm tracking-wide text-slate-200 md:text-lg">Built with curiosity. Powered by data. Designed for impact.</p>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-100/80 md:text-xs">
          <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full bg-cyan-300 ${isPaused ? '' : 'animate-pulse'}`} /> {isPaused ? 'ROTATION PAUSED' : 'AUTO-ROTATION ACTIVE'}</span>
          <span className="hidden items-center gap-2 sm:flex"><GripHorizontal size={15} /> HOVER TO PAUSE · DRAG TO ROTATE</span>
        </div>

        <div className="project-carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => !dragged.current && setIsPaused(false)}>
          <div className="project-carousel__fade project-carousel__fade--left" />
          <div className="project-carousel__fade project-carousel__fade--right" />
          <motion.div className="project-carousel__ring" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.08} onTouchStart={() => setIsPaused(true)} onDragStart={() => setIsPaused(true)} onDrag={handleDrag} onDragEnd={handleDragEnd}>
            {projectsData.map((project, index) => {
              const distance = circularDistance(index, activeIndex);
              const depth = Math.abs(distance);
              return <motion.article key={project.id} className="project-card project-carousel__card" animate={{ x: distance * 390, y: -depth * 34, z: -depth * 45, rotateY: distance * -9, scale: depth === 0 ? 1 : depth === 1 ? 0.96 : 0.84, opacity: depth === 2 ? 0.58 : 1 }} transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }} style={{ zIndex: 10 - depth }} onClick={() => { if (!dragged.current) setSelectedProject(project); }} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && setSelectedProject(project)} aria-label={`Preview ${project.title}`}>
                <div className="project-card__titlebar"><div><div className="mb-2 flex items-center justify-between gap-3"><span className="font-mono text-[10px] tracking-[0.16em] text-cyan-300">SYS // {project.id}</span><Terminal size={15} className="text-cyan-300" /></div><h3 className="font-display text-xl font-bold leading-tight text-white md:text-2xl">{project.title}</h3></div><p className="mt-4 font-mono text-[11px] tracking-wide text-cyan-100/90">{project.techDisplay}</p></div>
                <div className="project-card__visual" style={{ backgroundImage: `url('${project.image}')`, backgroundPosition: project.bgPosition }}><div className="project-card__scanlines" /><div className="project-card__visual-label">{project.tagline}</div></div>
                <div className="project-card__footer"><button type="button" onClick={(event) => { event.stopPropagation(); setSelectedProject(project); }} className="project-card__preview">VIEW PROJECT <Maximize2 size={13} /></button><ArrowRight size={14} /></div>
              </motion.article>;
            })}
          </motion.div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3" aria-label="Project carousel controls">
          <button type="button" onClick={() => moveTo(activeIndex - 1)} className="project-carousel__control" aria-label="Show previous project"><ArrowLeft size={18} /></button>
          {projectsData.map((project, index) => <button key={project.id} type="button" onClick={() => moveTo(index)} className={`project-carousel__dot ${activeIndex === index ? 'is-active' : ''}`} aria-label={`Show project ${index + 1}: ${project.title}`} aria-current={activeIndex === index ? 'true' : undefined} />)}
          <button type="button" onClick={() => moveTo(activeIndex + 1)} className="project-carousel__control" aria-label="Show next project"><ArrowRight size={18} /></button>
        </div>
        <div className="mt-5 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100/80 md:text-xs"><div className="h-px w-10 bg-cyan-300" /><span>Drag, hover, or use controls to explore · Click a card to preview</span><div className="h-px w-10 bg-cyan-300" /></div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
