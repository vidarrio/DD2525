import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  activePage: string;
}

const Header: React.FC<HeaderProps> = ({ activePage }) => {
  return (
    <header>
      <div className="header-content">
        <h1 
          style={{ cursor: 'pointer' }} 
          onClick={() => window.location.assign('#home')} 
          tabIndex={0} 
          role="button" 
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.assign('#home'); } }}
        >
          WebAssembly Security: Exploits & Mitigations
        </h1>
        <ThemeSwitcher />
      </div>
      <nav id="main-nav">
        <ul>
          <li>
            <a 
              href="#home" 
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#memory-safety" 
              className={`nav-link ${activePage === 'memory-safety' ? 'active' : ''}`}
            >
              Memory Safety
            </a>
          </li>
          <li>
            <a 
              href="#code-injection" 
              className={`nav-link ${activePage === 'code-injection' ? 'active' : ''}`}
            >
              Code Injection
            </a>
          </li>
          <li>
            <a 
              href="#side-channels" 
              className={`nav-link ${activePage === 'side-channels' ? 'active' : ''}`}
            >
              Side-Channel Attacks
            </a>
          </li>
          <li>
            <a 
              href="#sandbox-escapes" 
              className={`nav-link ${activePage === 'sandbox-escapes' ? 'active' : ''}`}
            >
              Sandbox Escapes
            </a>
          </li>
          <li>
            <a 
              href="#concurrency" 
              className={`nav-link ${activePage === 'concurrency' ? 'active' : ''}`}
            >
              Concurrency & Race Conditions
            </a>
          </li>
          <li>
            <a
              href="#control-flow"
              className={`nav-link ${activePage === 'control-flow' ? 'active' : ''}`}
            >
              Control Flow Attacks
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;