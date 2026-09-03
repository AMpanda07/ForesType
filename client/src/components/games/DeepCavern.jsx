import React, { useState, useMemo } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { getRandomWords } from '../../data/wordSets.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Target, ShieldAlert, RotateCcw } from 'lucide-react';

export const DeepCavern = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [maxErrors, setMaxErrors] = useState(3);
  const [seed, setSeed] = useState(0);

  const targetText = useMemo(() => {
    return getRandomWords(80, 'advanced').join(' ');
  }, [seed]);

  const engine = useTypingEngine({
    targetText,
    mode: 'accuracy',
    duration: 60,
    maxErrors,
    onComplete: (res) => {
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: () => setSeed((prev) => prev + 1)
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="forest-card" style={{
        display: 'flex',
        flexWrap: 'wrap',
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
            <Target size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>DEEP CAVERN — ACCURACY FOCUS</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Correct char: +10 pts | Error: -20 pts | Game over at {maxErrors} errors!
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Max Mistakes Allowed:</span>
          {[1, 3, 5].map((eCount) => (
            <button
              key={eCount}
              onClick={() => {
                setMaxErrors(eCount);
                engine.restart();
              }}
              disabled={engine.isStarted}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid ' + (maxErrors === eCount ? 'var(--color-error)' : 'var(--border-subtle)'),
                backgroundColor: maxErrors === eCount ? 'var(--color-error-bg)' : 'transparent',
                color: maxErrors === eCount ? 'var(--color-error)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {eCount}
            </button>
          ))}

          <button onClick={engine.restart} className="btn-forest" style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}>
            <RotateCcw size={16} /> Restart
          </button>
        </div>
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
        maxErrors={maxErrors}
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
            mode: 'accuracy',
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
