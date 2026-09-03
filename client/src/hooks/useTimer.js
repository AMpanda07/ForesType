import { useState, useRef, useCallback, useEffect } from 'react';

export const useTimer = ({ initialTime = 60, mode = 'countdown', onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const intervalWpmsRef = useRef([]);

  const startTimer = useCallback(() => {
    if (isRunning && !isPaused) return;
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
  }, [isRunning, isPaused]);

  const pauseTimer = useCallback(() => {
    if (!isRunning || isPaused) return;
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [isRunning, isPaused]);

  const resumeTimer = useCallback(() => {
    if (!isRunning || !isPaused) return;
    setIsPaused(false);
  }, [isRunning, isPaused]);

  const resetTimer = useCallback(
    (newInitialTime = initialTime) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRunning(false);
      setIsPaused(false);
      setTimeLeft(newInitialTime);
      setElapsedTime(0);
      intervalWpmsRef.current = [];
    },
    [initialTime]
  );

  const addWpmSample = useCallback((currentWpm) => {
    if (typeof currentWpm === 'number' && !isNaN(currentWpm)) {
      intervalWpmsRef.current.push(currentWpm);
    }
  }, []);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);

      if (mode === 'countdown') {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      } else {
        // Stopwatch count-up mode
        setTimeLeft((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isPaused, mode, onComplete]);

  return {
    timeLeft,
    elapsedTime,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addWpmSample,
    intervalWpms: intervalWpmsRef.current
  };
};
