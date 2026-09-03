import React, { useState, useMemo } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { getRandomWords } from '../../data/wordSets.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Zap, Flame, RotateCcw } from 'lucide-react';

export const ForestRush = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [seed, setSeed] = useState(0);

  const targetText = useMemo(() => {
    return getRandomWords(120, 'intermediate').join(' ');
  }, [seed]);

  const engine = useTypingEngine({
    targetText,
    mode: 'speed_rush',
    duration: 30,
    onComplete: (res) => {
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: () => setSeed((prev) => prev + 1)
  });

  const multiplier = Math.min(4.0, 1.0 + Math.floor(engine.streak / 10) * 0.5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Rush Header Banner */}
      <div className="forest-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderColor: 'var(--color-accent-luminous)',
        boxShadow: 'var(--glow-moss)'
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
            color: 'var(--color-warm-highlight)'
          }}>
            <Zap size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>FOREST RUSH</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              30-Second Speed Burst — Maintain high streak for score multipliers!
            </p>
          </div>
        </div>

        {/* Multiplier Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--bg-deep)',
          padding: '0.4rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-warm-highlight)',
          color: 'var(--color-warm-highlight)',
          fontWeight: 700,
          fontSize: '1rem'
        }}>
          <Flame size={18} />
          <span>{multiplier.toFixed(1)}x MULTIPLIER</span>
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
            mode: 'speed_rush',
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
