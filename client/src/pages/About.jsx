import React from 'react';
import { HelpCircle, Trees, ShieldCheck, Keyboard, Gauge, Target, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0 3rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <HelpCircle size={26} style={{ color: 'var(--color-accent-luminous)' }} />
        <h1 className="heading-display" style={{ fontSize: '1.8rem', margin: 0 }}>ABOUT FOREST TYPE</h1>
      </div>

      {/* Intro Card */}
      <div className="forest-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Trees size={24} style={{ color: 'var(--color-accent-primary)' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>The Bioluminescent Typing Grove</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Forest Type is a high-performance browser application designed to cultivate typing speed, accuracy, consistency, and reaction speed under pressure. Inspired by the serene, ancient atmosphere of a dark bioluminescent forest, it provides 9 distinct practice games and zero-latency mechanics.
        </p>
      </div>

      {/* Mechanics & Formulas Card */}
      <div className="forest-card" style={{ padding: '1.75rem' }}>
        <h2 className="heading-display" style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>TYPING METRICS & FORMULAS</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={formulaBoxStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-accent-luminous)' }}>
              <Gauge size={16} /> Words Per Minute (WPM)
            </div>
            <code className="font-mono text-warm" style={{ display: 'block', margin: '0.5rem 0', fontSize: '0.85rem' }}>
              WPM = (correct_characters / 5) / elapsed_minutes
            </code>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Calculated using the international standard 5-character word convention.
            </p>
          </div>

          <div style={formulaBoxStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-success)' }}>
              <Target size={16} /> Typing Accuracy (%)
            </div>
            <code className="font-mono text-warm" style={{ display: 'block', margin: '0.5rem 0', fontSize: '0.85rem' }}>
              Accuracy = (correct_chars / total_typed_chars) * 100
            </code>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Measures precision ratio. Division-by-zero handled safely.
            </p>
          </div>

          <div style={formulaBoxStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-accent-primary)' }}>
              <Sparkles size={16} /> Characters Per Minute (CPM)
            </div>
            <code className="font-mono text-warm" style={{ display: 'block', margin: '0.5rem 0', fontSize: '0.85rem' }}>
              CPM = correct_characters / elapsed_minutes
            </code>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Raw character output per minute regardless of word boundaries.
            </p>
          </div>

          <div style={formulaBoxStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-warm-highlight)' }}>
              <ShieldCheck size={16} /> Consistency (%)
            </div>
            <code className="font-mono text-warm" style={{ display: 'block', margin: '0.5rem 0', fontSize: '0.85rem' }}>
              Consistency = max(0, 100 * (1 - (stdDev / meanWPM)))
            </code>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Evaluates speed variation between 1-second sample intervals.
            </p>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Legend */}
      <div className="forest-card" style={{ padding: '1.75rem' }}>
        <h2 className="heading-display" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>KEYBOARD SHORTCUTS</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-moss)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.5rem' }}>KEY</th>
              <th style={{ padding: '0.5rem' }}>ACTION</th>
              <th style={{ padding: '0.5rem' }}>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '0.6rem' }}><kbd style={kbdStyle}>R</kbd></td>
              <td style={{ padding: '0.6rem', fontWeight: 600 }}>Restart</td>
              <td style={{ padding: '0.6rem', color: 'var(--text-secondary)' }}>Instantly restarts the current typing test or game run.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '0.6rem' }}><kbd style={kbdStyle}>ESC</kbd></td>
              <td style={{ padding: '0.6rem', fontWeight: 600 }}>Reset / Exit</td>
              <td style={{ padding: '0.6rem', color: 'var(--text-secondary)' }}>Exits or pauses the active run and returns focus.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '0.6rem' }}><kbd style={kbdStyle}>P</kbd></td>
              <td style={{ padding: '0.6rem', fontWeight: 600 }}>Pause / Resume</td>
              <td style={{ padding: '0.6rem', color: 'var(--text-secondary)' }}>Pauses or resumes the timer tick.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '0.6rem' }}><kbd style={kbdStyle}>Space</kbd></td>
              <td style={{ padding: '0.6rem', fontWeight: 600 }}>Word Space</td>
              <td style={{ padding: '0.6rem', color: 'var(--text-secondary)' }}>Advances cursor to next word in continuous text streams.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Privacy & No-Login Commitment */}
      <div className="forest-card" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-deep)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={20} style={{ color: 'var(--color-success)' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Privacy & No-Login Promise</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Forest Type does not require user registration, email logins, or account creation. Your personal bests, session logs, and weak key analytics are persisted locally in your browser's versioned <code style={{ color: 'var(--color-accent-luminous)' }}>localStorage</code>. Leaderboard high score submissions are verified server-side with anti-cheat checks to ensure public record integrity.
        </p>
      </div>
    </div>
  );
};

const formulaBoxStyle = {
  backgroundColor: 'var(--bg-deep)',
  padding: '1rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-moss)'
};

const kbdStyle = {
  backgroundColor: 'var(--bg-secondary)',
  color: 'var(--color-accent-luminous)',
  padding: '0.15rem 0.5rem',
  borderRadius: '4px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  fontWeight: 600,
  border: '1px solid var(--border-moss)'
};
