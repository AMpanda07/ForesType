import React from 'react';
import { Target, Clock, Activity, BarChart2 } from 'lucide-react';

export const StatsHeader = ({
  wpm = 0,
  accuracy = 100,
  cpm = 0,
  time = 0,
  timeMode = 'remaining'
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.25rem',
      width: '100%',
      marginBottom: '2rem'
    }}>
      {/* WPM */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>WPM</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
            {wpm}
          </div>
          <BarChart2 size={24} style={{ color: 'var(--color-moss)' }} />
        </div>
      </div>

      {/* ACCURACY */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>ACCURACY</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
            {accuracy}%
          </div>
          <Target size={24} style={{ color: 'var(--color-moss)' }} />
        </div>
      </div>

      {/* CPM */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>CPM</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
            {cpm}
          </div>
          <Activity size={24} style={{ color: 'var(--color-moss)' }} />
        </div>
      </div>

      {/* TIME */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>TIME</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
            {time}s
          </div>
          <Clock size={24} style={{ color: 'var(--color-moss)' }} />
        </div>
      </div>
    </div>
  );
};
