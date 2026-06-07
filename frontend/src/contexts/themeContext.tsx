import { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType, ThemeContextType, ThemeType } from '../types';
import { localSettingKey, Theme } from '../constants';

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: ChildrenType) => {
  const page = document.documentElement;
  const browserTheme = window.matchMedia('(prefers-color-scheme: light)');
  const persisted = JSON.parse(localStorage.getItem(localSettingKey) || '{}');
  const intialTheme = persisted?.theme || (browserTheme.matches ? Theme.LIGHT : Theme.DARK);
  const [theme, setTheme] = useState<ThemeType>(intialTheme);

  const stopTransition = () => {
    page.classList.add('no-transition');
    setTimeout(() => page.classList.remove('no-transition'), 100);
  };

  const savePreferences = () => {
    localStorage.setItem(localSettingKey, JSON.stringify({ theme }));
  };

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    stopTransition();
  };

  const setAppHeight = () => {
    page.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    page.dataset.ratio = `${window.devicePixelRatio}`;
    setAppHeight();

    window.addEventListener('resize', setAppHeight);

    return () => {
      window.removeEventListener('resize', setAppHeight);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    savePreferences();

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
      event.matches ? setTheme(Theme.LIGHT) : setTheme(Theme.DARK);
      stopTransition();
      savePreferences();
    });

    page.classList.toggle(Theme.LIGHT, theme === Theme.DARK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
