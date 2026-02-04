const SPLASH_STORAGE_KEY = "lastSplashTime";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;

export const getLastSplashTime = () => {
  try {
    const lastTime = localStorage.getItem(SPLASH_STORAGE_KEY);
    if (lastTime) {
      if (Date.now() - parseInt(lastTime) > ONE_DAY_MS) {
        localStorage.removeItem(SPLASH_STORAGE_KEY);
        return null;
      }
      return lastTime;
    }
    return null;
  } catch (error) {
    console.error("Error getting splash time:", error);
    return null;
  }
};

export const setLastSplashTime = () => {
  try {
    localStorage.setItem(SPLASH_STORAGE_KEY, Date.now().toString());
  } catch (error) {
    console.error("Error setting splash time:", error);
  }
};

export const shouldShowSplash = () => {
  const lastSplashTime = getLastSplashTime();
  if (!lastSplashTime) return true;
  
  const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);
  return timeSinceLastSplash >= ONE_HOUR_MS;
};