import React, { useState, useEffect } from 'react';
import { KEYBOARD_ROWS, FINGER_COLORS } from '../../data/keyboardMap.js';

export const VirtualKeyboard = ({
  targetChar = '',
  lastTyped = null, // { char, status: 'correct'|'error' }
  showFingerZones = true
}) => {
  const normalizedTarget = (targetChar || '').toLowerCase();
  const [activeKeys, setActiveKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'CapsLock'].includes(e.key)) return;
      setActiveKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };
    const handleKeyUp = (e) => {
      setActiveKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="forest-card" style={{
      padding: '1.25rem',
      backgroundColor: 'var(--bg-deep)',
      border: '1px solid var(--border-moss)',
      borderRadius: 'var(--radius-lg)',
      width: '100%',
      maxWidth: '860px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
            {row.map((keyObj, keyIndex) => {
              const keyChar = keyObj.key.toLowerCase();
              const isTarget =
                (normalizedTarget === ' ' && keyObj.key === 'Space') ||
                normalizedTarget === keyChar;

              const isLastPressed =
                lastTyped &&
                ((lastTyped.char === ' ' && keyObj.key === 'Space') ||
                  lastTyped.char?.toLowerCase() === keyChar);

              const isCurrentlyPressed =
                activeKeys[keyChar] || (keyObj.key === 'Space' && activeKeys[' ']);

              const fingerColor = FINGER_COLORS[keyObj.finger] || 'var(--bg-secondary)';

              let bg = 'var(--bg-secondary)';
              let border = '1px solid var(--border-moss)';
              let color = 'var(--text-primary)';
              let boxShadow = 'none';

              if (showFingerZones) {
                border = `1px solid ${fingerColor}40`;
              }

              if (isTarget) {
                bg = 'var(--color-moss)';
                border = '1px solid var(--color-accent-luminous)';
                color = '#fff';
                boxShadow = 'var(--glow-moss)';
              }

              if (isLastPressed) {
                if (lastTyped.status === 'correct') {
                  bg = 'var(--color-moss-light)';
                  border = '1px solid var(--color-success)';
                  color = '#fff';
                  boxShadow = 'var(--glow-soft)';
                } else if (lastTyped.status === 'error') {
                  bg = 'var(--color-error-bg)';
                  border = '1px solid var(--color-error)';
                  color = 'var(--color-error)';
                  boxShadow = 'var(--glow-error)';
                }
              }

              if (isCurrentlyPressed) {
                bg = 'var(--color-moss-light)';
                border = '1px solid var(--color-success)';
                color = '#fff';
                boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)';
              }

              let widthFlex = keyObj.width ? keyObj.width.replace('flex-', '') : '1';

              return (
                <div
                  key={keyIndex}
                  style={{
                    flex: keyObj.key === 'Space' ? '1 1 200px' : widthFlex,
                    minWidth: keyObj.key === 'Space' ? '180px' : '36px',
                    height: '44px',
                    backgroundColor: bg,
                    border: border,
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color,
                    fontSize: '0.85rem',
                    fontWeight: isTarget ? 700 : 500,
                    fontFamily: 'var(--font-mono)',
                    position: 'relative',
                    transition: 'all 0.1s ease',
                    boxShadow: boxShadow,
                    userSelect: 'none'
                  }}
                >
                  <span>{keyObj.label}</span>

                  {/* Home Row Tactile Dot */}
                  {keyObj.home && (
                    <span style={{
                      position: 'absolute',
                      bottom: '4px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent-primary)'
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Finger Legend Bar */}
      {showFingerZones && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={fingerDotStyle('#4A7C59')} /> Pinky
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={fingerDotStyle('#3A6B49')} /> Ring
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={fingerDotStyle('#5C8A67')} /> Middle
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={fingerDotStyle('#72A96B')} /> Index
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={fingerDotStyle('#8FCF83')} /> Thumb (Space)
          </span>
        </div>
      )}
    </div>
  );
};

const fingerDotStyle = (color) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color,
  display: 'inline-block'
});
