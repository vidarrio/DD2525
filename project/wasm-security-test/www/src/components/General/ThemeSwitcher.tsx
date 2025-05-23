import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="theme-switcher">
      <span className="theme-toggle-icon">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      <div 
        className={`theme-toggle ${theme}`} 
        onClick={toggleTheme}
        role="button"
        tabIndex={0}
        aria-label="Toggle dark mode"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
          }
        }}
      >
        <div className="toggle-thumb"></div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
