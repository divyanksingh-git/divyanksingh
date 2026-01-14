import React from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const TreeItem = ({ id, label, icon: Icon, isFolder }) => {
  const { 
    activeNode, 
    expandedFolders, 
    handleNavigate, 
    toggleFolder, 
    theme,
    iconSize 
  } = usePortfolio();

  const isExpanded = isFolder && expandedFolders.includes(id);
  const isActive = activeNode === id;
  
  // Default Icons
  const DisplayIcon = Icon || (isFolder ? Folder : File);

  return (
    <div className="relative select-none group">
      <div 
        onClick={() => isFolder ? toggleFolder(id) : handleNavigate(id, label)}
        className={`
          flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md transition-all duration-200
          ${isActive 
            ? `bg-slate-50 dark:bg-white/5 ${theme.text}` 
            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200'
          }
        `}
      >
        {/* Indent Guide / Arrow */}
        <div className="shrink-0 flex items-center justify-center w-5 h-5 opacity-70">
            {isFolder ? (
                <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                    <ChevronRight size={12} />
                </div>
            ) : <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />}
        </div>

        {/* Icon */}
        <DisplayIcon 
          size={14} 
          className={`shrink-0 transition-colors ${isActive ? theme.text : 'opacity-70 group-hover:opacity-100'}`} 
        />
        
        {/* Label */}
        <span className={`truncate text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default TreeItem;