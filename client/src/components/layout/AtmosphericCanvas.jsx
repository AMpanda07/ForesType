import React, { useEffect, useState } from 'react';

export const AtmosphericCanvas = () => {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const lightBg = 'url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop")';
  const darkBg = 'url("https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop")';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: theme === 'dark' ? darkBg : lightBg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease',
        opacity: theme === 'dark' ? 0.8 : 0.9, /* Slight opacity to keep text legible */
        filter: theme === 'dark' ? 'brightness(0.5)' : 'brightness(0.9)'
      }}
    />
  );
};
