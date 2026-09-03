import { useState, useRef, useCallback, useEffect } from 'react';
import { calculateWPM, calculateCPM, calculateAccuracy, calculateConsistency, calculateGameScore } from '../utils/scoring.js';
import { useAudio } from './useAudio.js';
import { socketService } from '../services/socket.js';

const generateSessionId = () => Math.random().toString(36).substring(2, 15);

export const useTypingEngine = ({
  targetText = '',
  mode = 'classic',
  duration = 60,
  difficulty = 'intermediate',
  maxErrors = Infinity,
  onComplete,
  onRestart,
  onReachEnd
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedChars, setTypedChars] = useState([]); // array of { char, status: 'correct'|'error' }
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Stats State
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Precision Timer Refs
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(0);

  // Audio Hook
  const { playKeySound, playErrorSound, playSuccessSound } = useAudio();

  // Refs for zero-latency metrics and mistyped keys tracking
  const mistakesMapRef = useRef({}); // { 'r': 5, 't': 2 }
  const intervalWpmsRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const sessionIdRef = useRef(null);
  const lastUpdateRef = useRef(0);

  // Calculated Real-Time Metrics
  const wpm = calculateWPM(correctCount, elapsedTime);
  const cpm = calculateCPM(correctCount, elapsedTime);
  const accuracy = calculateAccuracy(correctCount, correctCount + incorrectCount);
  const consistency = calculateConsistency(intervalWpmsRef.current);
  const score = calculateGameScore({
    mode,
    wpm,
    accuracy,
    cpm,
    mistakes: incorrectCount,
    streak: maxStreak,
    difficulty
  });

  const finishGame = useCallback(() => {
    if (isCompleted) return;
    setIsCompleted(true);
    setIsStarted(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    playSuccessSound();

    const finalData = {
      mode,
      wpm,
      accuracy,
      cpm,
      score,
      duration: elapsedTime,
      totalChars: correctCount + incorrectCount,
      correctCount,
      incorrectCount,
      consistency,
      maxStreak,
      mistakesMap: mistakesMapRef.current,
      sessionId: sessionIdRef.current
    };

    socketService.emitSessionFinish(finalData);

    if (onComplete) {
      onComplete(finalData);
    }
  }, [
    isCompleted,
    mode,
    wpm,
    accuracy,
    cpm,
    score,
    elapsedTime,
    correctCount,
    incorrectCount,
    consistency,
    maxStreak,
    playSuccessSound,
    onComplete
  ]);

  // Restart Engine
  const restart = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setCurrentIndex(0);
    setTypedChars([]);
    setIsCompleted(false);
    setIsStarted(false);
    setIsPaused(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setStartTime(null);
    setElapsedTime(0);
    startTimeRef.current = null;
    accumulatedTimeRef.current = 0;
    mistakesMapRef.current = {};
    intervalWpmsRef.current = [];
    if (onRestart) onRestart();
  }, [onRestart]);

  // Pause / Resume
  const togglePause = useCallback(() => {
    if (!isStarted || isCompleted) return;
    setIsPaused((prev) => {
      const next = !prev;
      if (next) {
        // Pausing
        socketService.emitSessionPause({ sessionId: sessionIdRef.current });
        accumulatedTimeRef.current += (Date.now() - startTimeRef.current) / 1000;
      } else {
        // Resuming
        socketService.emitSessionResume({ sessionId: sessionIdRef.current });
        startTimeRef.current = Date.now();
      }
      return next;
    });
  }, [isStarted, isCompleted]);

  // Timer Tick Handler
  useEffect(() => {
    if (!isStarted || isPaused || isCompleted) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const currentElapsed = accumulatedTimeRef.current + (now - startTimeRef.current) / 1000;
      setElapsedTime(currentElapsed);

      // Sample WPM every second for consistency calculation
      if (Math.floor(currentElapsed) > intervalWpmsRef.current.length) {
        const currentWpm = calculateWPM(correctCount, currentElapsed);
        intervalWpmsRef.current.push(currentWpm);
      }

      // Check countdown timer completion if duration specified
      if (duration > 0 && currentElapsed >= duration) {
        clearInterval(timerIntervalRef.current);
        // Cap elapsed time to exact duration for final score
        setElapsedTime(duration);
        setTimeout(() => finishGame(), 0);
      }
    }, 100); // 100ms interval for smooth UI, math is purely timestamp based

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isStarted, isPaused, isCompleted, duration, correctCount, finishGame]);

  // Keyboard Event Dispatcher
  const handleKeyDown = useCallback(
    (e) => {
      if (isCompleted || isPaused) return;

      // Global Shortcuts: ESC = Restart, Ctrl+P = Pause
      if (e.key === 'Escape') {
        e.preventDefault();
        restart();
        return;
      }

      // Ignore modifier keys
      if (['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'CapsLock', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        return;
      }

      // Prevent default scroll behavior on Spacebar
      if (e.key === ' ') {
        e.preventDefault();
      }

      // Start timing on first valid keystroke
      if (!isStarted) {
        setIsStarted(true);
        setStartTime(Date.now());
        startTimeRef.current = Date.now();
        sessionIdRef.current = generateSessionId();
        socketService.emitSessionStart({ sessionId: sessionIdRef.current, mode });
      }

      const expectedChar = targetText[currentIndex];
      if (!expectedChar) return;

      // Handle Backspace
      if (e.key === 'Backspace') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
          setTypedChars((prev) => prev.slice(0, -1));
        }
        return;
      }

      // Single character typing comparison
      if (e.key.length === 1) {
        const isMatch = e.key === expectedChar;

        if (isMatch) {
          playKeySound();
          setCorrectCount((prev) => prev + 1);
          setStreak((prev) => {
            const nextStreak = prev + 1;
            setMaxStreak((max) => Math.max(max, nextStreak));
            return nextStreak;
          });
          setTypedChars((prev) => [...prev, { char: e.key, status: 'correct' }]);
        } else {
          playErrorSound();
          setIncorrectCount((prev) => {
            const next = prev + 1;
            if (next >= maxErrors) {
              setTimeout(() => finishGame(), 0);
            }
            return next;
          });
          setStreak(0);
          setTypedChars((prev) => [...prev, { char: e.key, expected: expectedChar, status: 'error' }]);

          // Track mistyped expected character
          mistakesMapRef.current[expectedChar] = (mistakesMapRef.current[expectedChar] || 0) + 1;
        }

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        // Check if reached end of target text
        if (nextIndex >= targetText.length) {
          if (duration > 0 && elapsedTime < duration && onReachEnd) {
            onReachEnd();
          } else {
            setTimeout(() => finishGame(), 0);
          }
        }

        // Throttle session updates to backend (max once per second)
        const now = Date.now();
        if (now - lastUpdateRef.current > 1000) {
           lastUpdateRef.current = now;
           socketService.emitSessionUpdate({
             sessionId: sessionIdRef.current,
             elapsedTime,
             wpm: calculateWPM(isMatch ? correctCount + 1 : correctCount, elapsedTime || 1),
             accuracy: calculateAccuracy(isMatch ? correctCount + 1 : correctCount, correctCount + incorrectCount + 1),
             cpm: calculateCPM(isMatch ? correctCount + 1 : correctCount, elapsedTime || 1)
           });
        }
      }
    },
    [
      isCompleted,
      isPaused,
      isStarted,
      targetText,
      currentIndex,
      maxErrors,
      playKeySound,
      playErrorSound,
      restart,
      finishGame
    ]
  );

  // Attach Window Keydown Listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    currentIndex,
    typedChars,
    isCompleted,
    isStarted,
    isPaused,
    correctCount,
    incorrectCount,
    streak,
    maxStreak,
    elapsedTime,
    remainingTime: Math.max(0, duration - elapsedTime),
    wpm,
    cpm,
    accuracy,
    consistency,
    score,
    restart,
    togglePause,
    finishGame,
    mistakesMap: mistakesMapRef.current
  };
};
