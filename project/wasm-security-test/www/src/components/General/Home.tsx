import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h2>A dive into WebAssembly: Exploitation and Mitigation</h2>
        <p className="lead">
          This interactive demonstration showcases security vulnerabilities in WebAssembly 
          and their corresponding mitigations.
        </p>
      </div>

      <div className="category-section">
        <p>Select a category from the navigation to explore different security aspects:</p>
        
        <div className="category-cards">
          <div
            className="category-card memory-safety"
            onClick={() => window.location.assign('#memory-safety')}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter') window.location.assign('#memory-safety');
              if (e.key === ' ') {
                e.preventDefault();
                window.location.assign('#memory-safety');
              }
            }}
          >
            <h3>Memory Safety</h3>
            <p>
              Explore buffer overflows, heap corruption, and other memory safety vulnerabilities 
              in WebAssembly.
            </p>
            <ul>
              <li>Buffer Overflow on Stack</li>
              <li>Heap Metadata Corruption</li>
              <li>Stack Overflow</li>
            </ul>
          </div>
          
          <div
            className="category-card code-injection"
            onClick={() => window.location.assign('#code-injection')}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter') window.location.assign('#code-injection');
              if (e.key === ' ') {
                e.preventDefault();
                window.location.assign('#code-injection');
              }
            }}
          >
            <h3>Code Injection</h3>
            <p>
              Learn about code injection vulnerabilities and how WebAssembly's 
              execution model helps mitigate them.
            </p>
          </div>
          
          <div
            className="category-card side-channels"
            onClick={() => window.location.assign('#side-channels')}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter') window.location.assign('#side-channels');
              if (e.key === ' ') {
                e.preventDefault();
                window.location.assign('#side-channels');
              }
            }}
          >
            <h3>Side-Channel Attacks</h3>
            <p>
              Discover how information can leak through timing and storage side channels, 
              even in a sandboxed environment.
            </p>
            <ul>
              <li>Storage Side Channel</li>
              <li>Timing Side Channel</li>
              <li>Cache Timing Side Channel</li>
            </ul>
          </div>
          
          <div
            className="category-card sandbox-escapes"
            onClick={() => window.location.assign('#sandbox-escapes')}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter') window.location.assign('#sandbox-escapes');
              if (e.key === ' ') {
                e.preventDefault();
                window.location.assign('#sandbox-escapes');
              }
            }}
          >
            <h3>Sandbox Escapes</h3>
            <p>
              Understand how WebAssembly's sandbox protection works and 
              potential vulnerabilities in its implementation.
            </p>
          </div>
          
          <div
            className="category-card control-flow"
            onClick={() => window.location.assign('#control-flow')}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter') window.location.assign('#control-flow');
              if (e.key === ' ') {
                e.preventDefault();
                window.location.assign('#control-flow');
              }
            }}
          >
            <h3>Control Flow Attacks</h3>
            <p>
              See how CFI can be bypassed in WASM:
            </p>
            <ul>
              <li>Host Export Exposure</li>
              <li>Indirect Call Logic Flaw</li>
              <li>Exported Table Modification</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="project-info">
        <h3>About This Project</h3>
        <p>
          This demonstration was developed for the Language-Based Security course (DD2525) at KTH Royal Institute of Technology.
          It showcases both vulnerable and secure implementations of various security-critical functions.
        </p>
        <p>
          The critical functionality is implemented in Rust and compiled to WebAssembly, running directly in your browser.
          The user interface is built with React for interactive visualization of the security concepts.
        </p>
      </div>
    </div>
  );
};

export default Home;