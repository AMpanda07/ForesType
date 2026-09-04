import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getMyRecords } from '../services/api.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle, Activity, Award } from 'lucide-react';

export const Dashboard = () => {
  const { currentUser, profile } = useAuth();
  const [recentSessions, setRecentSessions] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadRecords = async () => {
      if (currentUser) {
        const res = await getMyRecords();
        if (res.success && res.data) {
          setRecentSessions(res.data.slice(0, 5));
          
          // Format for chart (reverse to chronological order)
          const formatted = res.data.slice(0, 10).reverse().map(record => {
            const date = new Date(record.date);
            return {
              name: `${date.getMonth()+1}/${date.getDate()}`,
              wpm: record.wpm,
              accuracy: record.accuracy
            };
          });
          setChartData(formatted);
        }
      }
    };
    loadRecords();
  }, [currentUser]);

  const stats = profile?.stats || {
    testsCompleted: 0,
    bestWpm: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalTypingTime: 0,
    totalCharacters: 0,
    bestAccuracy: 0,
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0m';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: 'calc(100vh - 70px)', padding: '2rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header */}
        <div>
          <h1 className="heading-display" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Track your growth through the forest.</p>
        </div>

        {/* Top 4 Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Average WPM</div>
            <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {stats.averageWpm || 0}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-moss)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
              All Time
            </div>
          </div>
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Best WPM</div>
            <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {stats.bestWpm || 0}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Personal Best</div>
          </div>
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Average Accuracy</div>
            <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {stats.averageAccuracy || 0}%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-moss)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
              All Time
            </div>
          </div>
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Sessions</div>
            <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {stats.testsCompleted || 0}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>All Time</div>
          </div>
        </div>

        {/* Middle Row: Charts */}
        {chartData.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="forest-card" style={{ padding: '1.5rem', height: '350px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>WPM Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dx={-10} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="wpm" stroke="var(--color-moss)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-moss)', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="forest-card" style={{ padding: '1.5rem', height: '350px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Accuracy Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dx={-10} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="var(--color-moss)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-moss)', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        ) : (
          <div className="forest-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Complete some typing sessions to see your charts!
          </div>
        )}

        {/* Bottom Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          {/* Recent Sessions */}
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Recent Sessions</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentSessions.length > 0 ? recentSessions.map((session, i) => (
                <div key={session._id || i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < recentSessions.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <div style={{ color: 'var(--color-moss)' }}><Award size={16} /></div>
                    {new Date(session.date).toLocaleDateString()}
                  </div>
                  <div className="font-mono" style={{ fontWeight: 600 }}>{session.wpm} WPM</div>
                  <div className="font-mono">{session.accuracy}%</div>
                  <div className="font-mono text-muted">{session.cpm} CPM</div>
                </div>
              )) : (
                <div style={{ color: 'var(--text-muted)' }}>No recent sessions found.</div>
              )}
            </div>
          </div>
          
          {/* Statistics Summary */}
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} style={{ color: 'var(--color-moss)' }} /> Statistics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Clock size={16} /> Total Time
                </div>
                <div className="font-mono" style={{ fontWeight: 500 }}>{formatTime(stats.totalTypingTime)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} /> Total Characters
                </div>
                <div className="font-mono" style={{ fontWeight: 500 }}>{stats.totalCharacters?.toLocaleString() || 0}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Award size={16} /> Best Accuracy
                </div>
                <div className="font-mono" style={{ fontWeight: 500 }}>{stats.bestAccuracy || 0}%</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Activity size={16} /> Consistency
                </div>
                <div className="font-mono" style={{ fontWeight: 500 }}>{stats.testsCompleted > 0 ? 100 : 0}%</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
