import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, ShieldCheck, Layers } from 'lucide-react';
import { Project } from '../../shared/projects';
import { ProjectArtwork } from '../DarkPortfolio';
import { projectsData } from '../../shared/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="project-modal-backdrop">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="project-modal-panel"
        >
          {/* Top HUD Border Accent */}
          <div className="project-modal-accent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="project-modal-close"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="project-modal-heading">
            <div className="project-modal-kicker">
              PROJECT ARCHITECTURE DEEP DIVE // {project.id}
            </div>
            <h3 className="project-modal-title">
              {project.title}
            </h3>
            <p className="project-modal-tagline">
              {project.tagline}
            </p>
          </div>

          {/* Banner Graphic Layer */}
          <div className="project-modal-artwork">
            <ProjectArtwork index={projectsData.findIndex(item => item.id === project.id)} />
          </div>

          {/* Tech Badges */}
          <div className="mb-6">
            <div className="project-modal-section-label">
              <Cpu size={14} />
              TECHNOLOGIES DEPLOYED
            </div>
            <div className="project-modal-tech-list">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="project-modal-tech"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Summary / Problem & Approach */}
          <div className="project-modal-overview">
            <div className="project-modal-section-label">
              <Layers size={14} />
              OVERVIEW & PROBLEM STATEMENT
            </div>
            <p>
              {project.description}
            </p>
          </div>

          {/* Key Functionality List */}
          <div className="project-modal-features">
            <div className="project-modal-section-label">
              <ShieldCheck size={14} />
              KEY FUNCTIONALITY & SYSTEM FEATURES
            </div>
            <div className="project-modal-feature-grid">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="project-modal-feature"
                >
                  <span className="project-modal-bullet" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="project-modal-actions">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-action"
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
                className="project-modal-action"
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

