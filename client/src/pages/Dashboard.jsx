import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { apiService } from '../services/api.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle, Activity, Award } from 'lucide-react';

export const Dashboard = () => {
  const { currentUser, profile } = useAuth();
  
  // Dummy data for the charts as placeholders, since the backend might not have this endpoint yet
  const chartData = [
    { name: 'May 10', wpm: 25, accuracy: 65 },
    { name: 'May 14', wpm: 45, accuracy: 55 },
    { name: 'May 18', wpm: 35, accuracy: 70 },
    { name: 'May 22', wpm: 60, accuracy: 68 },
    { name: 'May 26', wpm: 55, accuracy: 62 },
    { name: 'May 30', wpm: 75, accuracy: 80 },
    { name: 'Jun 3', wpm: 80, accuracy: 85 }
  ];

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
              68
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-moss)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>↑</span> 12%
            </div>
          </div>
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Best WPM</div>
            <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {profile?.stats?.bestWpm || 92}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Personal Best</div>
          </div>
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Average Accuracy</div>
            <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {profile?.stats?.averageAccuracy || 95}%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-moss)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>↑</span> 5%
            </div>
          </div>
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Sessions</div>
            <div className="font-mono text-primary" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1 }}>
              {profile?.stats?.testsCompleted || 24}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>All Time</div>
          </div>
        </div>

        {/* Middle Row: Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="forest-card" style={{ padding: '1.5rem', height: '350px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>WPM Over Time</h3>
              <select style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>
                <option>7 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dx={-10} domain={[0, 100]} />
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
              <select style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>
                <option>7 Days</option>
              </select>
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

        {/* Bottom Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          {/* Recent Sessions */}
          <div className="forest-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Recent Sessions</h3>
              <button style={{ background: 'none', border: 'none', color: 'var(--color-moss)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500 }}>View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { date: 'Today, 10:24 AM', wpm: 72, acc: 96, cpm: 361 },
                { date: 'Today, 9:15 AM', wpm: 65, acc: 94, cpm: 325 },
                { date: 'Yesterday, 6:40 PM', wpm: 58, acc: 93, cpm: 290 },
                { date: 'May 31, 3:20 PM', wpm: 81, acc: 97, cpm: 405 }
              ].map((session, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <div style={{ color: 'var(--color-moss)' }}><Award size={16} /></div>
                    {session.date}
                  </div>
                  <div className="font-mono" style={{ fontWeight: 600 }}>{session.wpm} WPM</div>
                  <div className="font-mono">{session.acc}%</div>
                  <div className="font-mono text-muted">{session.cpm} CPM</div>
                </div>
              ))}
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
                <div className="font-mono" style={{ fontWeight: 500 }}>4h 32m</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} /> Total Characters
                </div>
                <div className="font-mono" style={{ fontWeight: 500 }}>42,531</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Award size={16} /> Best Accuracy
                </div>
                <div className="font-mono" style={{ fontWeight: 500 }}>98%</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Activity size={16} /> Consistency
                </div>
                <div className="font-mono" style={{ fontWeight: 500 }}>97%</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
