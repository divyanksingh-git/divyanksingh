import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, HardDrive, Wifi, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const BootScreen = () => {
  const { data, theme } = usePortfolio();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'INIT', msg: 'INITIALIZING_KERNEL', hash: '0x1A4' },
    { id: 'MEM', msg: 'ALLOCATING_MEMORY_BLOCKS', hash: '0x2B9' },
    { id: 'VITE', msg: 'LOADING_MODULES_CHUNK_0', hash: '0x8F1' },
    { id: 'CSS', msg: 'COMPILING_STYLESHEETS', hash: '0xC33' },
    { id: 'SEC', msg: 'VERIFYING_INTEGRITY', hash: '0x9D4' },
    { id: 'AUTH', msg: 'ESTABLISHING_SESSION', hash: '0x5E2' },
    { id: 'DONE', msg: 'SYSTEM_READY', hash: '0xFFF' },
  ];

  useEffect(() => {
    // 1. Progress Bar Physics
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for "hacky" feelnow this is complete 
        const diff = Math.random() * 15;
        return Math.min(old + diff, 100);
      });
    }, 120);

    // 2. Log Stepper
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 180);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 flex items-center justify-center font-mono p-6 transition-colors duration-300">
      <div className="w-full max-w-lg">
        
        {/* Top: Header Info */}
        <div className="flex justify-between items-end border-b-2 border-slate-200 dark:border-slate-800 pb-4 mb-8">
          <div>
            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${theme.text}`}>
              <Terminal size={14} className="shrink-0" />
              Boot_Sequence_v1.0.0
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mt-1">
              {data.name.split(' ')[0]}_OS
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 font-bold">TARGET</div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">itsdivyanksingh.com</div>
          </div>
        </div>

        {/* Middle: System Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-md flex items-center gap-3">
              <Cpu size={18} className="text-slate-400" />
              <div>
                 <div className="text-[10px] font-black text-slate-400 uppercase">Architecture</div>
                 <div className="text-xs font-bold text-slate-700 dark:text-slate-200">x86_64 / REACT</div>
              </div>
           </div>
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-md flex items-center gap-3">
              <HardDrive size={18} className="text-slate-400" />
              <div>
                 <div className="text-[10px] font-black text-slate-400 uppercase">Memory</div>
                 <div className="text-xs font-bold text-slate-700 dark:text-slate-200">HEAP_ALLOC_OK</div>
              </div>
           </div>
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-md flex items-center gap-3">
              <Wifi size={18} className="text-slate-400" />
              <div>
                 <div className="text-[10px] font-black text-slate-400 uppercase">Network</div>
                 <div className="text-xs font-bold text-slate-700 dark:text-slate-200">CONNECTED</div>
              </div>
           </div>
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-md flex items-center gap-3">
              <ShieldCheck size={18} className="text-slate-400" />
              <div>
                 <div className="text-[10px] font-black text-slate-400 uppercase">Security</div>
                 <div className="text-xs font-bold text-green-500">VERIFIED</div>
              </div>
           </div>
        </div>

        {/* Bottom: Logs & Progress */}
        <div className="space-y-4">
          <div className="h-24 overflow-hidden relative">
             <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
             <div className="flex flex-col-reverse justify-end h-full gap-1">
                {steps.slice(0, currentStep + 1).reverse().map((step, i) => (
                  <div key={step.id} className="flex items-center gap-3 text-xs md:text-sm">
                    <span className="text-slate-300 dark:text-slate-700 w-12 font-mono">[{step.hash}]</span>
                    <span className={`${i === 0 ? theme.text : 'text-slate-500 dark:text-slate-400'} font-bold`}>
                      {step.msg}
                    </span>
                    {i === 0 && <span className={`w-2 h-4 ${theme.color} animate-pulse ml-1`} />}
                  </div>
                ))}
             </div>
          </div>

          <div>
             <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
             </div>
             <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden">
                <div 
                   className={`h-full ${theme.color} transition-all duration-200 ease-out`} 
                   style={{ width: `${progress}%` }} 
                />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BootScreen;