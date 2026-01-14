import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewEducation = ({ edu, theme }) => {
  const { iconSize } = usePortfolio();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="max-w-xl mx-auto md:mx-0">
        <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${theme.text} mb-8`}>Academic Background</h2>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 rounded-[4rem] shadow-xl relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-32 h-32 ${theme.bgLight} ${theme.darkBgLight} rounded-full blur-3xl opacity-50`} />
          <div className={`w-20 h-20 bg-slate-900 dark:bg-black rounded-[2rem] flex items-center justify-center text-white font-black mb-10 text-3xl relative z-10 border border-white/10`}>
            {edu.school[0]}
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-slate-50 mb-2 leading-tight relative z-10">{edu.school}</h3>
          <p className={`text-2xl ${theme.text} font-medium italic font-serif mb-10 relative z-10`}>{edu.degree}</p>
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
               <Clock size={iconSize} className={`shrink-0 ${theme.text}`} /> {edu.period}
             </div>
             <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
               <MapPin size={iconSize} className={`shrink-0 ${theme.text}`} /> {edu.location}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEducation;