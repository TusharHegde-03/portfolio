import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectShowcase } from '../../DarkPortfolio';
import { projectsData, Project } from '../../../shared/projects';
import { ProjectModal } from '../ProjectModal';

export const LightProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'All' | 'Data & AI' | 'Systems'>('All');
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projects = useMemo(() => projectsData.filter(project => {
    if (filter === 'Systems') return project.title.includes('Hospital') || project.title.includes('Ticket');
    if (filter === 'Data & AI') return project.technologies.some(technology => ['Python', 'Gemini', 'LangChain', 'Machine Learning', 'RAG', 'ML', 'Qdrant'].includes(technology));
    return true;
  }), [filter]);

  return <div className="portfolio-shell light-project-shell">
    <section className="work-section" id="light-work" aria-label="Selected work">
      <header className="work-intro">
        <p className="eyebrow">A FEW THINGS I’VE MADE</p>
        <h2>Selected<br /><em>work.</em></h2>
        <p className="work-intro-copy">One project, one frame. Scroll to open each story.</p>
        <span className="work-intro-orb" aria-hidden="true" />
      </header>
      <div className="work-controls">
        <div className="work-filters" role="group" aria-label="Filter projects">
          {(['All', 'Data & AI', 'Systems'] as const).map(value => <button key={value} className={filter === value ? 'filter-button active' : 'filter-button'} onClick={() => setFilter(value)} aria-pressed={filter === value}>{value}</button>)}
        </div>
        <span>{String(projects.length).padStart(2, '0')} PROJECTS / SCROLL TO REVEAL</span>
      </div>
      <ProjectShowcase projects={projects} onOpen={setSelectedProject} reducedMotion={reducedMotion} theme="light" />
      <div className="light-project-return"><span>END OF THE INDEX</span><a href="#light-work">Back to selected work <ArrowUpRight size={14} /></a></div>
    </section>
    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>;
};

