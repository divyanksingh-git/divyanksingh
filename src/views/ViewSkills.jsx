import React from 'react';
import { Smartphone, Cpu, BrainCircuit, Server, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewSkills = ({ theme }) => {
  const { data, iconSize } = usePortfolio(); // <-- Context!

  return (
    <div className="animate-in zoom-in-95 duration-500">
      <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 mb-12">Expertise Domains</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {Object.entries(data.skills).map(([cat, list], i) => (
          <div key={cat} className={`flex flex-col p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-sm hover:${theme.border} transition-all`}>
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] ${theme.text} mb-8 pb-4 border-b border-slate-50 dark:border-slate-800 flex items-center gap-2`}>
              {cat === 'frontend_and_mobile' ? <Smartphone size={iconSize} className="shrink-0" /> : 
               cat === 'engineering_and_tools' ? <Cpu size={iconSize} className="shrink-0" /> : 
               cat === 'generative_ai' ? <BrainCircuit size={iconSize} className="shrink-0" /> :
               <Server size={iconSize} className="shrink-0" />}
              {cat.replace(/_/g, ' ').toUpperCase()}
            </h4>
            <div className="flex flex-wrap gap-3">
              {list.map(s => (
                <span key={s} className={`px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:${theme.bgLight} transition-colors`}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-black p-10 rounded-[3.5rem] text-white border border-white/5 shadow-2xl">
        <h4 className={`text-2xl font-black mb-8 flex items-center gap-3 ${theme.text}`}>
          <Award size={24} className="shrink-0" /> Verified Industry Certifications
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {data.certs.map((c, i) => (
            <div key={i} className="flex justify-between items-center p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group">
              <div>
                <p className={`font-bold text-lg group-hover:${theme.text} transition-colors`}>{c.title}</p>
                <p className="text-[10px] uppercase font-black opacity-40 tracking-widest mt-1">{c.issuer} • {c.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSkills;