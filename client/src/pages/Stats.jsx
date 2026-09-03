import React, { useState } from 'react';
import { BarChart3, Clock, Gauge, Target, Zap, Trash2, ShieldAlert, Award, UserCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const Stats = ({
  stats = {},
  recentSessions = [],
  profileName = '',
  onUpdateProfileName,
  onResetStats
}) => {
  const [nameInput, setNameInput] = useState(profileName || 'Wanderer');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (onUpdateProfileName) onUpdateProfileName(nameInput);
  };

  // Convert session history into chart dataset
  const chartData = [...recentSessions].reverse().map((s, idx) => ({
    session: `#${idx + 1}`,
    wpm: s.wpm,
    accuracy: s.accuracy,
    mode: s.mode
  }));

  // Format practice time seconds into hours and minutes
  const totalSecs = stats.totalPracticeTime || 0;
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const timeFormatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m ${totalSecs % 60}s`;

  // Top weak mistyped keys
  const weakKeys = Object.entries(stats.weakKeys || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
      {/* Title & Profile Name Form */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BarChart3 size={24} style={{ color: 'var(--color-accent-luminous)' }} />
          <h1 className="heading-display" style={{ fontSize: '1.75rem', margin: 0 }}>PERSONAL DASHBOARD</h1>
        </div>

        {/* Profile Name Handle Config */}
        <form onSubmit={handleSaveName} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Handle:</span>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            maxLength={20}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-moss)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.35rem 0.75rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.85rem'
            }}
          />
          <button type="submit" className="btn-forest" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
            <UserCheck size={14} /> Save
          </button>
        </form>
      </div>

      {/* Primary Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem'
      }}>
        <div className="forest-card" style={statCardStyle}>
          <Gauge size={20} style={{ color: 'var(--color-accent-luminous)' }} />
          <span style={statLabelStyle}>BEST WPM</span>
          <span className="font-mono text-luminous" style={{ fontSize: '2rem', fontWeight: 700 }}>
            {stats.bestWpm || 0}
          </span>
        </div>

        <div className="forest-card" style={statCardStyle}>
          <Target size={20} style={{ color: 'var(--color-success)' }} />
          <span style={statLabelStyle}>BEST ACCURACY</span>
          <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>
            {stats.bestAccuracy || 100}%
          </span>
        </div>

        <div className="forest-card" style={statCardStyle}>
          <Zap size={20} style={{ color: 'var(--color-accent-primary)' }} />
          <span style={statLabelStyle}>BEST CPM</span>
          <span className="font-mono text-moss" style={{ fontSize: '2rem', fontWeight: 700 }}>
            {stats.bestCpm || 0}
          </span>
        </div>

        <div className="forest-card" style={statCardStyle}>
          <Clock size={20} style={{ color: 'var(--color-warm-highlight)' }} />
          <span style={statLabelStyle}>PRACTICE TIME</span>
          <span className="font-mono text-warm" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-warm-highlight)' }}>
            {timeFormatted}
          </span>
        </div>

        <div className="forest-card" style={statCardStyle}>
          <Award size={20} style={{ color: 'var(--text-primary)' }} />
          <span style={statLabelStyle}>TOTAL CHARACTERS</span>
          <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {(stats.totalCharactersTyped || 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* WPM Trend Chart & Weak Keys Diagnostic Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Trend Chart */}
        <div className="forest-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            WPM PROGRESSION TREND
          </h3>

          {chartData.length > 1 ? (
            <div style={{ width: '100%', height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(114, 169, 107, 0.15)" />
                  <XAxis dataKey="session" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--bg-deep)',
                      border: '1px solid var(--border-moss)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    stroke="var(--color-accent-luminous)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-accent-primary)', r: 4 }}
                    activeDot={{ r: 6, fill: 'var(--color-warm-highlight)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Complete at least 2 typing runs to render WPM progression graph.
            </div>
          )}
        </div>

        {/* Weakest Keys Panel */}
        <div className="forest-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
            <ShieldAlert size={18} style={{ color: 'var(--color-error)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>WEAKEST KEYS</h3>
          </div>

          {weakKeys.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {weakKeys.map(([char, count]) => (
                <div
                  key={char}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-deep)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span className="font-mono text-warm" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    '{char.toUpperCase()}'
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-error)' }}>
                    {count} mistakes
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No recorded mistakes yet! Keep up the precision.
            </div>
          )}
        </div>
      </div>

      {/* Session History Table */}
      <div className="forest-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--bg-deep)',
          borderBottom: '1px solid var(--border-moss)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>RECENT SESSIONS HISTORY</h3>

          {showClearConfirm ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-error)' }}>Clear all local history?</span>
              <button
                onClick={() => {
                  onResetStats();
                  setShowClearConfirm(false);
                }}
                className="btn-forest"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)' }}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn-forest btn-forest-outline"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="btn-forest btn-forest-outline"
              style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem', color: 'var(--color-error)' }}
            >
              <Trash2 size={14} /> Clear Local Data
            </button>
          )}
        </div>

        {recentSessions.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>DATE</th>
                  <th style={{ padding: '0.75rem 1rem' }}>MODE</th>
                  <th style={{ padding: '0.75rem 1rem' }}>WPM</th>
                  <th style={{ padding: '0.75rem 1rem' }}>ACCURACY</th>
                  <th style={{ padding: '0.75rem 1rem' }}>DURATION</th>
                  <th style={{ padding: '0.75rem 1rem' }}>SCORE</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((s, idx) => (
                  <tr key={s.id || idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(s.date).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500, textTransform: 'capitalize' }}>
                      {(s.mode || '').replace('_', ' ')}
                    </td>
                    <td className="font-mono text-luminous" style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                      {s.wpm}
                    </td>
                    <td className="font-mono" style={{ padding: '0.75rem 1rem', color: 'var(--color-success)' }}>
                      {s.accuracy}%
                    </td>
                    <td className="font-mono" style={{ padding: '0.75rem 1rem' }}>
                      {s.duration}s
                    </td>
                    <td className="font-mono text-warm" style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-warm-highlight)' }}>
                      {(s.score || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No recent sessions recorded yet. Start a typing run to populate your history!
          </div>
        )}
      </div>
    </div>
  );
};

const statCardStyle = {
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.2rem',
  textAlign: 'center'
};

const statLabelStyle = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  letterSpacing: '0.05em',
  marginTop: '0.3rem'
};
