import React from 'react';
import { profileData } from '../../data/profile';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const LightFooter: React.FC = () => {
  return (
    <footer className="w-full bg-slate-100 border-t border-slate-200 py-12 text-slate-600 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-display text-xl font-bold text-slate-900 tracking-tight">
            {profileData.personName}
          </div>
          <div className="text-xs text-slate-500">
            Information Science Engineer • Data Engineer & AI Builder
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <MapPin size={14} className="text-blue-600" />
          <span>{profileData.location}</span>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-4 text-slate-600">
            <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <Linkedin size={16} />
            </a>
            <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <Github size={16} />
            </a>
            <a href={`mailto:${profileData.socials.email}`} className="hover:text-blue-600 transition-colors">
              <Mail size={16} />
            </a>
          </div>
          <div className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} {profileData.personName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
