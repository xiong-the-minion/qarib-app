import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranscript } from '../contexts/TranscriptContext';
import LanguageSwitcher from './LanguageSwitcher';

// Import SVG icons directly as React components
import HomeIcon from '/public/icons/home.svg?react';
import TranscriptionsIcon from '/public/icons/transcriptions.svg?react';
import TagsIcon from '/public/icons/tags.svg?react';
import ProjectsIcon from '/public/icons/projects.svg?react';
import FavouritesIcon from '/public/icons/favourites.svg?react';
import SettingsIcon from '/public/icons/settings.svg?react';
import TrashIcon from '/public/icons/trash.svg?react';
import PlusIcon from '/public/icons/plus.svg?react';
import ChevronDownIcon from '/public/icons/chevron-down.svg?react';
import BellIcon from '/public/icons/bell.svg?react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [expandedItems, setExpandedItems] = useState<string[]>(['Transcriptions']);
  const navigate = useNavigate();
  const location = useLocation();
  const { transcripts, loadTranscripts } = useTranscript();

  // Load transcripts when component mounts
  useEffect(() => {
    loadTranscripts();
  }, [loadTranscripts]);

  // Update active item based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveItem('Home');
    } else if (path === '/transcripts' || path.startsWith('/transcripts/')) {
      setActiveItem('Transcriptions');
    } else {
      setActiveItem('Home'); // Default fallback
    }
  }, [location.pathname]);

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleTranscriptClick = (transcriptId: string) => {
    navigate(`/transcripts/${transcriptId}`);
  };


  // Icon mapping function
  const getIcon = (iconName: string, className: string = 'w-5 h-5', color: string = '#6B7280') => {
    const iconProps = { className, style: { color } };
    
    switch (iconName) {
      case 'home': return <HomeIcon {...iconProps} />;
      case 'transcriptions': return <TranscriptionsIcon {...iconProps} />;
      case 'tags': return <TagsIcon {...iconProps} />;
      case 'projects': return <ProjectsIcon {...iconProps} />;
      case 'favourites': return <FavouritesIcon {...iconProps} />;
      case 'settings': return <SettingsIcon {...iconProps} />;
      case 'trash': return <TrashIcon {...iconProps} />;
      case 'plus': return <PlusIcon {...iconProps} />;
      case 'chevron-down': return <ChevronDownIcon {...iconProps} />;
      case 'bell': return <BellIcon {...iconProps} />;
      default: return <span className="text-lg">?</span>;
    }
  };

  const mainNavItems = [
    { id: 'Home', icon: 'home', label: 'Home', hasSubmenu: false },
    { id: 'Transcriptions', icon: 'transcriptions', label: 'Transcriptions', hasSubmenu: true },
    { id: 'Tags', icon: 'tags', label: 'Tags', hasSubmenu: true },
    { id: 'Projects', icon: 'projects', label: 'Projects', hasSubmenu: true },
    { id: 'Favourites', icon: 'favourites', label: 'Favourites', hasSubmenu: true },
  ];

  const systemNavItems = [
    { id: 'Settings', icon: 'settings', label: 'Settings', hasSubmenu: false },
    { id: 'Trash', icon: 'trash', label: 'Trash', hasSubmenu: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out rounded-xl z-50 overflow-hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 pb-2 ">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                </div>
                <span className="text-lg font-bold text-gray-800">LOGOS</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                {getIcon('bell', 'w-5 h-5')}
              </button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 mb-4 px-2 py-2.5 bg-gradient-to-r from-[#E9F5F6] to-white rounded-xl">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">C</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 text-sm">Cameron Williamson</span>
                  <div className="transition-transform">
                    {getIcon('chevron-down', 'w-4 h-4', '#9CA3AF')}
                  </div>
                </div>
                <p className="text-xs text-gray-500">cameron.001@syvl.earth</p>
              </div>
            </div>
            
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Main Navigation */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main</h3>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (item.id === 'Home') {
                          navigate('/');
                          setActiveItem(item.id);
                        } else if (item.hasSubmenu) {
                          toggleExpanded(item.id);
                        } else {
                          setActiveItem(item.id);
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${activeItem === item.id 
                          ? 'bg-[#A8DADC]/25 text-gray-900' 
                          : 'text-gray-600 hover:bg-[#A8DADC]/15'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        {getIcon(item.icon, 'w-5 h-5')}
                        <span>{item.label}</span>
                      </div>
                      {item.hasSubmenu && (
                        <div className={`transition-transform ${expandedItems.includes(item.id) ? 'rotate-180' : ''}`}>
                          {getIcon('chevron-down', 'w-4 h-4', '#9CA3AF')}
                        </div>
                      )}
                    </button>
                    
                    {/* Show transcripts when Transcriptions is expanded */}
                    {item.id === 'Transcriptions' && expandedItems.includes(item.id) && (
                      <div className="ml-6 mt-2 max-h-48 overflow-y-auto space-y-1 pr-2">
                        {transcripts.length > 0 ? (
                          transcripts.map((transcript) => (
                            <button
                              key={transcript.id}
                              onClick={() => handleTranscriptClick(transcript.id)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors truncate"
                              title={transcript.title}
                            >
                              {transcript.title}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500 truncate">
                            No transcripts available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* New Transcript Button */}
            <div className="px-4 mb-4">
              <button 
                onClick={() => navigate('/transcripts')}
                className="w-full bg-[#1D3557] text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                {getIcon('plus', 'w-4 h-4', 'white')}
                <span>New Transcript</span>
              </button>
            </div>

            {/* System Navigation */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">System</h3>
              <nav className="space-y-1">
                {systemNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveItem(item.id);
                      // Add navigation for system items if needed
                      if (item.id === 'Settings') {
                        // navigate('/settings'); // Uncomment when settings page is created
                      } else if (item.id === 'Trash') {
                        // navigate('/trash'); // Uncomment when trash page is created
                      }
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${activeItem === item.id 
                        ? 'bg-teal-100 text-teal-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {getIcon(item.icon, 'w-5 h-5')}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Language Switcher at Bottom */}
            <div className="mt-auto p-4 ">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
