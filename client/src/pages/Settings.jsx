import React, { useState } from 'react';
import { Settings as SettingsIcon, Palette, Volume2, User, Moon, Sun, Monitor } from 'lucide-react';

export const Settings = ({ settings = {}, onUpdateSettings }) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const handleThemeChange = (theme) => {
    onUpdateSettings({ theme });
  };

  const handleAccentChange = (color) => {
    onUpdateSettings({ accentColor: color });
    // In a real app, this would update CSS variables on the :root element
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'sound', label: 'Sound', icon: Volume2 },
    { id: 'account', label: 'Account', icon: User }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: 'calc(100vh - 70px)', padding: '2rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem', alignItems: 'start' }}>
        
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h2 className="heading-display" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingLeft: '1rem' }}>Settings</h2>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--bg-surface)' : 'transparent',
                  border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--color-moss)' : 'currentColor' }} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{ padding: '3.5rem 2rem' }}>
          {activeTab === 'appearance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Theme</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Select or customize your UI theme.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {[
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'system', label: 'System', icon: Monitor }
                  ].map((theme) => {
                    const ThemeIcon = theme.icon;
                    const isSelected = settings.theme === theme.id || (!settings.theme && theme.id === 'light');
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className="glass-panel"
                        style={{
                          padding: '1.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '1rem',
                          cursor: 'pointer',
                          border: isSelected ? '2px solid var(--color-moss)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--bg-surface)' : 'var(--glass-bg)',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <ThemeIcon size={24} style={{ color: isSelected ? 'var(--color-moss)' : 'var(--text-secondary)' }} />
                        <span style={{ fontWeight: 500, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{theme.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color Section */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Accent Color</h3>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  {['#8bbd8b', '#68d391', '#4fd1c5', '#63b3ed', '#7f9cf5', '#b794f4', '#f687b3', '#fbd38d'].map((color) => {
                    const isSelected = (settings.accentColor === color) || (!settings.accentColor && color === '#8bbd8b');
                    return (
                      <button
                        key={color}
                        onClick={() => handleAccentChange(color)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          border: isSelected ? '2px solid white' : '2px solid transparent',
                          outline: isSelected ? `2px solid ${color}` : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform var(--transition-fast)'
                        }}
                      >
                        {isSelected && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typing Preview Section */}
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Typing Preview</h3>
                
                <div className="glass-panel" style={{ padding: '1.5rem', fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>The quick </span>brown fox jumps over the lazy dog.
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Settings are saved automatically
              </div>
            </div>
          )}

          {activeTab !== 'appearance' && (
            <div style={{ color: 'var(--text-muted)' }}>
              Settings for {activeTab} are coming soon.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
