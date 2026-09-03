import React, { useState, useMemo } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { getRandomWords } from '../../data/wordSets.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Target, Activity, RotateCcw } from 'lucide-react';

export const PrecisionChallenge = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [seed, setSeed] = useState(0);

  const targetText = useMemo(() => {
    return getRandomWords(80, 'intermediate').join(' ');
  }, [seed]);

  const engine = useTypingEngine({
    targetText,
    mode: 'precision',
    duration: 60,
    onComplete: (res) => {
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: () => setSeed((prev) => prev + 1)
  });

  // Calculate top 3 weakest mistyped keys from mistakesMap
  const mistakeEntries = Object.entries(engine.mistakesMap || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="forest-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderColor: 'var(--color-accent-luminous)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent-luminous)'
          }}>
            <Activity size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>PRECISION & DIAGNOSTICS</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Error reduction challenge — Identifies your weakest keys and error streaks.
            </p>
          </div>
        </div>

        {/* Live Diagnostics Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-deep)',
          padding: '0.4rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-moss)',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>Weakest Keys:</span>
          <span className="font-mono text-warm" style={{ fontWeight: 700 }}>
            {mistakeEntries.length > 0
              ? mistakeEntries.map(([k]) => k.toUpperCase()).join(' / ')
              : 'None yet ✨'}
          </span>
        </div>

        <button onClick={engine.restart} className="btn-forest" style={{ padding: '0.4rem 0.8rem' }}>
          <RotateCcw size={16} /> Restart
        </button>
      </div>

      <StatsHeader
        wpm={engine.wpm}
        accuracy={engine.accuracy}
        cpm={engine.cpm}
        time={engine.remainingTime}
        timeMode="remaining"
        consistency={engine.consistency}
        streak={engine.streak}
      />

      <TypingDisplay
        targetText={targetText}
        currentIndex={engine.currentIndex}
        typedChars={engine.typedChars}
        isStarted={engine.isStarted}
        isPaused={engine.isPaused}
        isCompleted={engine.isCompleted}
      />

      {engine.isCompleted && (
        <ResultCard
          result={{
            mode: 'precision',
            wpm: engine.wpm,
            accuracy: engine.accuracy,
            cpm: engine.cpm,
            score: engine.score,
            duration: engine.elapsedTime,
            totalChars: engine.correctCount + engine.incorrectCount,
            incorrectCount: engine.incorrectCount,
            consistency: engine.consistency
          }}
          onTryAgain={engine.restart}
          onChangeGame={onSelectAnotherGame}
          onViewRecords={onViewRecords}
          profileName={profileName}
          onUpdateProfileName={onUpdateProfileName}
        />
      )}
    </div>
  );
};
