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
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customInputValue, setCustomInputValue] = useState(60);

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

  const handleCustomTimeSubmit = (e) => {
    e.preventDefault();
    let val = parseInt(customInputValue, 10);
    if (isNaN(val) || val <= 0) val = 60;
    setDuration(val);
    engine.restart();
    setIsCustomTime(false);
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem 0', position: 'relative', zIndex: 10 }}>
      
      {/* Top Label */}
      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        TIME MODE • {duration} SECONDS
      </div>

      {/* Live Stats Header */}
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <StatsHeader
          wpm={engine.wpm}
          accuracy={engine.accuracy}
          cpm={engine.cpm}
          time={Math.ceil(engine.remainingTime)}
          timeMode="remaining"
        />
      </div>

      {/* Main Typing Display inside Glass Panel */}
      <div className="glass-panel" style={{ width: '100%', maxWidth: '900px', padding: '3rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TypingDisplay
          targetText={targetText}
          currentIndex={engine.currentIndex}
          typedChars={engine.typedChars}
          isStarted={engine.isStarted}
          isPaused={engine.isPaused}
          isCompleted={engine.isCompleted}
        />
      </div>

      {/* Time Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '-0.5rem' }}>
        {[15, 30, 60, 120, 'Custom'].map((t) => (
          <button
            key={t}
            onClick={(e) => {
              if (t !== 'Custom') {
                setDuration(t);
                setIsCustomTime(false);
                engine.restart();
              } else {
                setIsCustomTime(true);
              }
              e.currentTarget.blur();
            }}
            disabled={engine.isStarted && t !== 'Custom'}
            className={`time-pill ${duration === t && !isCustomTime ? 'active' : ''} ${t === 'Custom' && isCustomTime ? 'active' : ''}`}
          >
            {t}{t !== 'Custom' ? 's' : ''}
          </button>
        ))}

        {isCustomTime && (
          <form onSubmit={handleCustomTimeSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="number" 
              value={customInputValue}
              onChange={(e) => setCustomInputValue(e.target.value)}
              style={{ width: '60px', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center' }}
              min="1"
              autoFocus
            />
            <button type="submit" className="time-pill" style={{ padding: '0.25rem 0.5rem' }}>OK</button>
          </form>
        )}
      </div>

      {/* Bottom Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '900px', marginTop: '1rem' }}>
        <button
          className="glass-panel"
          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', background: 'var(--glass-bg)' }}
        >
          <span style={{ fontSize: '1.2rem' }}>🔊</span> Sound
        </button>
        
        <button
          onClick={(e) => {
            engine.restart();
            e.currentTarget.blur();
          }}
          className="glass-panel"
          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', background: 'var(--glass-bg)' }}
        >
          <RotateCcw size={18} /> Restart
        </button>
      </div>

      {/* Result Modal Screen */}
      {engine.isCompleted && (
        <ResultCard
          result={{
            mode: 'classic',
            wpm: engine.wpm,
            accuracy: engine.accuracy,
            cpm: engine.cpm,
            score: engine.score,
            duration: Math.ceil(engine.elapsedTime),
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
