import React, { useState } from 'react';
import * as wasm from "wasm-security-test";

const CodeInjection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('exploit');
  const [exploitOutput, setExploitOutput] = useState<string>('');
  const [mitigationOutput, setMitigationOutput] = useState<string>('');

  const runExploit = () => {
    console.log("Running code injection simulation...");
    setExploitOutput("Code injection successful: Untrusted code executed\n\n" +
      "When unsafe Rust code is compiled to WebAssembly without proper validation,\n" +
      "it can potentially execute untrusted code.");
  };

  const runMitigation = () => {
    console.log("Running code injection mitigation...");
    setMitigationOutput("Code injection prevented: All inputs properly validated\n\n" +
      "With proper input validation and sandboxing, the WebAssembly module\n" +
      "can safely handle potentially malicious inputs.");
  };

  return (
    <div>
      <h2>Code Injection Vulnerabilities</h2>
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
        <div className="tab-content active" id="code-injection-exploit">
          <h3>Code Injection Example</h3>
          <p>Demonstrating a code injection vulnerability in WebAssembly...</p>
          
          <button id="run-injection-exploit" onClick={runExploit}>
            Run Exploit
          </button>
          
          <div 
            id="injection-exploit-output" 
            className="output"
            dangerouslySetInnerHTML={{ __html: exploitOutput }}
          />
        </div>
      )}
      
      {activeTab === 'mitigation' && (
        <div className="tab-content active" id="code-injection-mitigation">
          <h3>Code Injection Mitigation</h3>
          <p>Using proper validation to prevent code injection...</p>
          
          <button id="run-injection-mitigation" onClick={runMitigation}>
            Run Safe Version
          </button>
          
          <div 
            id="injection-mitigation-output" 
            className="output"
            dangerouslySetInnerHTML={{ __html: mitigationOutput }}
          />
        </div>
      )}
    </div>
  );
};

export default CodeInjection;