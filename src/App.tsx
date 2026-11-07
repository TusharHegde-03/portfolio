import React, { lazy, Suspense, useEffect, useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';

const Navigation = lazy(() => import('./components/Navigation').then(module => ({ default: module.Navigation })));
const LightHero = lazy(() => import('./components/light/LightHero').then(module => ({ default: module.LightHero })));
const LightProjects = lazy(() => import('./components/light/LightProjects').then(module => ({ default: module.LightProjects })));
const LightAboutSkills = lazy(() => import('./components/light/LightAboutSkills').then(module => ({ default: module.LightAboutSkills })));
const LightContact = lazy(() => import('./components/light/LightContact').then(module => ({ default: module.LightContact })));
const LightFooter = lazy(() => import('./components/light/LightFooter').then(module => ({ default: module.LightFooter })));
const DarkPortfolio = lazy(() => import('./DarkPortfolio').then(module => ({ default: module.DarkPortfolio })));

type ThemeMode = 'dark-tushiro' | 'light-tushar';

export const App: React.FC = () => {
  const [isChoosingTheme, setIsChoosingTheme] = useState(true);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return localStorage.getItem('tushiro_theme_mode') === 'light-tushar' ? 'light-tushar' : 'dark-tushiro';
  });
  const [activeSection, setActiveSection] = useState('top');

  const selectMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('tushiro_theme_mode', mode);
    setIsChoosingTheme(false);
    window.scrollTo({ top: 0 });
  };
  const toggleMode = () => selectMode(themeMode === 'dark-tushiro' ? 'light-tushar' : 'dark-tushiro');
  const navigate = (id: string) => {
    setActiveSection(id);
    if (id === 'top' || id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const sections = themeMode === 'dark-tushiro' ? ['top', 'work', 'journey', 'skills', 'about', 'contact'] : ['light-work', 'light-about', 'light-contact'];
    const onScroll = () => {
      const scrollY = window.scrollY + 180;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
          setActiveSection(id);
          return;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [themeMode]);

  return <div className={themeMode === 'dark-tushiro' ? 'min-h-screen dark-experience' : 'min-h-screen light-experience'}>
    {isChoosingTheme && <LoadingScreen onSelectMode={selectMode} />}
    <Suspense fallback={<div className="experience-loading" aria-label="Loading portfolio" />}>
    {themeMode === 'dark-tushiro' ? <>
      <DarkPortfolio onToggleTheme={toggleMode} />
    </> : <>
      <Navigation activeSection={activeSection} onNavigate={navigate} themeMode={themeMode} onToggleThemeMode={toggleMode} />
      <main className="relative z-10">
        <LightHero onScrollToProjects={() => navigate('light-work')} onScrollToContact={() => navigate('light-contact')} />
        <LightProjects />
        <LightAboutSkills />
        <LightContact />
      </main>
      <LightFooter />
    </>}
    </Suspense>
  </div>;
};

export default App;
