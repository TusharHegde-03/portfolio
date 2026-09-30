import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Linkedin, Github } from 'lucide-react';
import { profileData } from '../data/profile';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('The contact service is unavailable. Please use the direct email link below.');
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 bg-[#0c1728] overflow-hidden border-t border-slate-700">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase mb-2">
              INITIATE COMMUNICATION
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-widest text-white uppercase">
              LET'S BUILD SOMETHING GREAT
            </h2>
            <p className="font-handwriting text-cyan-300 text-2xl mt-2">
              {profileData.handwrittenAccents.contact}
            </p>
          </div>

          {/* Form Container Panel */}
          <div className="bg-[#14233a]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-8 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.55)] relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-3 bg-[#0c1728] border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
                  YOUR EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 bg-[#0c1728] border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-500"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
                  MESSAGE / PROJECT DETAILS *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, opportunity, or collaboration idea..."
                  className="w-full px-4 py-3 bg-[#0c1728] border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-500 resize-none"
                  required
                />
              </div>

              {/* Status Alert Banner */}
              {status === 'error' && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-lg text-rose-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="p-4 bg-cyan-950/80 border border-cyan-400/50 rounded-lg text-cyan-300 text-xs font-mono flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold">TRANSMISSION RECEIVED!</div>
                    <div>Thank you for reaching out. Tushiro will get back to you shortly.</div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-cyan-500/15 border border-cyan-400 hover:bg-cyan-400 hover:text-black rounded-lg font-display text-xs tracking-widest text-cyan-300 font-bold uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    TRANSMITTING DATA...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    SEND TRANSMISSION
                  </>
                )}
              </button>
            </form>

            {/* Direct Connect Links */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-cyan-400" />
                <span>{profileData.socials.email}</span>
              </div>
              <div className="flex items-center gap-4 text-cyan-400">
                <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <Github size={14} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
