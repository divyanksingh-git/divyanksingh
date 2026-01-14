import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, X, Terminal, ShieldCheck } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { usePortfolio } from '../context/PortfolioContext';

const ContactForm = () => {
  const { theme, formStatus, submitContactForm } = usePortfolio();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [localError, setLocalError] = useState(null);

  const isBlocked = formStatus === 'sending' || formStatus === 'success';

  const validate = () => {
    // 1. Check if all fields are filled
    if (!formData.email || !formData.subject || !formData.message) {
      setLocalError({ code: "REQUIRED_FIELDS", msg: "All fields are required to process your inquiry." });
      return false;
    }
    // 2. Validate email format
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setLocalError({ code: "INVALID_EMAIL", msg: "Please enter a valid email address so I can reply." });
      return false;
    }
    // 3. Message length check
    if (formData.message.length < 10) {
      setLocalError({ code: "SHORT_MESSAGE", msg: "Please provide more detail (minimum 10 characters)." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!validate()) return;
    if (!executeRecaptcha || isBlocked) return;

    try {
      const token = await executeRecaptcha('contact_form');
      await submitContactForm(formData, token);
      
      if (formStatus !== 'error') {
        setFormData({ email: '', subject: '', message: '' });
      }
    } catch (err) {
      setLocalError({ code: "SYSTEM_ERROR", msg: "Could not establish connection. Please try again." });
    }
  };

  const inputClasses = (errorField) => `
    w-full p-4 bg-slate-50 dark:bg-slate-900/50 border rounded-2xl outline-none transition-all text-sm dark:text-white
    ${localError?.code && errorField ? 'border-rose-500/50 ring-2 ring-rose-500/10' : 'border-slate-100 dark:border-slate-800'}
    focus:ring-4 ${theme.text.replace('text', 'focus:ring')}/10
  `;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full" noValidate>
      
      {/* Alert System */}
      <AnimatePresence>
        {(localError || formStatus === 'error') && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-start gap-4"
          >
            <AlertCircle className="text-rose-500 shrink-0" size={18} />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-black text-rose-500 uppercase tracking-widest">
                  {localError?.code || "CONNECTION_ERROR"}
                </span>
                <button onClick={() => setLocalError(null)} className="text-rose-500/50 hover:text-rose-500"><X size={14}/></button>
              </div>
              <p className="text-xs font-bold text-slate-600 dark:text-rose-200/70">
                {localError?.msg || "Uplink synchronization failed. Please check your network."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`space-y-4 transition-all duration-500 ${isBlocked ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Email *</label>
            <input
              className={inputClasses(localError?.code === 'INVALID_EMAIL' || localError?.code === 'REQUIRED_FIELDS')}
              value={formData.email}
              placeholder="recruiter@company.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject *</label>
            <input
              className={inputClasses(localError?.code === 'REQUIRED_FIELDS' && !formData.subject)}
              value={formData.subject}
              placeholder="Job Opportunity"
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message *</label>
          <textarea
            rows="5"
            className={`${inputClasses(localError?.code === 'SHORT_MESSAGE' || (localError?.code === 'REQUIRED_FIELDS' && !formData.message))} resize-none`}
            value={formData.message}
            placeholder="How can I help you today?"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: isBlocked ? 1 : 1.01 }}
        whileTap={{ scale: isBlocked ? 1 : 0.99 }}
        type="submit"
        disabled={isBlocked}
        className={`relative h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-500 ${
          formStatus === 'success' ? 'bg-emerald-500 text-white' : 
          formStatus === 'error' ? 'bg-rose-500 text-white' : 
          `${theme.color} text-white shadow-lg ${theme.shadow}`
        }`}
      >
        <AnimatePresence mode="wait">
          {formStatus === 'idle' && (
            <motion.div key="idle" className="flex items-center gap-2">
              Send Message <Send size={14} />
            </motion.div>
          )}
          {formStatus === 'sending' && (
             <motion.div key="sending" className="flex items-center gap-2">
               <Loader2 size={16} className="animate-spin" /> Processing...
             </motion.div>
          )}
          {formStatus === 'success' && (
            <motion.div key="success" className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Sent Successfully
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};

export default ContactForm;