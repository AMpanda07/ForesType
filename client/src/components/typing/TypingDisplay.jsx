import React, { useEffect, useRef } from 'react';

export const TypingDisplay = ({
  targetText = '',
  currentIndex = 0,
  typedChars = [],
  isStarted = false,
  isPaused = false,
  isCompleted = false
}) => {
  const containerRef = useRef(null);
  const activeCharRef = useRef(null);

  // Auto-scroll to keep active cursor visible in line window
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeChar = activeCharRef.current;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const activeTop = activeChar.offsetTop;
      const activeBottom = activeTop + activeChar.offsetHeight;

      if (activeTop < containerTop + 30) {
        container.scrollTo({ top: activeTop - 30, behavior: 'smooth' });
      } else if (activeBottom > containerBottom - 30) {
        container.scrollTo({ top: activeBottom - container.clientHeight + 40, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const characters = targetText.split('');

  return (
    <div
      ref={containerRef}
      className="forest-card"
      style={{
        position: 'relative',
        minHeight: '180px',
        maxHeight: '260px',
        overflowY: 'auto',
        padding: '1.75rem',
        backgroundColor: 'var(--bg-deep)',
        border: '1px solid var(--border-moss)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
        cursor: 'text',
        userSelect: 'none'
      }}
    >
      {/* Start Prompt Overlay */}
      {!isStarted && !isCompleted && (
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '1rem',
          fontSize: '0.75rem',
          color: 'var(--color-accent-primary)',
          backgroundColor: 'var(--bg-surface)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          pointerEvents: 'none'
        }}>
          Start typing to begin...
        </div>
      )}

      {/* Paused Overlay */}
      {isPaused && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(7, 18, 14, 0.85)',
          backdropFilter: 'blur(4px)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-warm-highlight)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.1em'
          }}>
            PAUSED — Press ESC or Resume
          </div>
        </div>
      )}

      {/* Character Grid */}
      <div className="font-mono" style={{
        fontSize: '1.35rem',
        lineHeight: 1.8,
        letterSpacing: '0.04em',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap'
      }}>
        {characters.map((char, idx) => {
          const isCurrent = idx === currentIndex;
          const typed = typedChars[idx];

          let charColor = 'var(--text-muted)';
          let bgColor = 'transparent';
          let borderBottom = 'none';

          if (typed) {
            if (typed.status === 'correct') {
              charColor = 'var(--text-primary)';
            } else {
              charColor = 'var(--color-error)';
              bgColor = 'var(--color-error-bg)';
            }
          }

          if (isCurrent) {
            charColor = 'var(--color-warm-highlight)';
            borderBottom = '2px solid var(--color-accent-luminous)';
          }

          return (
            <span
              key={idx}
              ref={isCurrent ? activeCharRef : null}
              className={isCurrent ? 'animate-cursor' : ''}
              style={{
                color: charColor,
                backgroundColor: bgColor,
                borderBottom: borderBottom,
                borderRadius: typed?.status === 'error' ? '2px' : '0',
                padding: '0 1px',
                transition: 'color 0.05s ease, background-color 0.05s ease'
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};
