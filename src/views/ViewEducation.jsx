import React from 'react';
import { Clock, MapPin, Award, GraduationCap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewEducation = ({ edu, theme }) => {
  const { iconSize } = usePortfolio();

  return (
    // Outer Container
    <div className="w-full flex flex-col items-center xl:items-start animate-in fade-in duration-500">
      
      <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${theme.text} mb-8 text-center xl:text-left`}>
        Academic Credential
      </h2>

      {/* THE CARD: Removed hover effects, added border for flat look */}
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-sm">
        
        {/* LEFT COLUMN: Visual Identity */}
        <div className={`
          relative w-full md:w-1/3 p-10 flex flex-col items-center justify-center text-center overflow-hidden
          bg-slate-50 dark:bg-slate-800/30 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800
        `}>
          {/* Static Background Blob (Removed hover scale) */}
          <div className={`absolute top-0 left-0 w-full h-full opacity-10 ${theme.bgLight} ${theme.darkBgLight} blur-3xl scale-150`} />
          
          {/* LOGO: Clean, Flat, No Shadow, No Rotation */}
          <div className="relative z-10 w-28 h-28 flex items-center justify-center mb-6">
            <img 
              src={edu.logo} 
              alt={edu.school} 
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          
          <div className="relative z-10 opacity-60 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <GraduationCap size={14} /> Established Campus
          </div>
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="relative w-full md:w-2/3 p-10 flex flex-col justify-center bg-white dark:bg-slate-900">
          
          <div className="mb-8">
            {/* Badge: Kept flat, distinct */}
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${theme.bgLight} ${theme.text} bg-opacity-10`}>
              <Award size={12} /> Certified Degree
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-50 leading-tight">
              {edu.degree}
            </h3>
            <p className="text-lg font-serif italic text-slate-500 dark:text-slate-400 mt-2">
              at <span className="font-bold not-italic text-slate-700 dark:text-slate-300">{edu.school}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-8">
            
            {/* Period - Flat Icon Style */}
            <div className="flex items-center gap-4">
              <div className={`${theme.text}`}>
                <Clock size={20} strokeWidth={2} className='text-slate-400' />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Timeline</div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{edu.period}</div>
              </div>
            </div>

            {/* Location - Flat Icon Style */}
            <div className="flex items-center gap-4">
              <div className={`${theme.text}`}>
                <MapPin size={20} strokeWidth={2} className='text-slate-400'  />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Location</div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{edu.location}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewEducation;