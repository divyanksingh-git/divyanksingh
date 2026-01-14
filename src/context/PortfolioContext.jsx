import React, { createContext, useContext, useState, useEffect } from 'react';
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
    "[LOG] System Journey Initialized.", 
    "[LOG] Resolving professional experience history...", 
    "[LOG] Status: Ready for Recruitment Review."
  ]);
  const [isBooting, setIsBooting] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(STATIC_THEMES[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- ANALYTICS & STATS STATE ---
  const [visitCount, setVisitCount] = useState("---");
  const [formStatus, setFormStatus] = useState('idle');

  // --- Effects ---
  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Easter Egg Constants
  const sessionKey = 'NEVER_GONNA_GIVE_YOU_UP';
  const sessionValue = 'NEVER_GONNA_LET_YOU_DOWN';

  useEffect(() => {
    // 1. Log Analytics
    logEvent(analytics, 'page_view', { page_title: 'Home Portfolio' });

    // 2. Database Reference
    const visitsRef = ref(db, 'portfolio_stats/visits');

    // 3. LISTEN: Real-time Sync + Frontend Offset (323)
    const unsubscribe = onValue(visitsRef, (snapshot) => {
      const dbValue = snapshot.exists() ? snapshot.val() : 0;
      // We add 323 to the database value for the display
      setVisitCount(dbValue + 323); 
    });

    // 4. INCREMENT: Transaction Logic
    const hasVisited = sessionStorage.getItem(sessionKey);

    if (!hasVisited) {
      runTransaction(visitsRef, (currentVisits) => {
        // Increment the DB value (starting from 0 if it doesn't exist)
        return (currentVisits || 0) + 1;
      }).then(() => {
        sessionStorage.setItem(sessionKey, sessionValue);
        logEvent(analytics, 'unique_visitor_incremented');
      }).catch((err) => {
        console.error("Counter transaction failed:", err);
      });
    }

    return () => unsubscribe();
  }, []);

  // --- Actions ---
  const addLog = (msg) => {
    setTerminalLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleNavigate = (id, label) => {
    setActiveNode(id);
    addLog(`Mapsd to: ${label}`);
    setMobileMenuOpen(false); 

    // Use STATIC_DATA here since it's available in scope
    const isExperienceItem = STATIC_DATA.experience.some(e => e.id === id);
    const isProjectItem = STATIC_DATA.projects.some(p => p.id === id);
    const isEducationItem = STATIC_DATA.education.some(e => e.id === id);

    if (isExperienceItem) setExpandedFolders(['experience']);
    else if (isProjectItem) setExpandedFolders(['projects']);
    else if (isEducationItem) setExpandedFolders(['education']);
    else setExpandedFolders([]);
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => prev.includes(folderId) ? [] : [folderId]);
  };

  // --- FIRESTORE CONTACT ACTION ---
  const submitContactForm = async (formData, recaptchaToken) => {
    setFormStatus('sending');
    try {
      await addDoc(collection(firestore, 'messages'), {
        ...formData,
        recaptchaToken,
        createdAt: serverTimestamp(),
      });
      setFormStatus('success');
      addLog(`[SYSTEM] Message transmitted successfully.`);
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      addLog(`[ERROR] Transmission failed.`);
      console.error(error);
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const getTerminalPath = () => {
    const id = activeNode;
    switch(id) {
      case 'summary': return '~/overview';
      case 'stack-view': return '~/system/capabilities';
      case 'contact': return '~/communications/uplink';
      default:
        const exp = STATIC_DATA.experience.find(e => e.id === id);
        if (exp) return `~/experience/${exp.company.toLowerCase().replace(/\s+/g, '_')}`;
        const proj = STATIC_DATA.projects.find(p => p.id === id);
        if (proj) return `~/projects/${proj.title.toLowerCase().replace(/\s+/g, '_')}`;
        const edu = STATIC_DATA.education.find(e => e.id === id);
        if (edu) return `~/education/${edu.school.toLowerCase().replace(/\s+/g, '_')}`;
        return `~/${id}`;
    }
  };

  const value = {
    // Application Data (Exposed via Context)
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

    // Actions
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
    addLog
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};