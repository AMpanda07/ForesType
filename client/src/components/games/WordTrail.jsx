import React, { useState, useEffect } from 'react';
import { useTypingEngine } from '../../hooks/useTypingEngine.js';
import { StatsHeader } from '../typing/StatsHeader.jsx';
import { TypingDisplay } from '../typing/TypingDisplay.jsx';
import { ResultCard } from '../typing/ResultCard.jsx';
import { VirtualKeyboard } from '../keyboard/VirtualKeyboard.jsx';
import { RotateCcw, Keyboard, Settings2 } from 'lucide-react';

export const WordTrail = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState('intermediate');
  const [showKeyboard, setShowKeyboard] = useState(true);

  const [targetText, setTargetText] = useState("Loading paragraph...");
  const [wordPoolSeed, setWordPoolSeed] = useState(0);

  const processTextByDifficulty = (text, diff) => {
    let processed = text;
    if (diff === 'beginner') {
      processed = processed.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ');
    } else if (diff === 'intermediate') {
      processed = processed.toLowerCase();
    }
    return processed.trim();
  };

  const fetchContent = async (append = false) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/content/paragraph`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (data.text) {
        const processed = processTextByDifficulty(data.text, difficulty);
        setTargetText((prev) => append ? prev + ' ' + processed : processed);
      }
    } catch (err) {
      const fallbacks = [
        "The dark forest stretches infinitely before you, its ancient trees whispering secrets of forgotten times.",
        "Glowing fungi illuminate the path ahead, casting long, twisting shadows across the damp earth.",
        "Every step is an echo in the deep silence, a reminder that you are not the first to walk this path.",
        "Ancient runes carved into the stone walls hint at a magic that has long since faded from the world above.",
        "A subterranean river rushes past, its dark waters hiding creatures that have never seen the light of the sun."
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      const fallback = processTextByDifficulty(randomFallback, difficulty);
      setTargetText((prev) => append ? prev + ' ' + fallback : fallback);
    }
  };

  useEffect(() => {
    fetchContent(false);
  }, [difficulty, wordPoolSeed]);

  const loadMoreText = () => {
    fetchContent(true);
  };

  const handleRestart = () => {
    setWordPoolSeed((prev) => prev + 1);
  };

  const engine = useTypingEngine({
    targetText,
    mode: 'classic',
    duration,
    difficulty,
    onComplete: (res) => {
      if (onFinishSession) onFinishSession(res);
    },
    onRestart: handleRestart,
    onReachEnd: loadMoreText
  });

  const lastTyped = engine.typedChars[engine.typedChars.length - 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Game Config Controls */}
      <div className="forest-card" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0.85rem 1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings2 size={18} style={{ color: 'var(--color-accent-primary)' }} />
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Word Trail Config:</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
          {/* Duration Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration:</span>
            {[15, 30, 60, 120].map((t) => (
              <button
                key={t}
                onClick={(e) => {
                  setDuration(t);
                  engine.restart();
                  e.currentTarget.blur();
                }}
                disabled={engine.isStarted}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid ' + (duration === t ? 'var(--color-accent-primary)' : 'var(--border-subtle)'),
                  backgroundColor: duration === t ? 'var(--bg-secondary)' : 'transparent',
                  color: duration === t ? 'var(--color-accent-luminous)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {t}s
              </button>
            ))}
          </div>

          {/* Difficulty Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Difficulty:</span>
            {['beginner', 'intermediate', 'advanced', 'expert'].map((d) => (
              <button
                key={d}
                onClick={(e) => {
                  setDifficulty(d);
                  engine.restart();
                  e.currentTarget.blur();
                }}
                disabled={engine.isStarted}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid ' + (difficulty === d ? 'var(--color-accent-primary)' : 'var(--border-subtle)'),
                  backgroundColor: difficulty === d ? 'var(--bg-secondary)' : 'transparent',
                  color: difficulty === d ? 'var(--color-accent-luminous)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {d}
              </button>
            ))}
          </div>

          <button
            onClick={(e) => {
              setShowKeyboard((prev) => !prev);
              e.currentTarget.blur();
            }}
            className="btn-forest btn-forest-outline"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
          >
            <Keyboard size={14} /> Keyboard
          </button>

          <button
            onClick={(e) => {
              engine.restart();
              e.currentTarget.blur();
            }}
            className="btn-forest"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
          >
            <RotateCcw size={14} /> Restart
          </button>
        </div>
      </div>

      {/* Live Stats Header */}
      <StatsHeader
        wpm={engine.wpm}
        accuracy={engine.accuracy}
        cpm={engine.cpm}
        time={engine.remainingTime}
        timeMode="remaining"
        consistency={engine.consistency}
        streak={engine.streak}
      />

      {/* Main Typing Display */}
      <TypingDisplay
        targetText={targetText}
        currentIndex={engine.currentIndex}
        typedChars={engine.typedChars}
        isStarted={engine.isStarted}
        isPaused={engine.isPaused}
        isCompleted={engine.isCompleted}
      />

      {/* Interactive Virtual Keyboard */}
      {showKeyboard && (
        <VirtualKeyboard
          targetChar={targetText[engine.currentIndex] || ''}
          lastTyped={lastTyped}
        />
      )}

      {/* Result Modal Screen */}
      {engine.isCompleted && (
        <ResultCard
          result={{
            mode: 'classic',
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
