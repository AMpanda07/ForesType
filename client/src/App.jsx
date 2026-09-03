import React, { useState, useEffect } from 'react';
import { AtmosphericCanvas } from './components/layout/AtmosphericCanvas.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Practice } from './pages/Practice.jsx';
import { Stats } from './pages/Stats.jsx';
import { Settings } from './pages/Settings.jsx';
import { Auth } from './pages/Auth.jsx';
import { Profile } from './pages/Profile.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { useLocalStats } from './hooks/useLocalStats.js';
import { submitRecord } from './services/api.js';
import { socketService } from './services/socket.js';
import { useAuth } from './contexts/AuthContext.jsx';

export function App() {
  const initialPath = window.location.pathname.replace('/', '');
  const initialTab = initialPath || 'dashboard';
  
  const [activeTabState, setActiveTabState] = useState(initialTab);
  const { currentUser, profile } = useAuth();
  
  const {
    profileName,
    settings,
    stats,
    recentSessions,
    updateProfileName,
    updateSettings,
    saveSession,
    resetAllStats
  } = useLocalStats();

  useEffect(() => {
    socketService.connect();

    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '') || 'dashboard';
      setActiveTabState(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const theme = settings?.theme || 'light';
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [settings?.theme]);

  const activeTab = activeTabState;
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.history.pushState({}, '', `/${tab === 'dashboard' ? '' : tab}`);
  };

  const handleSessionComplete = async (sessionResult) => {
    saveSession(sessionResult); // Save locally for offline/guest
    if (currentUser) {
      await submitRecord({
        ...sessionResult,
        sessionId: sessionResult.id || Date.now().toString(),
      });
    }
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'home':
        return <Dashboard />;

      case 'practice':
        return (
          <Practice
            onFinishSession={handleSessionComplete}
            onSelectAnotherGame={() => setActiveTab('games')}
            onViewRecords={() => setActiveTab('dashboard')}
            profileName={profileName}
            onUpdateProfileName={updateProfileName}
          />
        );

      case 'stats':
        return (
          <Stats
            stats={profile?.stats || stats}
            recentSessions={recentSessions}
            profileName={profile?.displayName || profileName}
            onUpdateProfileName={updateProfileName}
            onResetStats={resetAllStats}
          />
        );

      case 'settings':
        return <Settings settings={settings} onUpdateSettings={updateSettings} />;

      case 'auth':
        return <Auth onAuthSuccess={() => setActiveTab('dashboard')} />;

      case 'profile':
        return <Profile />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <AtmosphericCanvas />

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', zIndex: 1, position: 'relative' }}>
        <Navbar
          activeTab={activeTab === 'home' ? 'dashboard' : activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="container" style={{ flex: 1, paddingTop: '1rem', paddingBottom: '2rem' }}>
          {renderActivePage()}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
