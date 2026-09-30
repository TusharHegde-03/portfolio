import React, { useState } from 'react';
import { Download, CheckCircle, AlertCircle } from 'lucide-react';

export const ResumeButton: React.FC = () => {
  const [downloadState, setDownloadState] = useState<'idle' | 'success' | 'fallback'>('idle');

  const handleDownload = () => {
    const resumePath = '/Tushar.v4.pdf';
    
    // Attempt download
    fetch(resumePath, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          const link = document.createElement('a');
          link.href = resumePath;
          link.download = 'Tushar.v4.pdf';
          link.click();
          setDownloadState('success');
          setTimeout(() => setDownloadState('idle'), 3000);
        } else {
          // Fallback info mode
          setDownloadState('fallback');
          setTimeout(() => setDownloadState('idle'), 4000);
        }
      })
      .catch(() => {
        setDownloadState('fallback');
        setTimeout(() => setDownloadState('idle'), 4000);
      });
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleDownload}
        className="group relative px-6 py-3.5 bg-cyan-500/10 border border-cyan-400/50 hover:border-cyan-400 rounded-lg font-display text-xs tracking-widest text-cyan-300 hover:text-white uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-3 overflow-hidden"
      >
        <Download size={16} className="group-hover:translate-y-0.5 transition-transform text-cyan-400" />
        <span className="relative z-10 font-semibold">DOWNLOAD RESUME</span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Feedback Toast */}
      {downloadState === 'success' && (
        <div className="absolute left-0 mt-2 p-2 bg-emerald-900/90 border border-emerald-500 rounded text-emerald-300 text-xs font-mono flex items-center gap-2 z-20">
          <CheckCircle size={14} /> Resume PDF Downloaded!
        </div>
      )}
      {downloadState === 'fallback' && (
        <div className="absolute left-0 mt-2 p-2 bg-slate-900/95 border border-cyan-500/50 rounded text-cyan-300 text-xs font-mono flex items-center gap-2 z-20 max-w-xs shadow-xl">
          <AlertCircle size={14} className="flex-shrink-0 text-cyan-400" />
          <span>Resume architecture configured at <code>/public/resume/Tushiro-Resume.pdf</code></span>
        </div>
      )}
    </div>
  );
};
