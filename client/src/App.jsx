import React, { useState, useEffect } from 'react';
import { AtmosphericCanvas } from './components/layout/AtmosphericCanvas.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Practice } from './pages/Practice.jsx';
import { Games } from './pages/Games.jsx';
import { Records } from './pages/Records.jsx';
import { Stats } from './pages/Stats.jsx';
import { About } from './pages/About.jsx';
import { Settings } from './pages/Settings.jsx';
import { Auth } from './pages/Auth.jsx';
import { Profile } from './pages/Profile.jsx';
import { useLocalStats } from './hooks/useLocalStats.js';
import { fetchRecords } from './services/api.js';
import { socketService } from './services/socket.js';
import { isFeatureEnabled } from './config/features.js';

export function App() {
  const initialPath = window.location.pathname.replace('/', '');
  const initialTab = initialPath || 'home';
  
  const [activeTabState, setActiveTabState] = useState(initialTab);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [publicRecords, setPublicRecords] = useState([]);

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

  // Load public records preview on mount & Handle Popstate
  useEffect(() => {
    socketService.connect();
    
    fetchRecords('all', 10).then((res) => {
      if (res.data) {
        setPublicRecords(res.data);
      }
    });

    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '') || 'home';
      setActiveTabState(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Apply Theme
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
    window.history.pushState({}, '', `/${tab === 'home' ? '' : tab}`);
  };

  const handleSelectGameFromHome = (gameId) => {
    if (gameId === 'records') {
      setActiveTab('records');
    } else if (gameId === 'classic') {
      setActiveTab('practice');
    } else {
      setSelectedGameId(gameId);
      setActiveTab('games');
    }
  };

  const handleSessionComplete = (sessionResult) => {
    saveSession(sessionResult);
    // Refresh leaderboard preview
    fetchRecords('all', 10).then((res) => {
      if (res.data) setPublicRecords(res.data);
    });
  };

  const renderActivePage = () => {
    if (!isFeatureEnabled(activeTab)) {
      return (
        <div className="forest-card" style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center', padding: '3rem 1rem' }}>
          <h2 className="heading-display text-luminous" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>UNDER DEVELOPMENT</h2>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>
            This feature is currently being developed and will be available in a future update.
          </p>
          <button className="btn-forest btn-forest-primary" style={{ width: '100%' }} onClick={() => setActiveTab('home')}>
            Return Home
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <Home
            onSelectGame={handleSelectGameFromHome}
            stats={stats}
            records={publicRecords}
            profileName={profileName}
          />
        );

      case 'practice':
        return (
          <Practice
            onFinishSession={handleSessionComplete}
            onSelectAnotherGame={() => setActiveTab('games')}
            onViewRecords={() => setActiveTab('records')}
            profileName={profileName}
            onUpdateProfileName={updateProfileName}
          />
        );

      case 'games':
        return (
          <Games
            selectedGameId={selectedGameId}
            onFinishSession={handleSessionComplete}
            onViewRecords={() => setActiveTab('records')}
            profileName={profileName}
            onUpdateProfileName={updateProfileName}
          />
        );

      case 'records':
        return <Records />;

      case 'stats':
        return (
          <Stats
            stats={stats}
            recentSessions={recentSessions}
            profileName={profileName}
            onUpdateProfileName={updateProfileName}
            onResetStats={resetAllStats}
          />
        );

      case 'about':
        return <About />;

      case 'settings':
        return <Settings settings={settings} onUpdateSettings={updateSettings} />;

      case 'auth':
        return <Auth onAuthSuccess={() => setActiveTab('profile')} />;

      case 'profile':
        return <Profile />;

      default:
        return (
          <Home
            onSelectGame={handleSelectGameFromHome}
            stats={stats}
            records={publicRecords}
            profileName={profileName}
          />
        );
    }
  };

  return (
    <>
      {/* Background Canvas Particles */}
      <AtmosphericCanvas />

      {/* Main Container */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', zIndex: 1, position: 'relative' }}>
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setSelectedGameId(null);
            setActiveTab(tab);
          }}
          profileName={profileName}
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
