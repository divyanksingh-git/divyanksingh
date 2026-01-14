import React from 'react';
import { Clock, Terminal, FileCode, Award, Zap, Layers, ArrowUpRight, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewProject = ({ proj, theme }) => {
  const { iconSize } = usePortfolio();

  return (
    // 1. ALIGNMENT WRAPPER: Matches Experience/Education alignment
    <div className="w-full flex flex-col items-center xl:items-start animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      
      {/* Container restricted to max-width to keep grid looking good */}
      <div className="w-full max-w-6xl">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.bgLight} ${theme.darkBgLight} ${theme.text} text-[10px] font-black uppercase tracking-widest mb-4`}>
              <Layers size={12} className="shrink-0" /> {proj.context}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tighter leading-[0.95] mb-2">
              {proj.title}
            </h2>
          </div>
          
          <div className="shrink-0 flex items-center gap-2 text-slate-400 font-bold text-sm bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
            <Clock size={16} className="shrink-0" /> 
            <span>{proj.period}</span>
          </div>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* LEFT COLUMN (2/3 width) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* MISSION BRIEF CARD (THEMED) */}
            {/* Changed from bg-slate-900 to theme.color for consistent branding */}
            <div className={`${theme.color} text-white p-6 md:p-10 rounded-[2rem] relative overflow-hidden shadow-2xl group`}>
              {/* Background Decoration */}
              <Terminal size={120} className="absolute -bottom-6 -right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 rotate-12 pointer-events-none text-white" />
              
              <div className="relative z-10">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/80 mb-4 flex items-center gap-2">
                   <FileCode size={14} className="shrink-0" /> Mission Brief
                </h3>
                <p className="text-lg md:text-2xl font-bold leading-relaxed text-white">
                  {proj.desc}
                </p>
              </div>
            </div>

            {/* KEY IMPLEMENTATION GRID */}
            {proj.details && (
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <Zap size={20} className={`shrink-0 ${theme.text}`} /> Key Implementation
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {proj.details.map((detail, i) => (
                    <div key={i} className="group p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm">
                       <div className={`w-8 h-8 rounded-lg ${theme.bgLight} ${theme.darkBgLight} ${theme.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <ArrowUpRight size={16} className="shrink-0" />
                       </div>
                       <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-sm md:text-base">
                         {detail}
                       </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PATENT SECTION (If applicable) */}
            {proj.patent && (
              <div className={`relative overflow-hidden p-6 md:p-8 rounded-[2rem] border-2 ${theme.border} bg-white dark:bg-slate-900`}>
                 <div className={`absolute top-0 right-0 p-4 opacity-10 ${theme.text}`}>
                    <Award size={100} className="rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                       <div className={`p-2 rounded-full ${theme.color} text-white shrink-0`}>
                          <Award size={18} />
                       </div>
                       <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Intellectual Property</p>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                      "{proj.patent}"
                    </p>
                 </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN / SIDEBAR (1/3 width) */}
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 sticky top-24">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                  <Cpu size={14} className="shrink-0" /> Technology Stack
               </h3>
               <div className="flex flex-wrap gap-2">
                 {proj.tech.map(t => (
                   <span key={t} className={`px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:${theme.text} hover:border-current transition-colors cursor-default`}>
                     {t}
                   </span>
                 ))}
               </div>
               <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Project Type</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{proj.context}</p>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewProject;