import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';

// Dark Tushiro Cyberpunk Components (Original - UNTOUCHED)
import { HeroScene } from './components/HeroScene';
import { JourneySection } from './components/JourneySection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

// Light Tushar Minimal Professional Components (NEW)
import { LightHero } from './components/light/LightHero';
import { LightProjects } from './components/light/LightProjects';
import { LightAboutSkills } from './components/light/LightAboutSkills';
import { LightContact } from './components/light/LightContact';
import { LightFooter } from './components/light/LightFooter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark-tushiro' | 'light-tushar'>(() => {
    const saved = localStorage.getItem('tushiro_theme_mode');
    return saved === 'light-tushar' ? 'light-tushar' : 'dark-tushiro';
  });
  const [activeSection, setActiveSection] = useState('hero');

  const handleSelectMode = (mode: 'dark-tushiro' | 'light-tushar') => {
    setThemeMode(mode);
    localStorage.setItem('tushiro_theme_mode', mode);
    setIsLoading(false);
  };

  const toggleThemeMode = () => {
    const newMode = themeMode === 'dark-tushiro' ? 'light-tushar' : 'dark-tushiro';
    setThemeMode(newMode);
    localStorage.setItem('tushiro_theme_mode', newMode);
  };

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero' || sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ScrollSpy to update active section link automatically as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const darkSections = ['hero', 'work', 'journey', 'skills', 'resume', 'contact'];
      const lightSections = ['light-work', 'light-about', 'light-contact'];
      const sections = themeMode === 'dark-tushiro' ? darkSections : lightSections;
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const elem = document.getElementById(section);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === 'about' ? 'skills' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [themeMode]);

  return (
    <div
      className={`min-h-screen relative selection:bg-cyan-500 selection:text-black ${
        themeMode === 'dark-tushiro' ? 'bg-[#050a14] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Initial Mode Choice Selection Loading Overlay */}
      {isLoading && <LoadingScreen onSelectMode={handleSelectMode} />}

      {/* Custom Desktop Cursor (Dark Mode Only) */}
      {themeMode === 'dark-tushiro' && <CustomCursor />}

      {/* Navigation Header with Mode Toggle Switcher */}
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        themeMode={themeMode}
        onToggleThemeMode={toggleThemeMode}
      />

      {/* Main Page Content */}
      <main className="relative z-10">
        {themeMode === 'dark-tushiro' ? (
          /* MODE A: Dark Cyberpunk Tushiro Version (Fully Intact & Preserved) */
          <>
            <HeroScene onScrollClick={() => scrollToSection('work')} />
            <ProjectsSection />
            <JourneySection />
            <SkillsSection />
            <AboutSection />
            <ContactForm />
          </>
        ) : (
          /* MODE B: Light Minimal Professional Tushar Hegde Version (Student & IS Engineer) */
          <>
            <LightHero
              onScrollToProjects={() => scrollToSection('light-work')}
              onScrollToContact={() => scrollToSection('light-contact')}
            />
            <LightProjects />
            <LightAboutSkills />
            <LightContact />
          </>
        )}
      </main>

      {/* Footer */}
      {themeMode === 'dark-tushiro' ? <Footer /> : <LightFooter />}
    </div>
  );
};

export default App;
