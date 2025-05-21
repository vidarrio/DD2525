import React from 'react';

interface HeaderProps {
  activePage: string;
}

const Header: React.FC<HeaderProps> = ({ activePage }) => {
  return (
    <header>
      <h1>WebAssembly Security: Exploits & Mitigations</h1>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;