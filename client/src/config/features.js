export const PHASE_STATUS = {
  currentPhase: 1,

  phase1: {
      home: true,
      practice: true,
      records: true,
      stats: true,
      about: true,
      settings: true,
      corePractice: true
  },

  phase2: {
      games: false
  },

  phase3: {
      quotes: false
  },

  phase4: {
      login: true,
      register: true,
      accounts: true,
      authentication: true,
      auth: true,
      profile: true
  },

  phase5: {
      themes: false,
      advancedThemes: false,
      themeApi: false
  }
};

export const isFeatureEnabled = (featureId) => {
  const allFeatures = {
    ...PHASE_STATUS.phase1,
    ...PHASE_STATUS.phase2,
    ...PHASE_STATUS.phase3,
    ...PHASE_STATUS.phase4,
    ...PHASE_STATUS.phase5
  };
  return allFeatures[featureId] === true;
};
