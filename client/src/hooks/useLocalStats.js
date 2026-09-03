import { useState, useCallback, useEffect } from 'react';
import { getLocalData, saveLocalData, recordSessionResult, clearLocalHistory } from '../utils/storage.js';

export const useLocalStats = () => {
  const [localData, setLocalData] = useState(() => getLocalData());

  const refreshData = useCallback(() => {
    setLocalData(getLocalData());
  }, []);

  const updateProfileName = useCallback((name) => {
    const cleanName = (name || '').trim().slice(0, 20);
    const updated = getLocalData();
    updated.profile = { ...(updated.profile || {}), name: cleanName };
    saveLocalData(updated);
    setLocalData(updated);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    const updated = getLocalData();
    updated.settings = { ...(updated.settings || {}), ...newSettings };
    saveLocalData(updated);
    setLocalData(updated);
  }, []);

  const saveSession = useCallback((sessionResult) => {
    const { updatedData, isPersonalBest } = recordSessionResult(sessionResult);
    setLocalData(updatedData);
    return { updatedData, isPersonalBest };
  }, []);

  const resetAllStats = useCallback(() => {
    const fresh = clearLocalHistory();
    setLocalData(fresh);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'forest_type_user_data_v1') {
        refreshData();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshData]);

  return {
    localData,
    profileName: localData.profile?.name || 'Wanderer',
    settings: localData.settings || { theme: 'light', showErrors: true, caretStyle: 'block' },
    stats: localData.stats || {},
    gameRecords: localData.gameRecords || {},
    recentSessions: localData.recentSessions || [],
    updateProfileName,
    updateSettings,
    saveSession,
    resetAllStats,
    refreshData
  };
};
