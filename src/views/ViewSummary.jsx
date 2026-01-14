import React from 'react';
import { Activity, Mail, Linkedin, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewSummary = ({ theme }) => {
  const { data, iconSize } = usePortfolio(); // <-- Context!

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className={`flex items-center gap-2 ${theme.text} font-black text-xs uppercase tracking-widest mb-4`}>
            <Activity size={iconSize} className="shrink-0" /> Professional Journey Dashboard
          </div>
          <h1 className="text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tighter mb-2 leading-none">{data.name}</h1>
          <p className="text-xl font-medium text-slate-500 dark:text-slate-400 italic font-serif">{data.role}</p>
        </div>
        <div className="flex gap-4">
          <a href={`mailto:${data.email}`} className={`p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:${theme.color} hover:text-white transition-all shadow-sm`}><Mail size={iconSize}/></a>
          <a href={`https://${data.linkedin}`} target="_blank" className={`p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:${theme.color} hover:text-white transition-all shadow-sm`}><Linkedin size={iconSize}/></a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {data.stats.map(s => (
          <div key={s.label} className={`p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:${theme.border} transition-colors`}>
            <p className={`text-2xl font-black ${theme.text} leading-none mb-2`}>{s.value}</p>
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group mb-12">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Layers size={120} className="dark:text-white" /></div>
        <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium relative z-10">
          {data.summary}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
         {data.achievements.map((a, i) => (
           <div key={i} className={`flex flex-col p-6 border border-slate-100 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-sm hover:${theme.border} hover:-translate-y-1 transition-all`}>
              <div className={`p-3 ${theme.bgLight} ${theme.darkBgLight} ${theme.text} rounded-xl w-fit mb-4`}>
                <a.Icon size={iconSize} className="shrink-0" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{a.label}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{a.detail}</p>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ViewSummary;