import React, { useState } from 'react';
import { Menu, X, Trees, Sun, Moon, Monitor } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentUser, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = () => setActiveTab('auth');
  const handleProfileClick = () => setActiveTab('profile');

  const navItems = [
    { id: 'practice', label: 'Practice' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'stats', label: 'Stats' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
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
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-moss-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Trees size={24} />
          </div>
          <span className="heading-display" style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            textTransform: 'none'
          }}>
            ForesType
          </span>
        </button>

        {/* Center Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  padding: '0.5rem 0.25rem',
                  position: 'relative',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {item.label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-accent-luminous)',
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Controls & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {currentTheme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {currentUser ? (
            <button
              className="desktop-profile"
              onClick={handleProfileClick}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: activeTab === 'profile' ? '2px solid var(--color-accent-primary)' : '2px solid transparent',
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={profile?.displayName || 'Profile'}
            >
              {profile?.googlePhotoURL ? (
                <img src={profile.googlePhotoURL} alt="avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-moss)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
                  {(profile?.displayName || 'U')[0].toUpperCase()}
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-secondary)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid currentColor' }}></div>
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
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
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.id ? 'var(--color-accent-luminous)' : 'var(--text-primary)',
                fontWeight: activeTab === item.id ? 600 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.75rem 1rem'
              }}
            >
              {item.label}
            </button>
          ))}
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
    </header>
  );
};
