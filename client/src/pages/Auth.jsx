import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export const Auth = ({ onAuthSuccess }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, loading } = useAuth();
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await loginWithGoogle();
    if (!res.success) {
      setError(res.message || 'Google Login failed');
    } else if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = isRegistering 
      ? await registerWithEmail(email, password)
      : await loginWithEmail(email, password);

    if (!res.success) {
      // Clean up firebase error messages
      const msg = res.message.replace('Firebase: ', '').replace(' (auth/email-already-in-use)', 'Email already in use').replace(' (auth/invalid-login-credentials)', 'Invalid credentials').replace(' (auth/weak-password)', 'Password too weak');
      setError(msg || 'Authentication failed');
    } else if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <form className="uiverse-form" onSubmit={handleEmailSubmit}>
        <p>
          Welcome,<span>{isRegistering ? 'register an account' : 'sign in to continue'}</span>
        </p>

        {error && (
          <div style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-md)', color: 'var(--color-error)', marginBottom: '0.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <button type="button" className="uiverse-oauthButton" onClick={handleGoogleLogin} disabled={loading}>
          <svg className="uiverse-icon" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            <path d="M1 1h22v22H1z" fill="none"></path>
          </svg>
          {loading ? 'Authenticating...' : 'Continue with Google'}
        </button>

        <div className="uiverse-separator">
          <div></div>
          <span>OR</span>
          <div></div>
        </div>

        <input 
          type="email" 
          placeholder="Email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegistering && (
          <input 
            type="password" 
            placeholder="Confirm Password" 
            name="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button type="submit" className="uiverse-oauthButton" disabled={loading}>
          {loading ? 'Working...' : (isRegistering ? 'Register' : 'Login')}
          <svg className="uiverse-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isRegistering ? 'Already have an account?' : 'Need an account?'}{' '}
          <button 
            type="button" 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            style={{ background: 'none', border: 'none', color: 'var(--color-moss)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isRegistering ? 'Log In' : 'Register'}
          </button>
        </p>
      </form>
    </div>
  );
};
