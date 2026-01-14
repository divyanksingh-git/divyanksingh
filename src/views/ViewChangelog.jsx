import React from 'react';
import { 
  GitBranch, ShieldCheck, Zap, Terminal, Code2, Globe, 
  Database, Lock, Cloud, Server, Shield, BrainCircuit, Cpu, Layout, Inbox
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ViewChangelog = () => {
  const { data, theme, iconSize } = usePortfolio();
  const sys = data.system_info;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div>
          <div className={`flex items-center gap-2 ${theme.text} font-black text-xs uppercase tracking-widest mb-4`}>
            <Terminal size={iconSize} /> System Release Documentation
          </div>
          <h1 className="text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tighter leading-none mb-2">
            Release {sys.release}
          </h1>
          <p className="text-xl font-medium text-slate-500 dark:text-slate-400 italic font-serif tracking-tight">
            Technical analysis of <span className={theme.text}>{data.domain}</span>
          </p>
        </div>
        <a 
          href={data.repo_url} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
        >
          <Code2 size={14} /> Source Code
        </a>
      </div>

      {/* 2. CORE CAPABILITIES (RECRUITER FOCUS) */}
      <div className="mb-20">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-10">
          <Layout size={14} /> Engineering Capabilities & Features
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {sys.core_features.map((feat, i) => (
            <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex gap-6 group">
              <div className={`shrink-0 w-14 h-14 rounded-2xl ${theme.bgLight} ${theme.text} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Zap size={24} />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-2">{feat.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                  {feat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. INFRASTRUCTURE & DATA PRIVACY */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Infrastructure Side */}
        <div className="space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
            <Cpu size={14} /> System Infrastructure
          </h3>
          <div className="grid gap-4">
            {sys.architecture.map((item, i) => (
              <div key={i} className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl">
                <p className={`font-bold text-sm mb-1 ${theme.text} uppercase tracking-widest`}>{item.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Side */}
        <div className="space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
            <Inbox size={14} /> Storage & Data Policy
          </h3>
          <div className="bg-slate-900 text-slate-300 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden h-full flex flex-col justify-between shadow-2xl">
            <Server className="absolute -bottom-10 -right-10 size-64 opacity-5 rotate-12 pointer-events-none" />
            <div className="relative z-10 space-y-10">
              <div className="flex gap-5 items-start">
                <Globe className={theme.text} size={24} />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Deployment Node</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{sys.hosting}</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Shield className="text-emerald-500" size={24} />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Active Mitigation</h4>
                  <p className="text-sm opacity-70 leading-relaxed italic">Cloudflare WAF + SSL + reCAPTCHA v3 verified uplink.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start border-t border-white/10 pt-8">
                <Lock className={theme.text} size={24} />
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Privacy Compliance</h4>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Contact data is stored securely in Firestore solely for professional correspondence. 
                    I retain email addresses only as long as necessary for the recruitment lifecycle. 
                    No PII is shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. GOOGLE RECAPTCHA COMPLIANCE BOX (The "Google Privacy Box") */}
      <div className="mb-12 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
         <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="flex-1">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                <ShieldCheck size={14} /> Security Compliance Notice
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                This site is protected by reCAPTCHA and the Google 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={`${theme.text} hover:underline font-bold mx-1`}>Privacy Policy</a> and 
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className={`${theme.text} hover:underline font-bold mx-1`}>Terms of Service</a> apply. 
                As the reCAPTCHA badge is hidden for UI fidelity, this notice serves as a mandatory legal disclosure.
              </p>
            </div>
            <div className={`hidden md:block h-12 w-px bg-slate-200 dark:bg-slate-800`} />
            <div className="shrink-0 flex items-center gap-4">
               <ShieldCheck size={32} className="text-slate-200 dark:text-slate-800" />
            </div>
         </div>
      </div>

      {/* 5. AI WORKFLOW (SUBTLE FOOTER) */}
      <div className={`p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 flex flex-col md:flex-row items-center gap-6 opacity-70`}>
          <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400`}>
            <BrainCircuit size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Workflow Optimization</h4>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 leading-relaxed italic">
              {sys.ai_integration}
            </p>
          </div>
      </div>
    </div>
  );
};

export default ViewChangelog;