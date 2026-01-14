import React, { createContext, useContext, useState, useEffect } from 'react';
import { DATA as STATIC_DATA } from '../config/data.jsx';
import { THEMES as STATIC_THEMES, ICON_SIZE as STATIC_ICON_SIZE } from '../config/theme.jsx';

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

    // State
    activeNode,
    expandedFolders,
    terminalLogs,
    isBooting,
    theme: currentTheme,
    darkMode,
    mobileMenuOpen,
    
    // Actions
    setActiveNode,
    setExpandedFolders,
    setTerminalLogs,
    setCurrentTheme,
    setDarkMode,
    setMobileMenuOpen,
    handleNavigate,
    toggleFolder,
    getTerminalPath
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};