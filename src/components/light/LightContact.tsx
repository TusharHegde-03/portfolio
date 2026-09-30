import React, { useState } from 'react';
import { profileData } from '../../data/profile';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Linkedin, Github, MapPin } from 'lucide-react';

export const LightContact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit message.');
      }
    } catch {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="light-contact" className="py-24 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest mb-2">
            CONTACT TU SHAR
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-600 text-base md:text-lg mt-2">
            Open for entry-level opportunities, internships, and data engineering projects.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="light-name" className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="light-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Mercer"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="light-email" className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                Your Email Address *
              </label>
              <input
                type="email"
                id="light-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="light-message" className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                Message *
              </label>
              <textarea
                id="light-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Tushar, I saw your portfolio and would like to connect regarding..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                required
              />
            </div>

            {status === 'error' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-mono flex items-center gap-2">
                <AlertCircle size={16} /> {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold">Message Sent!</div>
                  <div>Thank you for reaching out. Tushar will respond to your email soon.</div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" /> {profileData.socials.email}
            </div>
            <div className="flex items-center gap-4 text-slate-700 font-medium">
              <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
