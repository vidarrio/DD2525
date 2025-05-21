import * as wasm from "wasm-security-test";

function setupSandboxEscapeDemo() {
  console.log("Sandbox escape demo initialized");
  
  // Get UI elements
  const runExploitButton = document.getElementById('run-sandbox-exploit');
  const runMitigationButton = document.getElementById('run-sandbox-mitigation');
  const exploitOutput = document.getElementById('sandbox-exploit-output');
  const mitigationOutput = document.getElementById('sandbox-mitigation-output');
  
  // Add event listeners
  if (runExploitButton) {
    runExploitButton.addEventListener('click', () => {
      console.log("Running sandbox escape simulation...");
      if (exploitOutput) {
        exploitOutput.textContent = "Sandbox escape attempt detected: Access denied\n\n" +
          "This demonstrates how WebAssembly code might try to access resources outside its sandbox.";
      }
    });
  }
  
  if (runMitigationButton) {
    runMitigationButton.addEventListener('click', () => {
      console.log("Running sandbox escape mitigation...");
      if (mitigationOutput) {
        mitigationOutput.textContent = "Sandbox maintained: All access properly controlled\n\n" +
          "Proper isolation and access controls prevented the WebAssembly module from accessing unauthorized resources.";
      }
    });
  }
}

export { setupSandboxEscapeDemo };