import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { LogIn, UserPlus } from 'lucide-react';

export const Auth = ({ onAuthSuccess }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', displayName: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (!res.success) setError(res.message || 'Login failed');
      else if (onAuthSuccess) onAuthSuccess();
    } else {
      const res = await register(formData.email, formData.password, formData.displayName);
      if (!res.success) setError(res.message || 'Registration failed');
      else if (onAuthSuccess) onAuthSuccess();
    }
  };

  return (
    <div className="forest-card" style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
      <h2 className="heading-display" style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-accent-luminous)' }}>
        {isLogin ? 'Login to Forest Type' : 'Create an Account'}
      </h2>
      
      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 60, 60, 0.1)', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', color: 'var(--color-danger)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {!isLogin && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Display Name</label>
            <input 
              type="text" 
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              required
            />
          </div>
        )}
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
          <input 
            type="password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn-forest btn-forest-primary"
          style={{ width: '100%', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
        >
          {isLogin ? <><LogIn size={18} /> Login</> : <><UserPlus size={18} /> Register</>}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => { setIsLogin(!isLogin); setError(''); }}
          style={{ background: 'none', border: 'none', color: 'var(--color-accent-primary)', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  );
};
