import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import { BreadCrumbs } from './BreadCrumbs';
import { useTranscript } from '../contexts/TranscriptContext';

// Import icons
import HomeIcon from '/public/icons/home.svg?react';
import BellIcon from '/public/icons/bell.svg?react';
import ChevronDownIcon from '/public/icons/chevron-down.svg?react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { loadedTranscript } = useTranscript();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Generate breadcrumbs based on current route
  const getBreadcrumbs = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return [
        { 
          label: t('sidebar.home'), 
          path: '/', 
          isActive: true,
          icon: <HomeIcon className="w-4 h-4" />
        }
      ];
    } else if (path === '/transcripts') {
      return [
        { label: t('sidebar.home'), path: '/' },
        { label: t('sidebar.transcripts'), isActive: true }
      ];
    } else if (path.startsWith('/transcripts/')) {
      const transcriptId = path.split('/')[2];
      const transcriptName = loadedTranscript?.title || `Transcript ${transcriptId}`;
      return [
        { label: t('sidebar.home'), path: '/' },
        { label: t('sidebar.transcripts'), path: '/transcripts' },
        { label: transcriptName, isActive: true }
      ];
    }
    
    // Default breadcrumbs
    return [
      { label: t('sidebar.home'), path: '/' },
      { label: 'Page', isActive: true }
    ];
  };

  return (
    <div className="h-screen bg-[#F9F9F9] p-4" style={{
      backgroundImage: 'url(/bg/app-bg.svg)',
      backgroundSize: '150%',
      backgroundPosition: 'top left',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Top Bar */}
          <header className=" shadow-sm border-b border-gray-200 px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-800">Home Table V1</h1>
              <div className="w-8"></div> {/* Spacer for centering */}
            </div>
          </header>

          {/* Breadcrumbs */}
          <div className=" backdrop-blur-sm px-6 py-3 flex items-center justify-between">
            <BreadCrumbs items={getBreadcrumbs()} />
            {location.pathname.includes('/transcript/') ? (
              // Bell icon for transcript detail pages
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <BellIcon className="w-5 h-5" />
              </button>
            ) : (
              // New Transcript button for transcript list pages
              <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:brightness-125 transition-colors">
                <span>{t('transcripts.newTranscript')}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
