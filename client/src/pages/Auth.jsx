import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { LogIn } from 'lucide-react';

export const Auth = ({ onAuthSuccess }) => {
  const { loginWithGoogle, loading } = useAuth();
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setError('');
    const res = await loginWithGoogle();
    if (!res.success) {
      setError(res.message || 'Google Login failed');
    } else if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  return (
    <div className="forest-card" style={{ maxWidth: '400px', margin: '4rem auto', padding: '2.5rem' }}>
      <h2 className="heading-display" style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-accent-luminous)' }}>
        Enter the Forest
      </h2>
      
      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-md)', color: 'var(--color-error)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Sign in to track your growth, earn experience, and climb the global leaderboard.
      </div>

      <button 
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn-forest btn-forest-primary"
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '0.85rem' }}
      >
        <LogIn size={20} />
        {loading ? 'Authenticating...' : 'Continue with Google'}
      </button>
    </div>
  );
};
