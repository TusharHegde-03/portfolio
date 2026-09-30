import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData, skillMontageStages, Skill } from '../data/skills';
import {
  FileCode,
  Database,
  Zap,
  BarChart3,
  Cpu,
  Box,
  BrainCircuit,
  Terminal,
  Code2
} from 'lucide-react';

export const SkillGrid: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(skillsData[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode': return <FileCode className="text-cyan-400" size={28} />;
      case 'Database': return <Database className="text-cyan-400" size={28} />;
      case 'Zap': return <Zap className="text-cyan-400" size={28} />;
      case 'BarChart3': return <BarChart3 className="text-cyan-400" size={28} />;
      case 'Cpu': return <Cpu className="text-cyan-400" size={28} />;
      case 'Box': return <Box className="text-cyan-400" size={28} />;
      case 'BrainCircuit': return <BrainCircuit className="text-cyan-400" size={28} />;
      case 'Terminal': return <Terminal className="text-cyan-400" size={28} />;
      default: return <Code2 className="text-cyan-400" size={28} />;
    }
  };

  return (
    <div id="skills" className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold tracking-wider text-cyan-400 uppercase">
          TECHNICAL SKILLS MATRIX
        </h3>
        <span className="font-mono text-xs text-slate-400">HOVER TO INSPECT CODE</span>
      </div>

      {/* 8 Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skillsData.map((skill) => {
          const isSelected = activeSkill?.id === skill.id;
          return (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill)}
              onMouseEnter={() => setActiveSkill(skill)}
              className={`p-4 rounded-lg border text-left transition-all duration-300 relative group flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90'
              }`}
            >
              <div className="mb-2">{getIcon(skill.iconName)}</div>
              <div>
                <div className="font-display text-sm font-semibold text-white group-hover:text-cyan-300">
                  {skill.name}
                </div>
                <div className="font-mono text-[10px] text-slate-400">
                  {skill.category}
                </div>
              </div>

              {/* Cyan Accent Line on Hover */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          );
        })}
      </div>

      {/* Code Snippet Inspector Box */}
      {activeSkill && (
        <motion.div
          key={activeSkill.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a1120] border border-cyan-500/30 rounded-lg p-4 font-mono text-xs text-cyan-300 shadow-[inset_0_0_15px_rgba(0,240,255,0.05)]"
        >
          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 border-b border-slate-800 pb-1">
            <span>HUD CODE STREAM // {activeSkill.name.toUpperCase()}</span>
            <span>PYTHON / FASTAPI / SQL</span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed text-cyan-200">
            {activeSkill.codeSnippet}
          </pre>
        </motion.div>
      )}

      {/* Bottom Stage Timeline Bar (LEARN -> BUILD -> APPLY -> IMPROVE -> REPEAT) */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-400 tracking-widest uppercase">
        {skillMontageStages.map((stage, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300">{stage.name}</span>
            {i < skillMontageStages.length - 1 && <span className="text-slate-600">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
