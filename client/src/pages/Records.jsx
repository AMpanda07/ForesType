import React, { useState, useEffect } from 'react';
import { Trophy, Filter, RefreshCw, Server, AlertCircle } from 'lucide-react';
import { fetchRecords } from '../services/api.js';

export const Records = () => {
  const [records, setRecords] = useState([]);
  const [selectedMode, setSelectedMode] = useState('all');
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('mongodb');

  const loadLeaderboard = async () => {
    setLoading(true);
    const res = await fetchRecords(selectedMode, 50);
    setLoading(false);
    if (res.data) {
      setRecords(res.data);
      setDataSource(res.source || 'mongodb');
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, [selectedMode]);

  const modeFilters = [
    { id: 'all', name: 'All Modes' },
    { id: 'classic', name: 'Word Trail' },
    { id: 'speed_rush', name: 'Forest Rush' },
    { id: 'accuracy', name: 'Deep Cavern' },
    { id: 'endless', name: 'Endless Grove' },
    { id: 'spore_fall', name: 'Spore Fall' },
    { id: 'word_survival', name: 'Thorns' },
    { id: 'precision', name: 'Precision' },
    { id: 'progressive', name: 'Pathfinder' },
    { id: 'keyboard_trainer', name: 'Keyboard' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
      {/* Title & Status */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Trophy size={24} style={{ color: 'var(--color-warm-highlight)' }} />
          <h1 className="heading-display" style={{ fontSize: '1.75rem', margin: 0 }}>RECORD GROVE</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'var(--bg-surface)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <Server size={14} style={{ color: dataSource === 'mongodb' ? 'var(--color-success)' : 'var(--color-warm-highlight)' }} />
            <span>Database: {dataSource === 'mongodb' ? 'MongoDB Atlas' : 'Local Fallback'}</span>
          </div>

          <button onClick={loadLeaderboard} className="btn-forest btn-forest-outline" style={{ padding: '0.35rem 0.75rem' }}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Mode Filter Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        backgroundColor: 'var(--bg-surface)',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-moss)'
      }}>
        {modeFilters.map((f) => {
          const isActive = selectedMode === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedMode(f.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid ' + (isActive ? 'var(--color-accent-primary)' : 'var(--border-subtle)'),
                backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                color: isActive ? 'var(--color-accent-luminous)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {f.name}
            </button>
          );
        })}
      </div>

      {/* Leaderboard Table Card */}
      <div className="forest-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Retrieving high scores from Record Grove...
          </div>
        ) : records.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-moss)' }}>
                  <th style={thStyle}>RANK</th>
                  <th style={thStyle}>PLAYER</th>
                  <th style={thStyle}>WPM</th>
                  <th style={thStyle}>ACCURACY</th>
                  <th style={thStyle}>CPM</th>
                  <th style={thStyle}>SCORE</th>
                  <th style={thStyle}>MODE</th>
                  <th style={thStyle}>DATE</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, idx) => {
                  const rank = idx + 1;
                  let rankColor = 'var(--text-secondary)';
                  let rankBg = 'transparent';

                  if (rank === 1) {
                    rankColor = 'var(--color-warm-highlight)';
                    rankBg = 'rgba(216, 209, 160, 0.1)';
                  } else if (rank === 2) {
                    rankColor = 'var(--color-accent-luminous)';
                  } else if (rank === 3) {
                    rankColor = 'var(--color-accent-primary)';
                  }

                  return (
                    <tr
                      key={rec._id || idx}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        backgroundColor: rankBg,
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: rankColor, fontFamily: 'var(--font-mono)' }}>
                        #{rank < 10 ? `0${rank}` : rank}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {rec.playerName}
                      </td>
                      <td className="font-mono text-luminous" style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                        {rec.wpm}
                      </td>
                      <td className="font-mono" style={{ padding: '0.85rem 1rem', color: 'var(--color-success)' }}>
                        {rec.accuracy}%
                      </td>
                      <td className="font-mono text-moss" style={{ padding: '0.85rem 1rem' }}>
                        {rec.cpm}
                      </td>
                      <td className="font-mono text-warm" style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--color-warm-highlight)' }}>
                        {(rec.score || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                        {(rec.mode || '').replace('_', ' ')}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {rec.date ? new Date(rec.date).toLocaleDateString() : 'Recent'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No records found for the selected mode. Be the first to set a score!
          </div>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  padding: '0.85rem 1rem',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.05em'
};
