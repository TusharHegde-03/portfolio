import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, ShieldCheck, Layers } from 'lucide-react';
import { Project } from '../../shared/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a1120] border border-cyan-500/40 rounded-xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-white"
        >
          {/* Top HUD Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 pr-12">
            <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
              PROJECT ARCHITECTURE DEEP DIVE // {project.id}
            </div>
            <h3 className="font-display text-2xl md:text-4xl font-bold tracking-wider text-white">
              {project.title}
            </h3>
            <p className="text-cyan-300 font-mono text-xs md:text-sm mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Banner Graphic Layer */}
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden border border-cyan-500/20 mb-6">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${project.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-scanline pointer-events-none opacity-30" />
          </div>

          {/* Tech Badges */}
          <div className="mb-6">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu size={14} className="text-cyan-400" />
              TECHNOLOGIES DEPLOYED
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Summary / Problem & Approach */}
          <div className="mb-6 bg-slate-900/60 border border-slate-800 rounded-lg p-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Layers size={14} className="text-cyan-400" />
              OVERVIEW & PROBLEM STATEMENT
            </div>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Functionality List */}
          <div className="mb-8">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <ShieldCheck size={14} className="text-cyan-400" />
              KEY FUNCTIONALITY & SYSTEM FEATURES
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded bg-slate-900/40 border border-slate-800/80 text-xs md:text-sm text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-500/10 border border-cyan-400/50 hover:border-cyan-400 rounded text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)]"
              >
                <Github size={16} />
                VIEW SOURCE ON GITHUB
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600/20 border border-blue-400/50 hover:border-blue-400 rounded text-xs font-mono text-blue-300 hover:text-white flex items-center gap-2 transition-all"
              >
                <ExternalLink size={16} />
                LIVE DEMO
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
