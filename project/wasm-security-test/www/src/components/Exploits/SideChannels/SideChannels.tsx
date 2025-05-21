import React, { useState } from 'react';
import * as wasm from "wasm-security-test";

const SideChannels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('exploit');
  const [exploitOutput, setExploitOutput] = useState<string>('');
  const [mitigationOutput, setMitigationOutput] = useState<string>('');

  const runTimingAttack = () => {
    console.log("Running timing attack simulation...");
    setExploitOutput("Timing attack successful: Secret data obtained\n\n" +
      "By measuring execution time differences, an attacker can infer\n" +
      "information about secret data being processed.");
  };

  const runMitigation = () => {
    console.log("Running timing attack mitigation...");
    setMitigationOutput("Timing attack prevented: Constant-time operations used\n\n" +
      "By using constant-time operations for sensitive data processing,\n" +
      "timing side-channels can be eliminated.");
  };

  return (
    <div>
      <h2>Side-Channel Attacks in WebAssembly</h2>
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'exploit' ? 'active' : ''}`}
          onClick={() => setActiveTab('exploit')}
        >
          Exploit
        </button>
        <button 
          className={`tab-btn ${activeTab === 'mitigation' ? 'active' : ''}`}
          onClick={() => setActiveTab('mitigation')}
        >
          Mitigation
        </button>
      </div>
      
      {activeTab === 'exploit' && (
        <div className="tab-content active" id="side-channels-exploit">
          <h3>Timing Attack Example</h3>
          <p>Demonstrating how execution time can leak sensitive information...</p>
          
          <button id="run-timing-exploit" onClick={runTimingAttack}>
            Run Timing Attack
          </button>
          
          <div 
            id="timing-exploit-output" 
            className="output"
            dangerouslySetInnerHTML={{ __html: exploitOutput }}
          />
        </div>
      )}
      
      {activeTab === 'mitigation' && (
        <div className="tab-content active" id="side-channels-mitigation">
          <h3>Constant-Time Implementation</h3>
          <p>Using techniques to prevent timing-based information leaks...</p>
          
          <button id="run-timing-mitigation" onClick={runMitigation}>
            Run Safe Version
          </button>
          
          <div 
            id="timing-mitigation-output" 
            className="output"
            dangerouslySetInnerHTML={{ __html: mitigationOutput }}
          />
        </div>
      )}
    </div>
  );
};

export default SideChannels;