import React from 'react';
import { Trees } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid var(--border-moss)',
      backgroundColor: 'var(--bg-deep)',
      padding: '2rem 0',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center'
      }}>
        {/* Shortcut Legend */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          backgroundColor: 'var(--bg-surface)',
          padding: '0.6rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <kbd style={kbdStyle}>R</kbd> Restart
          </div>
          <div>
            <kbd style={kbdStyle}>ESC</kbd> Exit / Reset
          </div>
          <div>
            <kbd style={kbdStyle}>P</kbd> Pause
          </div>
          <div>
            <kbd style={kbdStyle}>Space</kbd> Continuous Stream
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
          <Trees size={16} style={{ color: 'var(--color-accent-primary)' }} />
          <span>Forest Type — Mysterious Bioluminescent Typing Grove</span>
        </div>

        <p style={{ maxWidth: '600px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          No registration required. Local stats stored in browser storage. Public high scores verified server-side with anti-cheat guard.
        </p>
      </div>
    </footer>
  );
};

const kbdStyle = {
  backgroundColor: 'var(--bg-secondary)',
  color: 'var(--color-accent-luminous)',
  padding: '0.15rem 0.45rem',
  borderRadius: '4px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  fontWeight: 600,
  marginRight: '0.35rem',
  border: '1px solid var(--border-moss)'
};
