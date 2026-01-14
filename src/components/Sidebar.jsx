import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder, FileCode, Terminal, User, Briefcase, Settings,
  Palette, X, Moon, Sun, Book, Activity, ExternalLink, Download 
} from 'lucide-react';
import TreeItem from './TreeItem';
import { usePortfolio } from '../context/PortfolioContext'; 

const Sidebar = () => {
  const { 
    data, theme, themes, iconSize,
    darkMode, setDarkMode, setCurrentTheme, 
    terminalLogs, mobileMenuOpen, setMobileMenuOpen,
    expandedFolders
  } = usePortfolio();

  const [showSettings, setShowSettings] = useState(false);
  
  // 1. Create refs for both the popup AND the button
  const settingsRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 2. Logic: Close only if clicking OUTSIDE the popup AND OUTSIDE the button
      if (
        settingsRef.current && 
        !settingsRef.current.contains(event.target) &&
        (!btnRef.current || !btnRef.current.contains(event.target))
      ) {
        setShowSettings(false);
      }
    };
    
    if (showSettings) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  const handleContentClick = (e) => e.stopPropagation();

  const renderTree = () => (
    <>
      <div className="mb-8">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4 ml-2">WHO I AM</p>
        <TreeItem id="summary" label="Career Overview" icon={User} />
        <TreeItem id="stack-view" label="Technical Skillset" icon={Terminal} />
        <TreeItem id="contact" label="Get in Touch" icon={ExternalLink} />
      </div>

      <div className="mb-8">
        <TreeItem id="experience" label="Professional Experience" icon={Folder} isFolder />
        {expandedFolders.includes('experience') && (
          <div className="ml-4 border-l border-slate-200 dark:border-slate-800 pl-2 mt-1 flex flex-col gap-1">
             {data.experience.map(e => (
               <TreeItem key={e.id} id={e.id} label={e.company} icon={Briefcase} />
             ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <TreeItem id="projects" label="Innovation Projects" icon={Folder} isFolder />
        {expandedFolders.includes('projects') && (
           <div className="ml-4 border-l border-slate-200 dark:border-slate-800 pl-2 mt-1 flex flex-col gap-1">
             {data.projects.map(p => (
               <TreeItem key={p.id} id={p.id} label={p.title} icon={FileCode} />
             ))}
           </div>
        )}
      </div>

      <div className="mb-8">
        <TreeItem id="education" label="Academic Background" icon={Folder} isFolder />
        {expandedFolders.includes('education') && (
           <div className="ml-4 border-l border-slate-200 dark:border-slate-800 pl-2 mt-1 flex flex-col gap-1">
             {data.education.map(e => (
               <TreeItem key={e.id} id={e.id} label={e.school.split(' ')[0]} icon={Book} />
             ))}
           </div>
        )}
      </div>
    </>
  );

  const containerClasses = `
    fixed inset-y-0 left-0 z-50 w-72 bg-[#f8f9fa] dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
    flex flex-col transition-transform duration-300 ease-in-out shadow-2xl 
    ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
    min-[960px]:translate-x-0 min-[960px]:relative min-[960px]:shadow-none
  `;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} min-[960px]:hidden`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside className={containerClasses} onClick={handleContentClick}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className={`w-8 h-8 ${theme.color} rounded-xl flex items-center justify-center text-white font-black shadow-lg ${theme.shadow}`}>D</div>
             <p className="font-black text-lg tracking-tight dark:text-slate-100 italic">PORTFOLIO</p>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="min-[960px]:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
          {renderTree()}
        </div>

        <div className="bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 shrink-0 relative">
          
          {showSettings && (
             <div 
               ref={settingsRef}
               className="absolute bottom-full left-4 mb-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[100] p-4 animate-in fade-in zoom-in-95 slide-in-from-bottom-2"
             >
                <div className="flex items-center justify-between mb-4 px-1">
                   <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                     <Palette size={iconSize} /> Appearance
                   </span>
                   <button onClick={() => setShowSettings(false)} className="text-slate-300 dark:text-slate-600 hover:text-slate-500"><X size={iconSize}/></button>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-xl mb-4 border border-slate-100 dark:border-slate-700">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Mode</span>
                   <button 
                     onClick={() => setDarkMode(!darkMode)}
                     className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-blue-500 transition-all dark:text-white"
                   >
                     {darkMode ? <Sun size={iconSize} className="text-amber-500" /> : <Moon size={iconSize} className="text-blue-500" />}
                     {darkMode ? 'Light' : 'Dark'}
                   </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                   {themes.map((t) => (
                     <button key={t.id} onClick={() => setCurrentTheme(t)} className={`h-12 rounded-xl transition-all border-2 flex items-center justify-center ${t.id === theme.id ? theme.border : 'border-transparent'}`} title={t.name}>
                       <div className={`w-6 h-6 rounded-full ${t.color} shadow-sm border border-white/20`} />
                     </button>
                   ))}
                </div>
             </div>
          )}

          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex gap-2">
             <button 
                ref={btnRef} // 3. Attach Ref to the button
                onClick={() => setShowSettings(!showSettings)} 
                className={`p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${showSettings ? 'text-blue-500 border-blue-200' : 'text-slate-500 dark:text-slate-400'}`} 
                title="Settings"
             >
                <Settings size={18} />
             </button>
             <a href="/Divyank-Resume.pdf" download className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest text-white ${theme.color} hover:opacity-90 transition-opacity shadow-sm`}>
                <Download size={14} /> Download CV
              </a>
          </div>

          <div className="p-4 bg-slate-900 text-opacity-80 font-mono text-[10px]">
            <div className="flex items-center justify-between mb-2 text-white">
              <span className={`flex items-center gap-1 ${theme.text}`}><Activity size={14} /> TERMINAL</span>
              <span className="text-slate-600">v3.1.0</span>
            </div>
            <div className="space-y-1 h-12 overflow-hidden">
               {terminalLogs.map((log, i) => (
                 <div key={i} className="truncate opacity-80 text-blue-400">{log}</div>
               ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;