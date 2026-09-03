import React from 'react';
import { Gauge, Target, Clock, Zap, Flame, ShieldAlert } from 'lucide-react';

export const StatsHeader = ({
  wpm = 0,
  accuracy = 100,
  cpm = 0,
  time = 0,
  timeMode = 'remaining', // 'remaining' | 'elapsed'
  consistency = 100,
  streak = 0,
  errors = 0,
  maxErrors = null
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
      gap: '0.85rem',
      width: '100%',
      marginBottom: '1.25rem'
    }}>
      {/* WPM */}
      <div className="forest-card" style={{ padding: '0.85rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
          <Gauge size={14} style={{ color: 'var(--color-accent-primary)' }} />
          <span>WPM</span>
        </div>
        <div className="font-mono text-luminous" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>
          {wpm}
        </div>
      </div>

      {/* ACCURACY */}
      <div className="forest-card" style={{ padding: '0.85rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
          <Target size={14} style={{ color: 'var(--color-accent-luminous)' }} />
          <span>ACCURACY</span>
        </div>
        <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, color: accuracy >= 95 ? 'var(--color-success)' : accuracy >= 85 ? 'var(--text-primary)' : 'var(--color-error)' }}>
          {accuracy}%
        </div>
      </div>

      {/* TIME */}
      <div className="forest-card" style={{ padding: '0.85rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
          <Clock size={14} style={{ color: 'var(--color-warm-highlight)' }} />
          <span>{timeMode === 'remaining' ? 'TIME' : 'ELAPSED'}</span>
        </div>
        <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, color: 'var(--color-warm-highlight)' }}>
          {time}s
        </div>
      </div>

      {/* CPM */}
      <div className="forest-card" style={{ padding: '0.85rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
          <Zap size={14} style={{ color: 'var(--color-accent-primary)' }} />
          <span>CPM</span>
        </div>
        <div className="font-mono text-moss" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>
          {cpm}
        </div>
      </div>

      {/* STREAK / COMBO */}
      <div className="forest-card" style={{ padding: '0.85rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
          <Flame size={14} style={{ color: streak >= 20 ? 'var(--color-warm-highlight)' : 'var(--text-muted)' }} />
          <span>STREAK</span>
        </div>
        <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, color: streak >= 20 ? 'var(--color-warm-highlight)' : 'var(--text-primary)' }}>
          {streak}
        </div>
      </div>

      {/* ERRORS (if applicable) */}
      {maxErrors !== null && (
        <div className="forest-card" style={{ padding: '0.85rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
            <ShieldAlert size={14} style={{ color: 'var(--color-error)' }} />
            <span>ERRORS</span>
          </div>
          <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, color: errors > 0 ? 'var(--color-error)' : 'var(--color-success)' }}>
            {errors}{maxErrors !== Infinity ? `/${maxErrors}` : ''}
          </div>
        </div>
      )}
    </div>
  );
};
