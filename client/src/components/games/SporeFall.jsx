import React, { useState, useEffect, useRef, useCallback } from 'react';
import { wordSets } from '../../data/wordSets.js';
import { useAudio } from '../../hooks/useAudio.js';
import { ResultCard } from '../typing/ResultCard.jsx';
import { Sparkles, Heart, RotateCcw, Flame } from 'lucide-react';

export const SporeFall = ({
  onFinishSession,
  onSelectAnotherGame,
  onViewRecords,
  profileName,
  onUpdateProfileName
}) => {
  const [spores, setSpores] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sporesPopped, setSporesPopped] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTime, setGameTime] = useState(0);

  const { playKeySound, playErrorSound, playSuccessSound } = useAudio();

  const gameLoopRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Spawn new glowing spore word
  const spawnSpore = useCallback(() => {
    if (isGameOver) return;
    const pool = wordSets.natureForestTheme;
    const word = pool[Math.floor(Math.random() * pool.length)];

    const newSpore = {
      id: `spore-${Date.now()}-${Math.random()}`,
      word,
      x: Math.floor(Math.random() * 70) + 15, // 15% to 85% width
      y: -10, // top%
      speed: Math.random() * 0.25 + 0.15 // descending speed%
    };

    setSpores((prev) => [...prev, newSpore]);
  }, [isGameOver]);

  // Start / Restart Game
  const startGame = () => {
    setSpores([]);
    setCurrentInput('');
    setScore(0);
    setLives(3);
    setCombo(0);
    setMaxCombo(0);
    setSporesPopped(0);
    setIsGameOver(false);
    setIsPlaying(true);
    setGameTime(0);
    startTimeRef.current = Date.now();
  };

  // Main Game Loop: Update Spores Position & Check Misses
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    gameLoopRef.current = setInterval(() => {
      setGameTime((prev) => prev + 1);

      setSpores((prevSpores) => {
        const updated = [];
        let missedCount = 0;

        prevSpores.forEach((spore) => {
          const nextY = spore.y + spore.speed;
          if (nextY >= 90) {
            // Reached forest bed! Missed spore!
            missedCount++;
          } else {
            updated.push({ ...spore, y: nextY });
          }
        });

        if (missedCount > 0) {
          playErrorSound();
          setCombo(0);
          setLives((prevLives) => {
            const nextLives = prevLives - missedCount;
            if (nextLives <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
              playSuccessSound();
            }
            return Math.max(0, nextLives);
          });
        }

        return updated;
      });
    }, 100);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isGameOver, playErrorSound, playSuccessSound]);

  // Spore Spawning Interval
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    // Spawn every 2.5s initially, accelerating over time
    const intervalTime = Math.max(1000, 2500 - Math.floor(gameTime / 10) * 200);
    spawnTimerRef.current = setInterval(spawnSpore, intervalTime);

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [isPlaying, isGameOver, gameTime, spawnSpore]);

  // Handle Keystrokes for Typing Spores
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsGameOver(true);
        setIsPlaying(false);
        return;
      }

      if (e.key === 'Backspace') {
        setCurrentInput((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        playKeySound();
        const nextInput = (currentInput + e.key).toLowerCase();
        setCurrentInput(nextInput);

        // Check if input matches any active descending spore word
        const matchIndex = spores.findIndex((s) => s.word.toLowerCase() === nextInput);

        if (matchIndex !== -1) {
          // Matched & Popped Spore!
          playSuccessSound();
          const poppedSpore = spores[matchIndex];
          setSpores((prev) => prev.filter((_, idx) => idx !== matchIndex));
          setCurrentInput('');
          setSporesPopped((prev) => prev + 1);

          setCombo((prevCombo) => {
            const nextCombo = prevCombo + 1;
            setMaxCombo((m) => Math.max(m, nextCombo));

            // Score boost: Base 50 + Combo Bonus
            const addedScore = 50 + nextCombo * 10;
            setScore((s) => s + addedScore);
            return nextCombo;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver, currentInput, spores, playKeySound, playSuccessSound]);

  // Trigger game complete handler
  useEffect(() => {
    if (isGameOver && sporesPopped > 0 && onFinishSession) {
      const elapsed = Math.max(1, Math.round((Date.now() - (startTimeRef.current || Date.now())) / 1000));
      const calculatedWpm = Math.round((sporesPopped * 5) / (elapsed / 60));
      onFinishSession({
        mode: 'spore_fall',
        wpm: calculatedWpm,
        accuracy: 95,
        cpm: calculatedWpm * 5,
        score,
        duration: elapsed
      });
    }
  }, [isGameOver, sporesPopped, score, onFinishSession]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header Card */}
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
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>SPORE FALL</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Type descending glowing spore words before they hit the forest floor!
            </p>
          </div>
        </div>

        {/* Game Stats Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Lives */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                size={20}
                style={{
                  color: i < lives ? 'var(--color-error)' : 'var(--text-muted)',
                  fill: i < lives ? 'var(--color-error)' : 'transparent'
                }}
              />
            ))}
          </div>

          {/* Combo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-warm-highlight)', fontWeight: 700 }}>
            <Flame size={18} />
            <span>{combo}x Combo</span>
          </div>

          {/* Score */}
          <div className="font-mono text-luminous" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            {score.toLocaleString()} PTS
          </div>

          <button onClick={startGame} className="btn-forest btn-forest-primary" style={{ padding: '0.4rem 0.85rem' }}>
            <RotateCcw size={16} /> {isPlaying ? 'Restart' : 'Start'}
          </button>
        </div>
      </div>

      {/* Main Falling Game Surface */}
      <div className="forest-card" style={{
        position: 'relative',
        height: '420px',
        backgroundColor: 'var(--bg-deep)',
        border: '1px solid var(--border-moss)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}>
        {/* Start Game Prompt Overlay */}
        {!isPlaying && !isGameOver && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            backgroundColor: 'rgba(7, 18, 14, 0.85)',
            zIndex: 10
          }}>
            <Sparkles size={48} style={{ color: 'var(--color-accent-luminous)' }} />
            <h2 className="heading-display" style={{ fontSize: '1.8rem' }}>SPORE FALL GROVE</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', textAlign: 'center' }}>
              Glowing spores descend through the twilight canopy. Type their names to dissolve them!
            </p>
            <button onClick={startGame} className="btn-forest btn-forest-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              START GAME
            </button>
          </div>
        )}

        {/* Descending Glowing Spores */}
        {spores.map((spore) => {
          const isTargeted = currentInput && spore.word.toLowerCase().startsWith(currentInput);
          return (
            <div
              key={spore.id}
              style={{
                position: 'absolute',
                top: `${spore.y}%`,
                left: `${spore.x}%`,
                transform: 'translateX(-50%)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isTargeted ? 'var(--color-moss)' : 'var(--bg-surface)',
                border: '1px solid ' + (isTargeted ? 'var(--color-accent-luminous)' : 'var(--border-moss)'),
                boxShadow: isTargeted ? 'var(--glow-moss)' : 'var(--glow-soft)',
                color: isTargeted ? 'var(--color-accent-luminous)' : 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'top 0.1s linear, background-color 0.15s ease'
              }}
            >
              {spore.word}
            </div>
          );
        })}

        {/* Bottom Forest Floor Line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '24px',
          backgroundColor: 'var(--color-moss)',
          borderTop: '2px solid var(--color-accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-primary)',
          letterSpacing: '0.1em'
        }}>
          FOREST BED — DANGER ZONE
        </div>

        {/* Current Active Input Bar */}
        {isPlaying && (
          <div style={{
            position: 'absolute',
            bottom: '35px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--color-accent-primary)',
            padding: '0.4rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-warm-highlight)',
            fontWeight: 700,
            boxShadow: 'var(--glow-soft)'
          }}>
            {currentInput || <span style={{ color: 'var(--text-muted)' }}>type word...</span>}
          </div>
        )}
      </div>

      {isGameOver && (
        <ResultCard
          result={{
            mode: 'spore_fall',
            wpm: Math.round((sporesPopped * 5) / (Math.max(1, gameTime) / 60)),
            accuracy: 95,
            cpm: Math.round((sporesPopped * 25) / (Math.max(1, gameTime) / 60)),
            score,
            duration: gameTime,
            totalChars: sporesPopped * 5,
            incorrectCount: 3 - lives,
            consistency: 90
          }}
          onTryAgain={startGame}
          onChangeGame={onSelectAnotherGame}
          onViewRecords={onViewRecords}
          profileName={profileName}
          onUpdateProfileName={onUpdateProfileName}
        />
      )}
    </div>
  );
};
