'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'classic' | 'premium';

type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContextValue>({ theme: 'classic', setTheme: () => undefined });
const storageKey = 'byteforce-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('classic');

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'classic' || stored === 'premium') setThemeState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}