import React, { useState } from 'react';
import * as wasm from "wasm-security-test";

const SandboxEscapes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('exploit');
  const [exploitOutput, setExploitOutput] = useState<string>('');
  const [mitigationOutput, setMitigationOutput] = useState<string>('');

  const runExploit = () => {
    console.log("Running sandbox escape simulation...");
    setExploitOutput("Sandbox escape attempt detected: Access denied\n\n" +
      "This demonstrates how WebAssembly code might try to access resources outside its sandbox.");
  };

  const runMitigation = () => {
    console.log("Running sandbox escape mitigation...");
    setMitigationOutput("Sandbox maintained: All access properly controlled\n\n" +
      "Proper isolation and access controls prevented the WebAssembly module from accessing unauthorized resources.");
  };

  return (
    <div>
      <h2>Sandbox Escapes Vulnerabilities</h2>
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
        <div className="tab-content active" id="sandbox-escapes-exploit">
          <h3>Sandbox Escape Attempt</h3>
          <p>Demonstrating how WebAssembly code might try to break out of its sandbox...</p>
          
          <button id="run-sandbox-exploit" onClick={runExploit}>
            Run Exploit
          </button>
          
          <div 
            id="sandbox-exploit-output" 
            className="output"
            dangerouslySetInnerHTML={{ __html: exploitOutput }}
          />
        </div>
      )}
      
      {activeTab === 'mitigation' && (
        <div className="tab-content active" id="sandbox-escapes-mitigation">
          <h3>Sandbox Containment</h3>
          <p>Using proper isolation and access controls...</p>
          
          <button id="run-sandbox-mitigation" onClick={runMitigation}>
            Run Safe Version
          </button>
          
          <div 
            id="sandbox-mitigation-output" 
            className="output"
            dangerouslySetInnerHTML={{ __html: mitigationOutput }}
          />
        </div>
      )}
    </div>
  );
};

export default SandboxEscapes;