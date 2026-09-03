import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Trophy, Zap, Clock, ShieldCheck, Gamepad2 } from 'lucide-react';

export const Profile = () => {
  const { profile, logout } = useAuth();

  if (!profile) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading profile...</div>;

  const { stats, level, experience, lifetimeExperience, displayName, email } = profile;

  return (
    <div className="forest-card" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-moss)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--color-accent-luminous)' }}>
            {profile.selectedAvatar ? <img src={profile.selectedAvatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : displayName[0]}
          </div>
          <div>
            <h2 className="heading-display" style={{ margin: 0 }}>{displayName}</h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{email}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-accent-primary)' }}>Level {level}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{experience} EXP / Next Lvl</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="stat-card" style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><Trophy size={16} /> Total EXP</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{lifetimeExperience}</div>
        </div>
        <div className="stat-card" style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><Gamepad2 size={16} /> Tests Completed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats?.testsCompleted || 0}</div>
        </div>
        <div className="stat-card" style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><Zap size={16} /> Best WPM</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats?.bestWpm || 0}</div>
        </div>
        <div className="stat-card" style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><ShieldCheck size={16} /> Avg Accuracy</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats?.averageAccuracy || 0}%</div>
        </div>
      </div>
      
      <button 
        onClick={logout} 
        className="btn-forest" 
        style={{ width: '100%', borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
      >
        Sign Out
      </button>
    </div>
  );
};
