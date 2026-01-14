import React from 'react';
import { Terminal, Menu, ChevronRight,Database } from 'lucide-react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

import BootScreen from './components/BootScreen';
import Sidebar from './components/Sidebar';
import CustomCursor from './components/CustomCursor';

// Views
import ViewSummary from './views/ViewSummary';
import ViewExperience from './views/ViewExperience';
import ViewProject from './views/ViewProject';
import ViewSkills from './views/ViewSkills';
import ViewEducation from './views/ViewEducation';
import ViewContact from './views/ViewContact';
import ViewChangelog from './views/ViewChangelog';

import firebaseLogo from './assets/firebase.svg';


const PortfolioContent = () => {
  const { 
    activeNode, 
    theme, 
    darkMode, 
    isBooting, 
    getTerminalPath, 
    setMobileMenuOpen, 
    visitCount,
    iconSize, // from Context
    data      // from Context
  } = usePortfolio();

  const renderContent = () => {
    const exp = data.experience.find(e => e.id === activeNode);
    const proj = data.projects.find(p => p.id === activeNode);
    const edu = data.education.find(e => e.id === activeNode);

    // Pass data/theme as needed, or let Views consume context directly too!
    // Ideally, views should consume context, but passing props here is fine for now.
    if (activeNode === 'summary') return <ViewSummary theme={theme} />;
    if (activeNode === 'stack-view') return <ViewSkills theme={theme} />;
    if (activeNode === 'contact') return <ViewContact theme={theme} />;
    if (activeNode === 'changelog') return <ViewChangelog />; 
    if (exp) return <ViewExperience exp={exp} theme={theme} />;
    if (proj) return <ViewProject proj={proj} theme={theme} />;
    if (edu) return <ViewEducation edu={edu} theme={theme} />;
    return null;
  };

  if (isBooting) return <>
  <div className="hidden min-[960px]:block">
  <CustomCursor />
  
</div>
<BootScreen />
  </> 

  return (
    <div className={`h-screen bg-[#fafafa] dark:bg-slate-950 flex overflow-hidden font-sans text-slate-900 dark:text-slate-100 selection:bg-opacity-30`}>
      <div className="hidden min-[960px]:block">
  <CustomCursor />
</div>
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative bg-white dark:bg-slate-950 flex flex-col w-full">
        
        {/* Navbar */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl px-4 md:px-8 py-3 md:py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <button 
               onClick={() => setMobileMenuOpen(true)}
               className="min-[960px]:hidden flex items-center gap-2 bg-slate-100 dark:bg-slate-900 py-2 px-3 md:px-4 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-800 active:scale-95 transition-transform shrink-0"
             >
               <Menu size={18} className="shrink-0" />
               <span className="hidden sm:inline">Menu</span>
               <ChevronRight size={14} className="ml-1 opacity-50 shrink-0" />
             </button>

             <div className="hidden md:flex items-center gap-3 bg-slate-100 dark:bg-slate-900/50 py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-800/50 overflow-hidden">
                <Terminal size={iconSize} className={`shrink-0 ${theme.text}`} />
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate max-w-[200px] lg:max-w-none">
                  root@portfolio: <span className={`${theme.text} font-bold`}>{getTerminalPath()}</span>
                </span>
             </div>
           </div>
           
           <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-500 text-[10px] font-black rounded-full border border-green-100 dark:border-green-900/40 animate-pulse shrink-0">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" /> 
                 <span>LIVE_PORTFOLIO</span>
              </div>
           </div>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="1"/>
                 </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>

        <div className="flex-1 px-6 md:px-12 lg:px-24 py-8 md:py-12 lg:py-20 max-w-6xl mx-auto w-full relative z-10">
          {renderContent()}
        </div>

        <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
   
   {/* LEFT SIDE: Identity & Socials */}
   <div className="flex flex-col gap-2">
       <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
          DIVYANK SINGH — SOFTWARE ENGINEER
       </div>
       <div className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
       </div>
       
       {/* SOCIAL LINKS GROUP */}
       <div className="flex gap-3 justify-center md:justify-start text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
          <a href={`mailto:${data.email}`} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors lowercase">{data.email}</a>
          <span className="opacity-30">/</span>
          <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">LinkedIn</a>
          <span className="opacity-30">/</span>
          <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">GitHub</a>
       </div>
   </div>

   {/* RIGHT SIDE: Location & Real-time Stats */}
   <div className="flex flex-col md:items-end gap-1.5 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">
      
      {/* Location Coordinates */}
      <div className="flex gap-4">
          <span className={`${theme.text}`}>IIT PATNA (MS AICS)</span>
          <span className="hidden sm:inline">PRAYAGRAJ, INDIA</span>
      </div>

      {/* Live Firebase Counter */}
      <div className="flex items-center gap-2 mt-1 opacity-80 hover:opacity-100 transition-opacity">
         
         {/* Logo Container */}
         <div className="relative flex items-center justify-center w-4 h-4">
            {/* The Pulse Effect (Amber Glow) */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400/20 animate-ping"></span>
            
            {/* YOUR LOCAL SVG LOGO */}
            <img 
              src={firebaseLogo} 
              alt="Firebase" 
              className="w-4 h-4 object-contain relative z-10"
            />
         </div>

         {/* visitCount is the variable we defined in PortfolioContext */}
         <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
            {visitCount} <span className="opacity-60 text-[8px]">Views</span>
         </span>
      </div>

   </div>
</footer>
      </main>
    </div>
  );
};

const App = () => (
  <PortfolioProvider>
    <PortfolioContent />
  </PortfolioProvider>
);

export default App;