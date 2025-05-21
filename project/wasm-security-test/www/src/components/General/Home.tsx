import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h2>A dive into WebAssembly: Exploitation and Mitigation</h2>
      <p>This demonstration showcases various security vulnerabilities in WebAssembly and their mitigations.</p>
      <p>Select a category from the navigation to explore different security aspects:</p>
      
      <ul>
        <li><strong>Memory Safety</strong> - Buffer overflows and related vulnerabilities</li>
        <li><strong>Code Injection</strong> - Executing untrusted code</li>
        <li><strong>Side-Channel Attacks</strong> - Information leakage through timing and other side channels</li>
        <li><strong>Sandbox Escapes</strong> - Attempts to break out of the WebAssembly sandbox</li>
      </ul>
    </div>
  );
};

export default Home;