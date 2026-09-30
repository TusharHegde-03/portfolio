import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData, Project } from '../../../shared/projects';
import { ProjectModal } from '../ProjectModal';
import { ArrowUpRight, Code2 } from 'lucide-react';

export const LightProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'All' | 'Real Projects' | 'Data & AI'>('All');

  const filteredProjects = projectsData.filter((project: Project) => {
    if (filter === 'Real Projects') return true;
    if (filter === 'Data & AI') return project.technologies.some((t: string) => ['Python', 'Gemini', 'LangChain', 'ML', 'Qdrant'].includes(t));
    return true;
  });

  return (
    <section id="light-work" className="relative w-full py-24 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section with Background Faint Watermark Text (Matching Reference 2) */}
        <div className="relative mb-12 text-center">
          {/* Faint Watermark "PORTFOLIO" */}
          <div className="font-display text-[70px] sm:text-[120px] md:text-[160px] font-extrabold text-slate-100 uppercase tracking-widest pointer-events-none select-none leading-none opacity-80">
            PORTFOLIO
          </div>

          {/* Main Title "/SELECTED WORK" Overlaid */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
              /SELECTED WORK
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-mono mt-2 uppercase tracking-widest">
              Engineered data pipelines • ML models • Real-world applications
            </p>
          </div>
        </div>

        {/* Filter Tabs Header Bar (Matching Reference 2) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            {(['All', 'Real Projects', 'Data & AI'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  filter === tab
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              View All Work <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        {/* Projects Cards Grid (Matching Reference 2 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: Project, idx: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group bg-slate-50/80 border border-slate-200/90 rounded-3xl p-5 hover:border-slate-400 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image Preview Header */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 mb-5">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Top Badge: REAL PROJECT */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-900 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    REAL PROJECT
                  </span>
                </div>

                {/* Top-Right Arrow Action Circle (Matching Reference 2) */}
                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-md">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Card Details */}
              <div className="px-2 pb-2">
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Tags Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60">
                  {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-mono text-[11px] font-medium shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-mono text-[11px] font-medium ml-auto flex items-center gap-1">
                    <Code2 size={12} /> {project.techDisplay}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal View */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
