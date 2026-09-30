import React from 'react';
import { profileData } from '../../data/profile';
import { skillsData } from '../../data/skills';
import { ResumeButton } from '../ResumeButton';
import { GraduationCap, Briefcase, Code2, Database, Zap, BarChart3, Cpu, Box, BrainCircuit, Terminal, CheckCircle2 } from 'lucide-react';

export const LightAboutSkills: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode': return <Code2 className="text-slate-900" size={24} />;
      case 'Database': return <Database className="text-slate-900" size={24} />;
      case 'Zap': return <Zap className="text-slate-900" size={24} />;
      case 'BarChart3': return <BarChart3 className="text-slate-900" size={24} />;
      case 'Cpu': return <Cpu className="text-slate-900" size={24} />;
      case 'Box': return <Box className="text-slate-900" size={24} />;
      case 'BrainCircuit': return <BrainCircuit className="text-slate-900" size={24} />;
      case 'Terminal': return <Terminal className="text-slate-900" size={24} />;
      default: return <Code2 className="text-slate-900" size={24} />;
    }
  };

  return (
    <section id="light-about" className="py-24 bg-[#f8fafc] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Profile Bio & Education/Experience */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 font-mono text-xs font-bold uppercase tracking-widest mb-3">
                <CheckCircle2 size={14} className="text-emerald-600" /> FRESH GRADUATE ENGINEER
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                About Tushar Hegde
              </h2>
            </div>

            <p className="text-slate-700 text-base md:text-lg leading-relaxed bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              "{profileData.bio}"
            </p>

            <div className="flex items-center gap-4">
              <ResumeButton />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Education Box */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                  <GraduationCap size={18} className="text-blue-600" /> EDUCATION
                </div>
                <div className="font-display font-bold text-slate-900 text-sm">{profileData.education.degree}</div>
                <div className="text-xs text-slate-600">{profileData.education.institution}</div>
                <div className="text-xs font-mono text-blue-600 font-semibold">{profileData.education.period}</div>
              </div>

              {/* Experience Box */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                  <Briefcase size={18} className="text-blue-600" /> EXPERIENCE
                </div>
                <div className="font-display font-bold text-slate-900 text-sm">{profileData.experience.role}</div>
                <div className="text-xs text-slate-600">{profileData.experience.company} ({profileData.experience.period})</div>
                <div className="text-xs font-mono text-emerald-600 font-semibold">• {profileData.experience.status}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills Matrix */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest mb-2">
                CORE COMPETENCIES
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Technical Skills
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {skillsData.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[110px]"
                >
                  <div className="mb-2">{getIcon(skill.iconName)}</div>
                  <div className="font-display text-xs font-bold text-slate-900">{skill.name}</div>
                  <div className="font-mono text-[10px] text-slate-500 mt-0.5">{skill.category}</div>
                </div>
              ))}
            </div>

            {/* Code Snippet Inspector Box */}
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs text-cyan-300 shadow-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 mb-3 border-b border-slate-800 pb-2 flex justify-between items-center">
                <span>SYSTEM SPECIFICATION // FRESH GRADUATE ENGINEER</span>
                <span className="text-emerald-400 font-bold">STATUS: READY FOR WORK</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed text-cyan-200">
                {`@app.get("/api/profile")
async def profile():
    return {
        "name": "Tushar Hegde",
        "degree": "B.E. Information Science & Engineering",
        "status": "Fresh Graduate",
        "role": "Data Engineer | AI Builder",
        "location": "Bengaluru, India"
    }`}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
