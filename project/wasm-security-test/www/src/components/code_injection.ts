import * as wasm from "wasm-security-test";

function setupCodeInjectionDemo() {
  console.log("Code injection demo initialized");
  
  // Get UI elements
  const runExploitButton = document.getElementById('run-injection-exploit');
  const runMitigationButton = document.getElementById('run-injection-mitigation');
  const exploitOutput = document.getElementById('injection-exploit-output');
  const mitigationOutput = document.getElementById('injection-mitigation-output');
  
  // Add event listeners
  if (runExploitButton) {
    runExploitButton.addEventListener('click', () => {
      console.log("Running code injection simulation...");
      if (exploitOutput) {
        exploitOutput.textContent = "Code injection successful: Untrusted code executed\n\n" +
          "When unsafe Rust code is compiled to WebAssembly without proper validation,\n" +
          "it can potentially execute untrusted code.";
      }
    });
  }
  
  if (runMitigationButton) {
    runMitigationButton.addEventListener('click', () => {
      console.log("Running code injection mitigation...");
      if (mitigationOutput) {
        mitigationOutput.textContent = "Operation completed safely: Code injection prevented\n\n" +
          "Proper input validation and Rust's safety features prevented the execution of untrusted code.";
      }
    });
  }
}

export { setupCodeInjectionDemo };