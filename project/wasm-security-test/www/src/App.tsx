import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MemorySafety from './components/MemorySafety';
import CodeInjection from './components/CodeInjection';
import SideChannels from './components/SideChannels';
import SandboxEscapes from './components/SandboxEscapes';
import Home from './components/Home';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home');

  useEffect(() => {
    // Handle navigation via URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'home';
      setActivePage(hash);
    };

    // Set initial page based on URL hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <Header activePage={activePage} />
      
      <main id="content">
        {activePage === 'home' && <Home />}
        {activePage === 'memory-safety' && <MemorySafety />}
        {activePage === 'code-injection' && <CodeInjection />}
        {activePage === 'side-channels' && <SideChannels />}
        {activePage === 'sandbox-escapes' && <SandboxEscapes />}
      </main>
      
      <footer>
        <p>WebAssembly Security Project for DD2525</p>
      </footer>
    </>
  );
};

export default App;