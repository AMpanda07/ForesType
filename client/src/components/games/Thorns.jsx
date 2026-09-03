import React, { useState, useMemo } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { getRandomWords } from '../../data/wordSets.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Flame, ShieldAlert, RotateCcw } from 'lucide-react';

export const Thorns = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [seed, setSeed] = useState(0);

  const targetText = useMemo(() => {
    return getRandomWords(60, 'advanced').join(' ');
  }, [seed]);

  const engine = useTypingEngine({
    targetText,
    mode: 'word_survival',
    duration: 45,
    maxErrors: 1, // Single error punishment threshold
    onComplete: (res) => {
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: () => setSeed((prev) => prev + 1)
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="forest-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderColor: 'var(--color-error)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-error-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-error)'
          }}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>THORN SURVIVAL — ZERO MISTAKE ZONE</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              A single typo ends the run immediately. How long can you survive?
            </p>
          </div>
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
        errors={engine.incorrectCount}
        maxErrors={1}
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
            mode: 'word_survival',
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
