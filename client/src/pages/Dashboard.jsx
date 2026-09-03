import React, { useState, useEffect } from 'react';
import { Trophy, ArrowRight, Activity, Zap, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { apiService } from '../services/api.js';
import { socketService } from '../services/socket.js';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { currentUser, profile } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // A router-like hook is normally used in App, but here we just need to navigate to practice
  const handleStartPractice = () => {
    // In our App.jsx, navigation is handled via popstate, or passed as a prop.
    // We can dispatch a popstate event or just use window.history.
    window.history.pushState({}, '', '/practice');
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);
      const res = await apiService.getLeaderboard(10, 1);
      if (res.success) {
        setLeaderboard(res.data);
      }
      setLoading(false);
    };
    fetchBoard();

    // Listen for real-time leaderboard updates
    const handleNewRecord = (data) => {
      // Re-fetch leaderboard to ensure correct ordering and data
      // Alternatively, we could manually insert and sort, but refetching is safer for top 10
      apiService.getLeaderboard(10, 1).then(res => {
        if (res.success) {
          setLeaderboard(res.data);
        }
      });
    };

    const unsubscribe = socketService.on('new_record', handleNewRecord);
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '1rem 0 3rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Welcome & Quick Stats */}
      <section className="forest-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 className="heading-display text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Welcome back, {profile?.displayName || 'Wanderer'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Level {profile?.level || 1} — {profile?.experience || 0} / {profile ? Math.floor(200 * Math.pow(1.3, profile.level - 1)) : 200} EXP to next level
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Zap size={16} /> Best WPM
            </div>
            <div className="font-mono text-luminous" style={{ fontSize: '2rem', fontWeight: 700 }}>
              {profile?.stats?.bestWpm || 0}
            </div>
          </div>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Activity size={16} /> Avg Accuracy
            </div>
            <div className="font-mono text-success" style={{ fontSize: '2rem', fontWeight: 700 }}>
              {profile?.stats?.averageAccuracy || 100}%
            </div>
          </div>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Trophy size={16} /> Total Sessions
            </div>
            <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {profile?.stats?.testsCompleted || 0}
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={handleStartPractice}
            className="btn-forest btn-forest-primary"
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <Play size={20} /> START PRACTICE
          </button>
        </div>
      </section>

      {/* Global Leaderboard */}
      <section className="forest-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Trophy size={24} style={{ color: 'var(--color-warm-highlight)' }} />
            <h2 className="heading-display" style={{ fontSize: '1.5rem', margin: 0 }}>Global Leaderboard</h2>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading Leaderboard...
          </div>
        ) : leaderboard.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '1rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-moss)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 0.75rem' }}>Rank</th>
                  <th style={{ padding: '1rem 0.75rem' }}>Player</th>
                  <th style={{ padding: '1rem 0.75rem' }}>Level</th>
                  <th style={{ padding: '1rem 0.75rem' }}>Total EXP</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr key={user._id} style={{ 
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: user.firebaseUid === currentUser?.uid ? 'var(--bg-deep)' : 'transparent'
                  }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 700, color: 'var(--color-accent-luminous)' }}>
                      #{user.rank}
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {user.selectedAvatar && <img src={user.selectedAvatar} alt="" style={{width: 24, height: 24, borderRadius: '50%'}} />}
                      {user.displayName}
                    </td>
                    <td className="font-mono" style={{ padding: '1rem 0.75rem', color: 'var(--text-secondary)' }}>
                      Lvl {user.level}
                    </td>
                    <td className="font-mono text-warm" style={{ padding: '1rem 0.75rem', fontWeight: 700, color: 'var(--color-warm-highlight)' }}>
                      {user.lifetimeExperience.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No records found. Be the first to reach the leaderboard!
          </div>
        )}
      </section>

    </div>
  );
};
