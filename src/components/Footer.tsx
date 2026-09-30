import React from 'react';
import { profileData } from '../data/profile';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c1728] border-t border-slate-700 py-12 text-slate-300 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-display text-2xl font-bold text-white tracking-[0.2em]">
            TUSHIRO
          </div>
          <div className="text-[11px] text-cyan-400/80">
            {profileData.personName} — {profileData.title}
          </div>
        </div>

        {/* Location Signal */}
        <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <MapPin size={14} className="text-cyan-400" />
          <span>{profileData.location}</span>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-4 text-cyan-400">
            <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin size={16} />
            </a>
            <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github size={16} />
            </a>
            <a href={`mailto:${profileData.socials.email}`} className="hover:text-white transition-colors">
              <Mail size={16} />
            </a>
          </div>
          <div className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} TUSHIRO. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
