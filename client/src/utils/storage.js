/**
 * Safe local storage manager with schema versioning & error tolerance
 */
const STORAGE_KEY = 'forest_type_user_data_v1';

const INITIAL_DATA = {
  version: 1,
  profile: {
    name: 'Wanderer'
  },
  settings: {
    soundEnabled: false,
    fontSize: 'normal',
    theme: 'dark-forest'
  },
  stats: {
    totalSessions: 0,
    totalPracticeTime: 0, // seconds
    totalCharactersTyped: 0,
    totalErrors: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    bestCpm: 0,
    weakKeys: {} // { 'r': 12, 't': 8 }
  },
  gameRecords: {
    classic: { bestWpm: 0, bestScore: 0 },
    speed_rush: { bestWpm: 0, bestScore: 0 },
    accuracy: { bestWpm: 0, bestScore: 0 },
    endless: { bestWpm: 0, bestScore: 0 },
    spore_fall: { bestWpm: 0, bestScore: 0 },
    word_survival: { bestWpm: 0, bestScore: 0 },
    precision: { bestWpm: 0, bestScore: 0 },
    progressive: { bestWpm: 0, bestScore: 0 },
    keyboard_trainer: { bestWpm: 0, bestScore: 0 }
  },
  recentSessions: []
};

export const getLocalData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_DATA };

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
      console.warn('⚠️ Legacy or invalid local data found. Re-initializing schema safely.');
      return { ...INITIAL_DATA };
    }

    return {
      ...INITIAL_DATA,
      ...parsed,
      stats: { ...INITIAL_DATA.stats, ...(parsed.stats || {}) },
      gameRecords: { ...INITIAL_DATA.gameRecords, ...(parsed.gameRecords || {}) },
      recentSessions: Array.isArray(parsed.recentSessions) ? parsed.recentSessions : []
    };
  } catch (err) {
    console.error('❌ Failed to load localStorage data:', err);
    return { ...INITIAL_DATA };
  }
};

export const saveLocalData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('❌ Failed to save to localStorage:', err);
    return false;
  }
};

export const recordSessionResult = (session) => {
  const current = getLocalData();
  const { mode, wpm, accuracy, cpm, score, duration, totalChars = 0, errors = 0, mistakesMap = {} } = session;

  const newStats = { ...current.stats };
  newStats.totalSessions += 1;
  newStats.totalPracticeTime += duration || 0;
  newStats.totalCharactersTyped += totalChars;
  newStats.totalErrors += errors;

  if (wpm > newStats.bestWpm) newStats.bestWpm = wpm;
  if (accuracy > newStats.bestAccuracy) newStats.bestAccuracy = accuracy;
  if (cpm > newStats.bestCpm) newStats.bestCpm = cpm;

  // Track mistyped keys
  const weakKeys = { ...(newStats.weakKeys || {}) };
  Object.entries(mistakesMap).forEach(([char, count]) => {
    weakKeys[char] = (weakKeys[char] || 0) + count;
  });
  newStats.weakKeys = weakKeys;

  // Game specific bests
  const gameRecords = { ...current.gameRecords };
  const currentModeRecord = gameRecords[mode] || { bestWpm: 0, bestScore: 0 };
  gameRecords[mode] = {
    bestWpm: Math.max(currentModeRecord.bestWpm || 0, wpm),
    bestScore: Math.max(currentModeRecord.bestScore || 0, score)
  };

  // Recent Sessions (Keep last 50)
  const sessionEntry = {
    id: `sess-${Date.now()}`,
    date: new Date().toISOString(),
    mode,
    wpm,
    accuracy,
    cpm,
    score,
    duration
  };

  const recentSessions = [sessionEntry, ...current.recentSessions].slice(0, 50);

  const updatedData = {
    ...current,
    stats: newStats,
    gameRecords,
    recentSessions
  };

  saveLocalData(updatedData);
  return { updatedData, isPersonalBest: wpm > (current.stats.bestWpm || 0) };
};

export const clearLocalHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { ...INITIAL_DATA };
  } catch (err) {
    console.error('❌ Failed to clear localStorage:', err);
    return getLocalData();
  }
};
