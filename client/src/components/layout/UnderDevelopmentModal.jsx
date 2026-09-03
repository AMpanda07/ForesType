import React, { useEffect } from 'react';

export const UnderDevelopmentModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="forest-card"
        style={{
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          animation: 'pulseGlow 2s infinite'
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="heading-display text-luminous" style={{ marginBottom: '1rem' }}>
          Under Development
        </h2>
        <p className="text-secondary" style={{ marginBottom: '2rem' }}>
          This feature is currently being developed and will be available in a future update.
        </p>
        <button className="btn-forest btn-forest-primary" onClick={onClose} style={{ width: '100%' }}>
          Got it
        </button>
      </div>
    </div>
  );
};
