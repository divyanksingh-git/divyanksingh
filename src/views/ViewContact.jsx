import React from 'react';
import { Mail, Linkedin, ArrowRight, Copy, Check } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewContact = ({ theme }) => {
  const { data } = usePortfolio(); // <-- Context!
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col justify-center max-w-4xl mx-auto w-full">
      <div className="mb-12 md:mb-16 text-center md:text-left">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-black uppercase tracking-widest ${theme.text} mb-6`}>
           <div className={`w-2 h-2 rounded-full ${theme.color} animate-pulse`} /> Status: Open for Opportunities
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-slate-50 mb-6 tracking-tighter leading-[0.9]">
          Let's Start a <br className="hidden md:block" /> Conversation.
        </h2>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
          Interested in <span className={`${theme.text} font-bold`}>collaborating</span> or discussing <span className={`${theme.text} font-bold`}>security architectures</span>? My inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className={`group relative p-8 md:p-10 ${theme.color} text-white rounded-[2rem] md:rounded-[3rem] shadow-xl ${theme.shadow} overflow-hidden hover:scale-[1.01] transition-transform duration-300`}>
           <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Primary Channel</p>
                   <Mail size={24} className="opacity-70" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black break-all md:break-words tracking-tight">
                  {data.email}
                </h3>
              </div>
              
              <div className="flex gap-2">
                <a href={`mailto:${data.email}`} className="flex-1 bg-white text-slate-900 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Send Mail <ArrowRight size={16} />
                </a>
                <button onClick={handleCopy} className="bg-black/20 hover:bg-black/30 text-white p-3 rounded-xl transition-colors backdrop-blur-sm">
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
           </div>
           <Mail className="absolute -bottom-6 -right-6 size-48 opacity-10 rotate-12 pointer-events-none" />
        </div>

        <a href={`https://${data.linkedin}`} target="_blank" className={`group relative p-8 md:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] md:rounded-[3rem] hover:${theme.border} transition-all duration-300 hover:-translate-y-1`}>
           <div className="flex flex-col h-full justify-between gap-8">
              <div>
                 <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Network</p>
                    <Linkedin size={24} className="text-slate-300 group-hover:text-[#0077b5] transition-colors" />
                 </div>
                 <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">
                   {data.name}
                 </h3>
                 <p className="text-slate-500 font-medium">Connect on LinkedIn</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:${theme.bgLight} group-hover:${theme.text} transition-colors`}>
                 <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
           </div>
        </a>
      </div>
    </div>
  );
};

export default ViewContact;