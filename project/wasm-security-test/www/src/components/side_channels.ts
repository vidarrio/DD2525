import * as wasm from "wasm-security-test";

function setupSideChannelDemo() {
  // Get UI elements
  const sideChannelPage = document.getElementById('side-channels');
  
  // Add content to the side channels page
  if (sideChannelPage) {
    // If the page is empty, add some basic content structure
    if (sideChannelPage.innerHTML.trim() === '') {
      sideChannelPage.innerHTML = `
        <h2>Side-Channel Attacks in WebAssembly</h2>
        <div class="tabs">
          <button class="tab-btn active" data-tab="exploit">Exploit</button>
          <button class="tab-btn" data-tab="mitigation">Mitigation</button>
        </div>
        <div class="tab-content active" id="side-channels-exploit">
          <h3>Timing Attack Example</h3>
          <p>Demonstrating how execution time can leak sensitive information...</p>
          <button id="run-timing-exploit">Run Timing Attack</button>
          <div id="timing-exploit-output" class="output"></div>
        </div>
        <div class="tab-content" id="side-channels-mitigation">
          <h3>Timing Attack Mitigation</h3>
          <p>Using constant-time operations to prevent timing leaks...</p>
          <button id="run-timing-mitigation">Run Safe Version</button>
          <div id="timing-mitigation-output" class="output"></div>
        </div>
      `;
    }
    
    // Add event listeners after content is added
    const runExploitButton = document.getElementById('run-timing-exploit');
    const runMitigationButton = document.getElementById('run-timing-mitigation');
    const exploitOutput = document.getElementById('timing-exploit-output');
    const mitigationOutput = document.getElementById('timing-mitigation-output');
    
    if (runExploitButton) {
      runExploitButton.addEventListener('click', () => {
        console.log("Running timing attack simulation...");
        if (exploitOutput) {
          exploitOutput.textContent = "Timing attack successful: Secret data leaked\n\n" +
            "By measuring execution time differences, an attacker can infer sensitive information.";
        }
      });
    }
    
    if (runMitigationButton) {
      runMitigationButton.addEventListener('click', () => {
        console.log("Running timing attack mitigation...");
        if (mitigationOutput) {
          mitigationOutput.textContent = "Operation completed with constant time\n\n" +
            "Using constant-time operations prevents timing differences that could leak secrets.";
        }
      });
    }
  }
}

export { setupSideChannelDemo };