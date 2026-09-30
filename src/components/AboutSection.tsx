import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { BarChart3, BrainCircuit, Briefcase, Code2, Database, FileCode, Github, GraduationCap, Linkedin, Mail, MapPin, Send, Terminal, Zap } from 'lucide-react';
import { profileData } from '../data/profile';
import { ResumeButton } from './ResumeButton';
import { ResumeCanvas } from './ResumeCanvas';

const skills: [string, LucideIcon][] = [
  ['Python', FileCode], ['SQL', Database], ['FastAPI', Zap], ['Data Analysis', BarChart3],
  ['Machine Learning', BrainCircuit], ['OOP', Code2], ['Problem Solving', BrainCircuit], ['Git & GitHub', Terminal],
];

const DetailHeading = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
  <h3 className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[.18em] text-cyan-300"><Icon size={18} />{children}</h3>
);

export const AboutSection: React.FC = () => (
  <section id="resume" className="relative isolate overflow-hidden bg-[#0c1f36] py-20 xl:h-[941px] xl:py-0 border-t border-cyan-500/30">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-transparent to-cyan-600/10" />

    <div className="relative mx-auto max-w-[1672px] px-6 sm:px-10 xl:h-full xl:px-14">
      <div className="grid gap-10 xl:h-full xl:grid-cols-[44%_34%_22%] xl:gap-0">
        <div className="relative hidden xl:block" aria-label="Tushiro in cyber suit">
          <div className="absolute left-8 right-8 top-48 h-72"><ResumeCanvas /></div>
          <img src="/characters/tushiro_cyber_suit_448x437.png" alt="Tushiro in cyber suit" className="absolute bottom-10 left-1/2 w-full max-w-[448px] -translate-x-1/2 object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,.7)]" />
        </div>

        <main className="rounded-xl border border-cyan-300/20 bg-[#061426]/72 p-7 shadow-[0_18px_55px_rgba(0,0,0,.3)] backdrop-blur-sm sm:p-9 xl:self-center xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0 xl:pr-12 xl:shadow-none xl:backdrop-blur-none">
          <p className="font-mono text-xs font-semibold tracking-[.3em] text-cyan-300">ABOUT ME</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[.08em] text-white sm:text-5xl">TUSHAR</h2>
          <p className="mt-3 font-display text-lg tracking-wide text-slate-100">Engineer <span className="px-4 text-cyan-400">|</span> AI Builder</p>
          <p className="mt-7 max-w-[530px] text-base leading-relaxed text-slate-100 sm:text-lg">{profileData.bio}</p>
          <div className="mt-7"><ResumeButton /></div>

          <div className="mt-9 max-w-[540px]">
            <div className="mb-4 flex items-center gap-4"><span className="font-mono text-sm font-semibold tracking-[.24em] text-cyan-300">SKILLS</span><span className="h-px flex-1 bg-cyan-300/35" /></div>
            <div className="grid border-l border-t border-cyan-300/35" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
              {skills.map(([name, Icon]) => <div key={name} className="flex min-h-[106px] flex-col items-center justify-center border-b border-r border-cyan-300/35 px-2 text-center"><Icon size={28} className="text-cyan-200" /><p className="mt-2 text-xs leading-tight text-slate-100 sm:text-sm">{name}</p></div>)}
            </div>
          </div>
        </main>

        <aside className="border-t border-cyan-300/35 pt-8 xl:my-44 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
          <p className="font-handwriting text-4xl leading-tight text-cyan-300">Same person.<br />Different vision.</p>
          <section className="mt-10"><DetailHeading icon={GraduationCap}>EDUCATION</DetailHeading><p className="mt-4 pl-8 text-sm leading-relaxed text-slate-100">{profileData.education.degree}<br />{profileData.education.institution}<br /><span className="text-cyan-200">{profileData.education.period}</span></p></section>
          <section className="mt-10"><DetailHeading icon={Briefcase}>EXPERIENCE</DetailHeading><p className="mt-4 pl-8 text-sm leading-relaxed text-slate-100">Looking for my first opportunity<br /><span className="text-cyan-200">(2026)</span></p></section>
          <section className="mt-10"><DetailHeading icon={Mail}>GET IN TOUCH</DetailHeading><div className="mt-4 space-y-3 pl-8 text-sm text-slate-100"><p className="flex items-start gap-2 break-all"><Mail size={15} className="mt-0.5 shrink-0 text-cyan-300" />{profileData.socials.email}</p><p className="flex items-center gap-2"><MapPin size={15} className="shrink-0 text-cyan-300" />{profileData.location}</p><div className="flex gap-4 pt-2 text-cyan-100"><a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-cyan-300"><Linkedin size={20} /></a><a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-cyan-300"><Github size={20} /></a><a href={`mailto:${profileData.socials.email}`} aria-label="Email" className="transition-colors hover:text-cyan-300"><Send size={20} /></a></div></div></section>
          <p className="mt-11 font-handwriting text-3xl leading-tight text-cyan-300">Let’s build<br />something great. →</p>
        </aside>
      </div>
    </div>
  </section>
);
