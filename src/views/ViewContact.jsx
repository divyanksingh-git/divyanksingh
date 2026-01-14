import React from 'react';
import { Mail, Linkedin, ArrowRight, Copy, Check, Terminal, ShieldCheck, Activity, Send } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ContactForm from '../components/CustomForm';

const ViewContact = () => {
  const { data, theme, iconSize } = usePortfolio(); 
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col max-w-5xl mx-auto w-full py-2">
      
      {/* --- 1. HEADER (Perfectly aligned with ViewSummary) --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div>
          <div className={`flex items-center gap-2 ${theme.text} font-black text-xs uppercase tracking-widest mb-4`}>
            <Activity size={iconSize} className="shrink-0" /> Communications Uplink
          </div>
          <h1 className="text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tighter leading-none mb-2">
            Get in <span className={theme.text}>Touch.</span>
          </h1>
          <p className="text-xl font-medium text-slate-500 dark:text-slate-400 italic font-serif">
            Available for security architectures & collaborations
          </p>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-1">
           <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.bgLight} ${theme.darkBgLight} ${theme.text} text-[10px] font-black uppercase tracking-widest`}>
              <ShieldCheck size={12} /> Encrypted
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 tracking-tighter">Protocol v3.0</span>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT: Quick Contact Cards (Stacked) */}
        <div className="lg:col-span-1 space-y-4">
           {/* Email Card - Matches Stats style */}
           <div className={`p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:${theme.border} transition-colors group`}>
              <div className={`p-3 ${theme.bgLight} ${theme.darkBgLight} ${theme.text} rounded-xl w-fit mb-4`}>
                <Mail size={iconSize} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 break-all">{data.email}</h3>
              <div className="flex gap-2">
                 <button onClick={handleCopy} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                 </button>
                 <a href={`mailto:${data.email}`} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg ${theme.color} text-white text-[10px] font-bold uppercase tracking-widest`}>
                    Mail <ArrowRight size={12} />
                 </a>
              </div>
           </div>

           {/* LinkedIn Card - Matches Achievements style */}
           <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className={`block p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:${theme.border} transition-colors group`}>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl w-fit mb-4">
                <Linkedin size={iconSize} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Network</p>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">LinkedIn Profile</h3>
           </a>
        </div>

        {/* RIGHT: Contact Form (Matches Summary Block style) */}
        <div className="lg:col-span-2">
           <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group`}>
              {/* Subtle background icon matches ViewSummary's Layers icon */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform pointer-events-none">
                 <Terminal size={120} className="dark:text-white" />
              </div>

              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-8">
                    <div className={`w-1 h-5 ${theme.color} rounded-full`} />
                    <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                       Send a Message
                    </h3>
                 </div>
                 
                 <ContactForm />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;