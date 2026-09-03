import React, { useState } from 'react';
import { Trophy, RotateCcw, LayoutGrid, Award, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitRecord } from '../../services/api.js';

export const ResultCard = ({
  result = {},
  isPersonalBest = false,
  onTryAgain,
  onChangeGame,
  onViewRecords,
  profileName = '',
  onUpdateProfileName
}) => {
  const {
    mode = 'classic',
    wpm = 0,
    accuracy = 100,
    cpm = 0,
    score = 0,
    duration = 0,
    totalChars = 0,
    incorrectCount = 0,
    consistency = 100
  } = result;

  const [playerName, setPlayerName] = useState(profileName || 'Wanderer');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { success: true/false, message: '' }

  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!playerName.trim() || submitting) return;

    setSubmitting(true);
    setSubmitStatus(null);

    if (onUpdateProfileName) {
      onUpdateProfileName(playerName.trim());
    }

    const payload = {
      playerName: playerName.trim(),
      mode,
      wpm,
      accuracy,
      cpm,
      score,
      duration: Math.max(1, duration),
      consistency
    };

    const res = await submitRecord(payload);
    setSubmitting(false);

    if (res.success) {
      setSubmitStatus({
        success: true,
        message: res.message || 'Record successfully inscribed in Record Grove!'
      });
    } else {
      setSubmitStatus({
        success: false,
        message: res.message || 'Submission failed. Record saved locally.'
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(3, 8, 7, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease'
    }}>
      <div className="forest-card" style={{
        maxWidth: '540px',
        width: '100%',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--color-accent-primary)',
        boxShadow: 'var(--glow-moss)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {isPersonalBest && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(216, 209, 160, 0.15)',
              border: '1px solid var(--color-warm-highlight)',
              color: 'var(--color-warm-highlight)',
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '0.75rem'
            }}>
              <Award size={16} /> NEW PERSONAL BEST!
            </div>
          )}

          <h2 className="heading-display" style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>
            THE RUN ENDS
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Mode: <span style={{ color: 'var(--color-accent-luminous)', textTransform: 'capitalize' }}>{mode.replace('_', ' ')}</span>
          </p>
        </div>

        {/* Primary Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={metricBoxStyle}>
            <span style={metricLabelStyle}>WPM</span>
            <span className="font-mono text-luminous" style={{ fontSize: '2.2rem', fontWeight: 700 }}>
              {wpm}
            </span>
          </div>

          <div style={metricBoxStyle}>
            <span style={metricLabelStyle}>ACCURACY</span>
            <span className="font-mono" style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-success)' }}>
              {accuracy}%
            </span>
          </div>
        </div>

        {/* Secondary Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          textAlign: 'center'
        }}>
          <div style={subMetricStyle}>
            <span style={{ color: 'var(--text-muted)' }}>Characters</span>
            <span className="font-mono" style={{ fontWeight: 600 }}>{totalChars}</span>
          </div>
          <div style={subMetricStyle}>
            <span style={{ color: 'var(--text-muted)' }}>Errors</span>
            <span className="font-mono" style={{ color: incorrectCount > 0 ? 'var(--color-error)' : 'var(--text-primary)' }}>
              {incorrectCount}
            </span>
          </div>
          <div style={subMetricStyle}>
            <span style={{ color: 'var(--text-muted)' }}>Consistency</span>
            <span className="font-mono">{consistency}%</span>
          </div>
        </div>

        {/* High Score Submission Form */}
        <form onSubmit={handleSubmitScore} style={{
          backgroundColor: 'var(--bg-deep)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-moss)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Submit score to Record Grove:
            </label>
            <span className="font-mono text-warm" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-warm-highlight)' }}>
              Score: {score.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your handle (e.g. Wanderer)"
              maxLength={20}
              required
              disabled={submitStatus?.success}
              style={{
                flex: 1,
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-moss)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem 0.75rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              disabled={submitting || submitStatus?.success}
              className="btn-forest btn-forest-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              {submitting ? 'Sending...' : submitStatus?.success ? <CheckCircle2 size={16} /> : <Send size={16} />}
            </button>
          </div>

          {submitStatus && (
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.8rem',
              color: submitStatus.success ? 'var(--color-success)' : 'var(--color-error)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              {submitStatus.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{submitStatus.message}</span>
            </div>
          )}
        </form>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={onTryAgain} className="btn-forest btn-forest-primary" style={{ flex: 1 }}>
            <RotateCcw size={16} /> Try Again
          </button>
          <button onClick={onChangeGame} className="btn-forest btn-forest-outline" style={{ flex: 1 }}>
            <LayoutGrid size={16} /> Select Game
          </button>
          <button onClick={onViewRecords} className="btn-forest btn-forest-outline">
            <Trophy size={16} /> Board
          </button>
        </div>
      </div>
    </div>
  );
};

const metricBoxStyle = {
  backgroundColor: 'var(--bg-deep)',
  padding: '1.25rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-moss)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const metricLabelStyle = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  letterSpacing: '0.05em',
  marginBottom: '0.2rem'
};

const subMetricStyle = {
  backgroundColor: 'var(--bg-secondary)',
  padding: '0.6rem',
  borderRadius: 'var(--radius-sm)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.1rem'
};
