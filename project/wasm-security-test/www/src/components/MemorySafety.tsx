import React, { useState } from 'react';
import * as wasm from "wasm-security-test";

const MemorySafety: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('exploit');
  const [userInput, setUserInput] = useState<string>("AAAABBBBCCCCDDDDEEEE");
  const [exploitOutput, setExploitOutput] = useState<string>('');
  const [mitigationOutput, setMitigationOutput] = useState<string>('');

  const runExploit = () => {
    try {
      // Demonstration: Write past the buffer boundaries (position 12 in a 16-byte buffer)
      const result = (wasm as any).unsafe_copy_user_data(userInput, 12);
      
      setExploitOutput(`
        Input: "${userInput}"
        Result: ${result}
        
        The input was copied starting at position 12 in the first 16-byte buffer.
        This allowed writing ${Math.max(0, userInput.length - 4)} bytes past the end of the first buffer,
        corrupting the second adjacent buffer as shown above!
      `);
    } catch (e) {
      const error = e as Error;
      setExploitOutput(`Error: ${error.message}`);
    }
  };

  const runMitigation = () => {
    try {
      // Use the safe implementation with proper bounds checking
      const result = (wasm as any).safe_copy_user_data(userInput, 12);
      
      setMitigationOutput(`
        Input: "${userInput}"
        Result: ${result}
        
        The safe implementation prevented the buffer overflow by performing bounds checking
        and safely handling the input data.
      `);
    } catch (e) {
      const error = e as Error;
      setMitigationOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div id="memory-safety" className="page active">
      <h2>Memory Safety Vulnerabilities</h2>
      
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
        <div className="tab-content active" id="memory-safety-exploit">
          <h3>Buffer Overflow Example</h3>
          <p>Demonstrating a buffer overflow vulnerability in WebAssembly...</p>
          
          <div className="input-group">
            <label htmlFor="user-input">Enter data to write to buffer:</label>
            <input 
              type="text" 
              id="user-input" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          
          <button id="run-memory-exploit" onClick={runExploit}>
            Run Exploit
          </button>
          
          <div 
            id="memory-exploit-output" 
            className="output" 
            dangerouslySetInnerHTML={{ __html: exploitOutput }}
          />
        </div>
      )}
      
      {activeTab === 'mitigation' && (
        <div className="tab-content active" id="memory-safety-mitigation">
          <h3>Buffer Overflow Mitigation</h3>
          <p>Using Rust's safety mechanisms to prevent buffer overflows...</p>
          
          <button id="run-memory-mitigation" onClick={runMitigation}>
            Run Safe Version
          </button>
          
          <div 
            id="memory-mitigation-output" 
            className="output"
            dangerouslySetInnerHTML={{ __html: mitigationOutput }}
          />
        </div>
      )}
    </div>
  );
};

export default MemorySafety;