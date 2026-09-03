export const calculateExp = (result, user) => {
  const { wpm, accuracy, duration, isAbandoned } = result;
  
  if (isAbandoned) {
    return -50;
  }

  let exp = 50; // Base EXP

  // WPM contribution
  if (user.stats.averageWpm > 0 && wpm >= user.stats.averageWpm) {
    exp += 5;
  }

  // Accuracy contribution
  if (accuracy > 80) {
    exp += 5;
  } else if (accuracy < 40) {
    exp -= 40;
  }

  // Duration contribution (50 EXP per 1 minute of proper completion)
  // Assuming duration is in seconds
  if (duration > 0) {
    const minutes = duration / 60;
    exp += Math.floor(minutes * 50);
  }

  // Consistency multiplier is handled separately if it's the 3rd streak day, 
  // but let's assume we return a base multiplier of 1, and the caller handles streaks
  // Or we pass isStreakDay
  
  return Math.round(exp);
};

export const getExpForLevel = (level) => {
  // Lvl 1->2 requires 200.
  // Each subsequent level requires 1.3x the previous.
  // We calculate EXP required to COMPLETE the current level.
  return Math.floor(200 * Math.pow(1.3, level - 1));
};

export const checkLevelUp = (user) => {
  let leveledUp = false;
  let maxLevel = 100;
  
  while (user.level < maxLevel) {
    const requiredExp = getExpForLevel(user.level);
    if (user.experience >= requiredExp) {
      user.experience -= requiredExp;
      user.level += 1;
      leveledUp = true;
      
      // Avatar unlock every 5 levels
      if (user.level % 5 === 0) {
        const newAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=Level${user.level}`;
        if (!user.unlockedAvatars.includes(newAvatar)) {
          user.unlockedAvatars.push(newAvatar);
        }
      }
    } else {
      break;
    }
  }
  
  return leveledUp;
};

export const updateStreak = (user) => {
  const now = new Date();
  let isStreakDay = false;
  
  if (!user.lastPlayedDate) {
    user.currentStreak = 1;
    user.lastPlayedDate = now;
  } else {
    const lastDate = new Date(user.lastPlayedDate);
    const msPerDay = 1000 * 60 * 60 * 24;
    // Strip time for strict day comparison
    const nowDays = Math.floor(now.getTime() / msPerDay);
    const lastDays = Math.floor(lastDate.getTime() / msPerDay);
    const diffDays = nowDays - lastDays;

    if (diffDays === 1) {
      user.currentStreak += 1;
      user.lastPlayedDate = now;
      if (user.currentStreak % 3 === 0) {
        isStreakDay = true;
      }
    } else if (diffDays > 1) {
      // Reset streak
      user.currentStreak = 1;
      user.lastPlayedDate = now;
    }
    // If diffDays === 0, same day, do nothing.
  }
  
  return isStreakDay;
};
