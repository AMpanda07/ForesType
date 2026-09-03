import React from 'react';

export const Settings = ({ settings, onUpdateSettings }) => {
  const handleThemeChange = (e) => {
    onUpdateSettings({ theme: e.target.value });
  };

  const handleCaretChange = (e) => {
    onUpdateSettings({ caretStyle: e.target.value });
  };

  const handleShowErrorsChange = (e) => {
    onUpdateSettings({ showErrors: e.target.checked });
  };

  return (
    <div className="forest-card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2 className="heading-display" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-moss)', paddingBottom: '1rem' }}>
        Settings
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Appearance Settings */}
        <section>
          <h3 style={{ color: 'var(--color-accent-luminous)', marginBottom: '1rem', fontSize: '1.1rem' }}>Appearance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-secondary">Theme</span>
              <select 
                value={settings.theme || 'light'} 
                onChange={handleThemeChange}
                style={{
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-deep)',
                  border: '1px solid var(--border-moss)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              >
                <option value="light">Light (Default)</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </label>
          </div>
        </section>

        {/* Typing Settings */}
        <section>
          <h3 style={{ color: 'var(--color-accent-luminous)', marginBottom: '1rem', fontSize: '1.1rem' }}>Typing Experience</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-secondary">Caret Style</span>
              <select 
                value={settings.caretStyle || 'block'} 
                onChange={handleCaretChange}
                style={{
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-deep)',
                  border: '1px solid var(--border-moss)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              >
                <option value="block">Block</option>
                <option value="line">Line</option>
                <option value="underline">Underline</option>
              </select>
            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-secondary">Show Errors Red</span>
              <input 
                type="checkbox" 
                checked={settings.showErrors !== false} 
                onChange={handleShowErrorsChange}
                style={{ transform: 'scale(1.2)', accentColor: 'var(--color-accent-primary)' }}
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};
