import React, { useState, useMemo } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { wordSets } from '../../data/wordSets.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Compass, ChevronRight, RotateCcw } from 'lucide-react';

export const Pathfinder = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [level, setLevel] = useState(1);
  const [seed, setSeed] = useState(0);

  const targetText = useMemo(() => {
    switch (level) {
      case 1:
        return wordSets.beginner.slice(0, 30).join(' ');
      case 2:
        return wordSets.intermediate.slice(0, 35).join(' ');
      case 3:
        return wordSets.punctuation.slice(0, 25).join(' ');
      case 4:
        return wordSets.numbers.slice(0, 25).join(' ');
      case 5:
        return wordSets.expert.slice(0, 20).join(' ');
      default:
        return wordSets.intermediate.slice(0, 30).join(' ');
    }
  }, [level, seed]);

  const engine = useTypingEngine({
    targetText,
    mode: 'progressive',
    duration: 45,
    onComplete: (res) => {
      if (res.accuracy >= 90 && level < 5) {
        // Advance level!
        setLevel((prev) => prev + 1);
      }
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: () => setSeed((prev) => prev + 1)
  });

  const levelTitles = {
    1: 'Level 1: Common Short Words',
    2: 'Level 2: Multisyllabic Words',
    3: 'Level 3: Punctuation & Quotes',
    4: 'Level 4: Numeric Digits & Sequences',
    5: 'Level 5: Mixed Symbols & Technical Runes'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="forest-card" style={{
        display: 'flex',
        flexWrap: 'wrap',
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
            <Compass size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>PATHFINDER — PROGRESSIVE CHALLENGE</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {levelTitles[level]} (Achieve &ge; 90% accuracy to advance)
            </p>
          </div>
        </div>

        {/* Level Progression Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl);
                engine.restart();
              }}
              disabled={engine.isStarted}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid ' + (level === lvl ? 'var(--color-accent-luminous)' : 'var(--border-subtle)'),
                backgroundColor: level === lvl ? 'var(--color-moss)' : 'var(--bg-deep)',
                color: level === lvl ? 'var(--color-accent-luminous)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {lvl}
            </button>
          ))}

          <button onClick={engine.restart} className="btn-forest" style={{ padding: '0.4rem 0.8rem', marginLeft: '0.5rem' }}>
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
            mode: 'progressive',
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
