import React, { useState } from 'react';
import { Leaf, RotateCcw, ArrowRight } from 'lucide-react';
import { submitRecord } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';

export const ResultCard = ({
  result = {},
  isPersonalBest = false,
  onTryAgain,
  onChangeGame,
  onViewRecords,
  profileName = '',
  onUpdateProfileName
}) => {
  const {
    mode = 'classic',
    wpm = 0,
    accuracy = 100,
    cpm = 0,
    score = 0,
    duration = 0,
    totalChars = 0,
    incorrectCount = 0,
    consistency = 100
  } = result;

  const { currentUser, profile } = useAuth();
  const [playerName, setPlayerName] = useState(profile?.displayName || profileName || 'Wanderer');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // We automatically submit score if user is logged in (handled by App.jsx in our architecture)
  // For the UI, we just focus on the look and feel.

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '540px',
        width: '100%',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Title Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="heading-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
            SESSION COMPLETE
          </h2>
          <Leaf size={24} style={{ color: 'var(--color-moss)', margin: '0 auto' }} />
        </div>

        {/* Primary Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          width: '100%',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '2rem'
        }}>
          <div>
            <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{wpm}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '0.5rem' }}>WPM</div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{accuracy}%</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '0.5rem' }}>ACCURACY</div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{cpm}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '0.5rem' }}>CPM</div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{consistency}%</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '0.5rem' }}>CONSISTENCY</div>
          </div>
        </div>

        {/* Secondary Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          width: '100%',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Correct Characters</div>
            <div className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-moss)' }}>{totalChars - incorrectCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Incorrect Characters</div>
            <div className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-error)' }}>{incorrectCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Characters</div>
            <div className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{totalChars}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Time</div>
            <div className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{duration}s</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={onTryAgain} className="btn-forest btn-forest-outline" style={{ padding: '0.75rem 2rem' }}>
            <RotateCcw size={18} style={{ marginRight: '0.5rem' }} /> Try Again
          </button>
          <button onClick={onTryAgain} className="btn-forest btn-forest-primary" style={{ padding: '0.75rem 2rem', background: 'var(--bg-surface)', color: 'var(--text-primary)', border: 'none' }}>
            <Leaf size={18} style={{ marginRight: '0.5rem', color: 'var(--color-moss)' }} /> New Session
          </button>
        </div>

        <button onClick={() => {
          window.history.pushState({}, '', '/dashboard');
          window.dispatchEvent(new Event('popstate'));
        }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Back to Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
