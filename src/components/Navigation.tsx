import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  themeMode: 'dark-tushiro' | 'light-tushar';
  onToggleThemeMode: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  themeMode,
  onToggleThemeMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = themeMode === 'dark-tushiro';

  const navItems = isDark
    ? [
        { id: 'work', label: 'WORK' },
        { id: 'journey', label: 'JOURNEY' },
        { id: 'skills', label: 'SKILLS' },
        { id: 'resume', label: 'RESUME' },
        { id: 'contact', label: 'CONTACT' },
      ]
    : [
        { id: 'light-work', label: 'PROJECTS' },
        { id: 'light-about', label: 'ABOUT & SKILLS' },
        { id: 'light-contact', label: 'CONTACT' },
      ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? scrolled
            ? 'bg-[#050a14]/90 backdrop-blur-md border-b border-cyan-500/20 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-6'
          : scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm text-slate-900'
          : 'bg-transparent py-6 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          initial={{ opacity: 0, x: -80, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          onClick={() => handleItemClick(isDark ? 'hero' : 'top')}
          className="group flex items-center gap-2 text-left focus:outline-none"
        >
          <span
            className={`font-display text-2xl md:text-3xl font-bold tracking-[0.2em] transition-colors ${
              isDark
                ? 'text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_12px_#00f0ff]'
                : 'text-slate-900 group-hover:text-blue-600'
            }`}
          >
            {isDark ? 'TUSHIRO' : 'TUSHAR HEGDE'}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-cyan-400 group-hover:animate-ping' : 'bg-blue-600'
            }`}
          />
        </motion.button>

        {/* Desktop Nav Items + Mode Switcher */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 60 + index * 15, y: -40 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 22,
                    delay: 0.3 + index * 0.08,
                  }}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative font-display text-xs tracking-widest transition-colors py-2 focus:outline-none ${
                    isDark
                      ? isActive
                        ? 'text-cyan-400 font-semibold'
                        : 'text-slate-300 hover:text-white'
                      : isActive
                      ? 'text-blue-600 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}

                  {/* Active indicator */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                        isDark ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'bg-blue-600'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </motion.button>
              );
            })}
          </nav>

          {/* Mode Switcher Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onToggleThemeMode}
            className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
              isDark
                ? 'bg-slate-900/80 border border-cyan-500/40 text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600'
            }`}
            title="Switch Portfolio Experience Mode"
          >
            {isDark ? (
              <>
                <Sun size={14} className="text-amber-400" />
                <span>LIGHT MINIMAL</span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-blue-600" />
                <span>DARK TUSHIRO</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onToggleThemeMode}
            className={`p-2 rounded-lg border font-mono text-xs ${
              isDark
                ? 'bg-slate-900 border-cyan-500/40 text-cyan-400'
                : 'bg-white border-slate-300 text-blue-600'
            }`}
            aria-label="Toggle mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-lg border focus:outline-none ${
              isDark
                ? 'text-cyan-400 border-cyan-500/30 bg-slate-900/60'
                : 'text-slate-800 border-slate-300 bg-white'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden px-6 py-6 border-b ${
              isDark
                ? 'bg-[#0a1120]/95 backdrop-blur-xl border-cyan-500/30 text-white'
                : 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="text-left font-display text-sm tracking-widest py-3 border-b border-slate-200/40 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <Terminal size={14} className="text-cyan-400" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
