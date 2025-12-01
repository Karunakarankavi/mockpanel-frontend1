import React, { useState, useEffect } from 'react';
import './Sidebar.css';

type SidebarItem = {
  id: string;
  label: string;
  icon: string;
};

const sidebarItems: SidebarItem[] = [
  { id: 'mockinterview', label: 'Mock Interview', icon: '🎯' },
  { id: 'analysis', label: 'Analysis', icon: '📊' },
  { id: 'studymaterial', label: 'Study Material', icon: '📚' },
  { id: 'ats', label: 'ATS', icon: '⚙️' },
  { id: 'resumebuilder', label: 'Resume Builder', icon: '📝' },
  { id: 'jobs', label: 'Jobs', icon: '💼' },
];

type SidebarProps = {
  onItemClick?: (itemId: string) => void;
  activeItem?: string;
};

export function Sidebar({ onItemClick, activeItem: externalActive }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>(externalActive || 'mockinterview');

  useEffect(() => {
    if (externalActive) setActiveItem(externalActive);
  }, [externalActive]);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
