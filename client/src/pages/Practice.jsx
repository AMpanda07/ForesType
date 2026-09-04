import React, { useState } from 'react';
import { WordTrail } from '../components/games/WordTrail.jsx';
import { ArrowRight, TrendingUp, BarChart2, ShieldCheck, Compass } from 'lucide-react';

export const Practice = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <WordTrail
        onFinishSession={onFinishSession}
        onSelectAnotherGame={onSelectAnotherGame}
        onViewRecords={onViewRecords}
        profileName={profileName}
        onUpdateProfileName={onUpdateProfileName}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', padding: '2rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1rem' }}>Enter the</p>
        <h1 className="heading-display" style={{ fontSize: '4.5rem', marginBottom: '2rem', letterSpacing: '0.05em' }}>
          ForesType
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: 'var(--color-moss)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
          </svg>
        </div>

        <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '3rem', fontWeight: 500 }}>
          Sharpen your fingers.<br/>
          Find your rhythm.<br/>
          Explore further.
        </p>

        <button 
          onClick={() => setStarted(true)}
          className="glass-panel"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem 3rem', 
            fontSize: '1.2rem', 
            color: 'var(--text-primary)', 
            border: '1px solid var(--color-moss)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-full)'
          }}
        >
          Begin Practice <ArrowRight size={20} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', width: '100%', maxWidth: '1000px', borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <TrendingUp style={{ color: 'var(--color-moss)', marginTop: '0.2rem' }} size={24} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Improve Speed</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Increase your WPM</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <BarChart2 style={{ color: 'var(--color-moss)', marginTop: '0.2rem' }} size={24} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Track Progress</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>See your growth</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <ShieldCheck style={{ color: 'var(--color-moss)', marginTop: '0.2rem' }} size={24} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Stay Consistent</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Build your habit</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Compass style={{ color: 'var(--color-moss)', marginTop: '0.2rem' }} size={24} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Explore Modes</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>More ways to type</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
