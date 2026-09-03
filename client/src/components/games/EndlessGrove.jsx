import React, { useState, useMemo } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { getRandomWords } from '../../data/wordSets.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Infinity as InfinityIcon, ShieldAlert, StopCircle, RotateCcw } from 'lucide-react';

export const EndlessGrove = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [seed, setSeed] = useState(0);

  const targetText = useMemo(() => {
    return [
      ...getRandomWords(40, 'beginner'),
      ...getRandomWords(40, 'intermediate'),
      ...getRandomWords(40, 'advanced'),
      ...getRandomWords(40, 'expert')
    ].join(' ');
  }, [seed]);

  const engine = useTypingEngine({
    targetText,
    mode: 'endless',
    duration: 0, // 0 = endless / stopwatch
    maxErrors: 10,
    onComplete: (res) => {
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: () => setSeed((prev) => prev + 1)
  });

  // Calculate current difficulty tier based on typed characters
  const currentTier =
    engine.currentIndex < 150
      ? 'Easy 🌱'
      : engine.currentIndex < 350
      ? 'Medium 🌿'
      : engine.currentIndex < 600
      ? 'Hard 🌲'
      : 'Expert 🔮';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="forest-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem'
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
            <InfinityIcon size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>ENDLESS GROVE</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Endless mode — Difficulty ramps up continuously. Allowed mistakes: 10 max.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            backgroundColor: 'var(--bg-deep)',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-moss)',
            color: 'var(--color-accent-luminous)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>
            Tier: {currentTier}
          </div>

          {engine.isStarted && !engine.isCompleted && (
            <button onClick={engine.finishGame} className="btn-forest btn-forest-outline" style={{ color: 'var(--color-error)' }}>
              <StopCircle size={16} /> Stop Run
            </button>
          )}

          <button onClick={engine.restart} className="btn-forest" style={{ padding: '0.4rem 0.8rem' }}>
            <RotateCcw size={16} /> Restart
          </button>
        </div>
      </div>

      <StatsHeader
        wpm={engine.wpm}
        accuracy={engine.accuracy}
        cpm={engine.cpm}
        time={engine.elapsedTime}
        timeMode="elapsed"
        consistency={engine.consistency}
        streak={engine.streak}
        errors={engine.incorrectCount}
        maxErrors={10}
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
            mode: 'endless',
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
