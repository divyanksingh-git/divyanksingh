import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { DATA as STATIC_DATA } from '../config/data.jsx';
import { THEMES as STATIC_THEMES, ICON_SIZE as STATIC_ICON_SIZE } from '../config/theme.jsx';
import { 
  analytics, 
  db, 
  logEvent, 
  ref, 
  onValue, 
  runTransaction,
  firestore, collection, addDoc, serverTimestamp
} from '../config/firebase';

// Create Context
const PortfolioContext = createContext();

// Custom Hook
export const usePortfolio = () => useContext(PortfolioContext);

// Provider Component
export const PortfolioProvider = ({ children }) => {
  // --- State ---
  const [activeNode, setActiveNode] = useState('summary');
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [terminalLogs, setTerminalLogs] = useState([
    "[SYS] System Journey Initialized...", 
    "[SYS] Resolving professional experience history...", 
    "[SYS] Status: Ready for Recruitment Review."
  ]);
  const [isBooting, setIsBooting] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(STATIC_THEMES[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasSeenChangelog, setHasSeenChangelog] = useState(false);
  
  // --- ANALYTICS & STATS STATE ---
  const [visitCount, setVisitCount] = useState("---");
  const [formStatus, setFormStatus] = useState('idle');

  // --- CENTRALIZED LOGGING SYSTEM (Memoized) ---
  const addLog = useCallback((msg, type = 'SYS', analyticsName = null, analyticsParams = {}) => {
    // 1. VISUAL: Update Terminal State
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    const formattedLog = `[${type}] ${msg}`;
    
    setTerminalLogs(prev => [formattedLog, ...prev].slice(0, 10));

    // 2. DATA: Send to Firebase Analytics
    if (analyticsName) {
      logEvent(analytics, analyticsName, {
        ...analyticsParams,
        log_message: msg,
        log_type: type,
        timestamp: timestamp
      });

      // Developer Aid: See events in browser console during dev
      if (process.env.NODE_ENV === 'development') {
        console.log(`📡 [Analytics] ${analyticsName}`, analyticsParams);
      }
    }
  }, []); 

  // --- Effects ---
  
  // Boot Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
      // Added: Log when boot actually finishes
      addLog("System Boot Sequence Complete", "SYS", "system_boot_finished");
    }, 1200);
    return () => clearTimeout(timer);
  }, [addLog]);

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Easter Egg & Visits Logic
  const sessionKey = 'NEVER_GONNA_GIVE_YOU_UP';
  const sessionValue = 'NEVER_GONNA_LET_YOU_DOWN';

  useEffect(() => {
    // Log Initial Page View
    addLog('Portfolio Main View Loaded', 'SYS', 'page_view', { page_title: 'Home Portfolio' });

    const visitsRef = ref(db, 'portfolio_stats/visits');

    // Real-time Visit Counter
    const unsubscribe = onValue(visitsRef, (snapshot) => {
      const dbValue = snapshot.exists() ? snapshot.val() : 0;
      setVisitCount(dbValue + 323); 
    });

    // Unique Visitor Increment
    const hasVisited = sessionStorage.getItem(sessionKey);
    if (!hasVisited) {
      runTransaction(visitsRef, (currentVisits) => {
        return (currentVisits || 0) + 1;
      }).then(() => {
        sessionStorage.setItem(sessionKey, sessionValue);
        addLog("New Visitor Session Detected", "NET", 'unique_visitor_incremented');
      }).catch((err) => {
        console.error("Counter transaction failed:", err);
      });
    }

    return () => unsubscribe();
  }, [addLog]);


  // --- Actions (Memoized) ---

  const toggleFolder = useCallback((id) => {
    setExpandedFolders(prev => {
      const isExpanding = !prev.includes(id);
      const folderName = id.toUpperCase();
      
      addLog(
        isExpanding ? `Opening: /${folderName}` : `Closing: /${folderName}`,
        'DIR',
        'folder_interaction',
        { folder: folderName, action: isExpanding ? 'open' : 'close' }
      );

      return isExpanding ? [id] : [];
    });
  }, [addLog]);

  const handleNavigate = useCallback((id, label) => {
    setActiveNode(id);
    
    if (id === 'changelog') setHasSeenChangelog(true);
    
    addLog(
      `Switched to: ${label.toUpperCase()}`, 
      'NAV', 
      'navigation_click', 
      { destination: id, label: label }
    );
    
    if (['summary', 'stack-view', 'contact', 'changelog'].includes(id)) {
      setExpandedFolders([]);
    }

    setMobileMenuOpen(false); 
  }, [addLog]); 

  const changeTheme = useCallback((theme) => {
    setCurrentTheme(theme);
    addLog(
      `Theme set to: ${theme.name.toUpperCase()}`, 
      'SYS', 
      'theme_change', 
      { theme_name: theme.name }
    );
  }, [addLog]);

  const toggleDarkMode = useCallback((isDark) => {
    setDarkMode(isDark);
    addLog(
      `Mode set to: ${isDark ? 'DARK' : 'LIGHT'}`, 
      'SYS', 
      'mode_toggle', 
      { mode: isDark ? 'dark' : 'light' }
    );
  }, [addLog]);

  const submitContactForm = useCallback(async (formData, recaptchaToken) => {
    setFormStatus('sending');
    addLog("Initializing encrypted uplink...", "MSG", "contact_attempt_start");

    try {
      // Added: Analytics for Recaptcha step
      addLog("Verifying reCAPTCHA authenticity...", "SEC", "contact_recaptcha_verify");

      await addDoc(collection(firestore, "messages"), {
        ...formData,
        recaptchaToken, 
        timestamp: serverTimestamp(),
        source: "itsdivyanksingh.com_v1"
      });

      setFormStatus('success');
      addLog("Packet delivered to Firestore node.", "OK", "contact_success");
      
      // Added: Analytics for Workflow completion
      addLog("Handshake complete.", "SYS", "contact_workflow_complete");

      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error("Submission Error:", error);
      setFormStatus('error');
      addLog("Critical: Data transmission failed.", "ERR", "contact_error", { error_msg: error.message });
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  }, [addLog]);

  const getTerminalPath = useCallback(() => {
    const id = activeNode;
    switch(id) {
      case 'summary': return '~/overview';
      case 'stack-view': return '~/system/capabilities';
      case 'contact': return '~/communications/uplink';
      case 'changelog': return '~/system/release_v1.0.0';
      default:
        const exp = STATIC_DATA.experience.find(e => e.id === id);
        if (exp) return `~/experience/${exp.company.toLowerCase().replace(/\s+/g, '_')}`;
        const proj = STATIC_DATA.projects.find(p => p.id === id);
        if (proj) return `~/projects/${proj.title.toLowerCase().replace(/\s+/g, '_')}`;
        const edu = STATIC_DATA.education.find(e => e.id === id);
        if (edu) return `~/education/${edu.school.toLowerCase().replace(/\s+/g, '_')}`;
        return `~/${id}`;
    }
  }, [activeNode]);

  const recordDownload = useCallback(() => {
    addLog("Initiating secure file transfer: resume.pdf", "IO", "resume_download_start");
    
    setTimeout(() => {
      // Added: Analytics for Download completion
      addLog("Transfer complete. 1 file(s) downloaded.", "OK", "resume_download_complete"); 
    }, 800);
  }, [addLog]);

  // --- MEMOIZED CONTEXT VALUE ---
  const value = useMemo(() => ({
    // Data
    data: STATIC_DATA,
    themes: STATIC_THEMES,
    iconSize: STATIC_ICON_SIZE,
    visitCount,
    
    // State
    activeNode,
    expandedFolders,
    terminalLogs,
    isBooting,
    theme: currentTheme,
    darkMode,
    mobileMenuOpen,
    formStatus,
    hasSeenChangelog,
    
    // Actions
    recordDownload,
    setActiveNode,
    setExpandedFolders,
    setTerminalLogs,
    setCurrentTheme,
    setDarkMode,
    setMobileMenuOpen,
    handleNavigate,
    toggleFolder,
    getTerminalPath,
    submitContactForm,
    addLog,
    changeTheme,
    toggleDarkMode,
  }), [
    visitCount,
    activeNode,
    expandedFolders,
    terminalLogs,
    isBooting,
    currentTheme,
    darkMode,
    mobileMenuOpen,
    formStatus,
    hasSeenChangelog,
    recordDownload,
    handleNavigate,
    toggleFolder,
    getTerminalPath,
    submitContactForm,
    addLog,
    changeTheme,
    toggleDarkMode
  ]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};