import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Trees, Trophy, BarChart3, HelpCircle, Gamepad2, Keyboard, Settings, LogIn, LogOut } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { isFeatureEnabled } from '../../config/features.js';
import { UnderDevelopmentModal } from './UnderDevelopmentModal.jsx';

export const Navbar = ({ activeTab, setActiveTab, profileName }) => {
  const { soundEnabled, toggleSound } = useAudio();
  const { currentUser, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setActiveTab('auth');
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const navItems = [
    { id: 'practice', label: 'Practice', icon: Keyboard },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'quotes', label: 'Quotes', icon: Keyboard },
    { id: 'records', label: 'Records', icon: Trophy },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'about', label: 'About', icon: HelpCircle }
  ];

  const [devModalOpen, setDevModalOpen] = useState(false);

  const handleNavClick = (id) => {
    // Check feature status
    if (!isFeatureEnabled(id)) {
      setDevModalOpen(true);
      return;
    }

    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-moss)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--color-moss)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent-luminous)',
            boxShadow: 'var(--glow-moss)'
          }}>
            <Trees size={22} />
          </div>
          <span className="heading-display" style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--text-primary)'
          }}>
            FOREST <span style={{ color: 'var(--color-accent-luminous)' }}>TYPE</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid var(--color-accent-primary)' : '1px solid transparent',
                  backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                  color: isActive ? 'var(--color-accent-luminous)' : 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Sound Toggle & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-moss)',
              backgroundColor: soundEnabled ? 'var(--bg-secondary)' : 'transparent',
              color: soundEnabled ? 'var(--color-accent-luminous)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {currentUser ? (
            <div
              className="desktop-profile"
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeTab === 'profile' ? 'var(--bg-secondary)' : 'var(--bg-surface)',
                border: activeTab === 'profile' ? '1px solid var(--color-accent-primary)' : '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
              onClick={handleProfileClick}
              title="View Profile"
            >
              {profile?.selectedAvatar ? (
                <img src={profile.selectedAvatar} alt="avatar" style={{width: 20, height: 20, borderRadius: '50%'}} />
              ) : (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
              )}
              <span style={{ color: activeTab === 'profile' ? 'var(--color-accent-luminous)' : 'inherit' }}>
                {profile?.displayName || currentUser.displayName || 'Wanderer'}
              </span>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-accent-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem'
              }}
            >
              <LogIn size={16} />
              Login
            </button>
          )}
          
          <button
            onClick={() => setActiveTab('settings')}
            title="Settings"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-moss)',
              backgroundColor: activeTab === 'settings' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'settings' ? 'var(--color-accent-luminous)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Settings size={18} />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-moss)',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-moss)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid ' + (isActive ? 'var(--color-accent-primary)' : 'var(--border-subtle)'),
                  backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                  color: isActive ? 'var(--color-accent-luminous)' : 'var(--text-primary)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-profile {
            display: none !important;
          }
          .mobile-menu-trigger {
            display: flex !important;
          }
        }
      `}</style>
      
      <UnderDevelopmentModal 
        isOpen={devModalOpen} 
        onClose={() => setDevModalOpen(false)} 
      />
    </header>
  );
};
