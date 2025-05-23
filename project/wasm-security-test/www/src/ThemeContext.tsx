import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create a context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get the initial theme from localStorage or default to 'dark'
  const initialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'dark';
  };
  
  const [theme, setTheme] = useState<Theme>(initialTheme());

  // Apply the theme to the document immediately on first render
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', initialTheme());
  }, []);

  // Update the data-theme attribute whenever the theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
