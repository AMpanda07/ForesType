import React, { useState, useMemo } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { DRILL_CATEGORIES } from '../../data/keyboardMap.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { VirtualKeyboard } from '../keyboard/VirtualKeyboard.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Keyboard, RotateCcw } from 'lucide-react';

export const KeyboardRunes = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [selectedDrill, setSelectedDrill] = useState('home_row');
  const [seed, setSeed] = useState(0);

  const activeDrill = DRILL_CATEGORIES.find((d) => d.id === selectedDrill) || DRILL_CATEGORIES[0];

  // Generate 80 characters of practice text from drill character pool
  const targetText = useMemo(() => {
    const chars = activeDrill.chars.split('');
    let result = '';
    for (let i = 0; i < 80; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      result += char;
      if (i > 0 && i % 5 === 0 && i !== 79) {
        result += ' ';
      }
    }
    return result;
  }, [activeDrill, seed]);

  const engine = useTypingEngine({
    targetText,
    mode: 'keyboard_trainer',
    duration: 60,
    onComplete: (res) => {
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: () => setSeed((prev) => prev + 1)
  });

  const lastTyped = engine.typedChars[engine.typedChars.length - 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Category Bar */}
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
            <Keyboard size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>KEYBOARD RUNES — REGION DRILLS</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Master specific keyboard rows, hands, and finger positioning.
            </p>
          </div>
        </div>

        <button onClick={engine.restart} className="btn-forest" style={{ padding: '0.4rem 0.8rem' }}>
          <RotateCcw size={16} /> Restart
        </button>
      </div>

      {/* Drill Category Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        backgroundColor: 'var(--bg-deep)',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-moss)'
      }}>
        {DRILL_CATEGORIES.map((category) => {
          const isActive = selectedDrill === category.id;
          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedDrill(category.id);
                engine.restart();
              }}
              disabled={engine.isStarted}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid ' + (isActive ? 'var(--color-accent-primary)' : 'var(--border-subtle)'),
                backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                color: isActive ? 'var(--color-accent-luminous)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {category.name}
            </button>
          );
        })}
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

      <VirtualKeyboard
        targetChar={targetText[engine.currentIndex] || ''}
        lastTyped={lastTyped}
        showFingerZones={true}
      />

      {engine.isCompleted && (
        <ResultCard
          result={{
            mode: 'keyboard_trainer',
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
