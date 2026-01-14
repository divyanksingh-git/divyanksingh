import React from 'react';
import { Briefcase, MapPin, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewExperience = ({ exp, theme }) => {
  const { iconSize } = usePortfolio(); // <-- Context for Icon Size!

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-slate-100 dark:border-slate-800 pb-10">
        <div>
          <div className={`flex items-center gap-2 text-xs font-black ${theme.text} uppercase tracking-widest mb-2`}>
            <Briefcase size={iconSize} className="shrink-0" /> Career Milestone
          </div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight mb-2">{exp.company}</h2>
          <p className={`text-2xl ${theme.text} font-bold`}>{exp.role}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">{exp.period}</p>
          <div className="flex items-center gap-2 text-slate-500 font-bold mt-3 justify-end">
            <MapPin size={iconSize} className="shrink-0" /> {exp.location}
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-12">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Core Impact and Responsibilities</h3>
        <div className="grid gap-4">
          {exp.tasks.map((task, i) => (
            <div key={i} className={`flex gap-4 items-start p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] hover:shadow-lg transition-all border-l-4 ${theme.border.replace('border', 'border-l')}`}>
              <CheckCircle size={iconSize} className={`shrink-0 ${theme.text}`} strokeWidth={3} />
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{task}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Technology Application</h4>
        <div className="flex flex-wrap gap-2">
          {exp.stack.map(s => (
            <span key={s} className={`px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg shadow-sm hover:${theme.border} transition-all`}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewExperience;