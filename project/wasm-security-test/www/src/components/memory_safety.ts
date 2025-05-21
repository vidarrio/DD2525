import * as wasm from "wasm-security-test";

function setupMemorySafetyDemo() {
  // Get UI elements
  const runExploitButton = document.getElementById('run-memory-exploit');
  const runMitigationButton = document.getElementById('run-memory-mitigation');
  const exploitOutput = document.getElementById('memory-exploit-output');
  const mitigationOutput = document.getElementById('memory-mitigation-output');
  const userInputField = document.getElementById('user-input') as HTMLInputElement;
  
  // Add event listeners
  if (runExploitButton) {
    runExploitButton.addEventListener('click', () => {
      if (!exploitOutput) return;
      
      try {
        const userInput = userInputField?.value || "AAAAAAAAAAAAAAAAAAAAAAAAA";
        
        // Demonstration: Write past the buffer boundaries (position 12 in a 16-byte buffer)
        const result = (wasm as any).unsafe_copy_user_data(userInput, 12);
        
        // Show the result and explain what happened
        exploitOutput.innerHTML = `
          <p>Input: "${userInput}"</p>
          <p>Result: ${result}</p>
          <p class="warning">The input was copied starting at position 12 in the first 16-byte buffer.
          This allowed writing ${Math.max(0, userInput.length - 4)} bytes past the end of the first buffer,
          corrupting the second adjacent buffer as shown above!</p>
        `;
      } catch (e) {
        const error = e as Error;
        exploitOutput.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });
  }
  
  if (runMitigationButton && mitigationOutput) {
    runMitigationButton.addEventListener('click', () => {
      try {
        const userInput = userInputField?.value || "AAAAAAAAAAAAAAAAAAAAAAAAA";
        
        // Use the safe implementation with proper bounds checking
        const result = (wasm as any).safe_copy_user_data(userInput, 12);
        
        // Show the result and explain what happened
        mitigationOutput.innerHTML = `
          <p>Input: "${userInput}"</p>
          <p>Result: ${result}</p>
          <p class="success">The safe implementation prevented buffer overflow by
          properly checking bounds before writing to the first buffer.
          Only ${Math.min(userInput.length, 4)} bytes were written, and the second buffer remains intact with all 'B's.</p>
        `;
      } catch (e) {
        const error = e as Error;
        mitigationOutput.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });
  }
}

export { setupMemorySafetyDemo };