/**
 * WARNING: DANGEROUS FUNCTIONS FOR SANDBOX ESCAPE DEMONSTRATION
 * These functions are intentionally exposed to show how WASM can escape its sandbox
 * when host provides dangerous capabilities.
 * 
 * These should NEVER be exposed in a real application!
 */

// Initialize global tracking
(window as any).networkActivity = [];

// Dangerous fetch wrapper - makes effects more visible
(window as any).dangerousFetch = async (url: string) => {
  try {
    console.warn(`[SECURITY BREACH] WASM initiated fetch to: ${url}`);
    
    // Track network activity
    const timestamp = new Date().toLocaleTimeString();
    (window as any).networkActivity.unshift(`${timestamp}: ${url}`);
    if ((window as any).networkActivity.length > 10) {
      (window as any).networkActivity = (window as any).networkActivity.slice(0, 10);
    }
    
    // Show a visual indicator
    const indicator = document.createElement('div');
    indicator.innerHTML = `🚨 WASM made network request to: ${url}`;
    indicator.style.cssText = `
      position: fixed; top: 10px; right: 10px; z-index: 9999;
      background: #ff4444; color: white; padding: 10px; border-radius: 5px;
      font-family: monospace; font-size: 12px; max-width: 300px;
    `;
    document.body.appendChild(indicator);
    setTimeout(() => indicator.remove(), 5000);
    
    const response = await fetch(url);
    const statusText = `${response.status} ${response.statusText}`;
    
    // Update indicator with result
    indicator.innerHTML = `✅ Network request completed: ${statusText}`;
    indicator.style.background = '#44aa44';
    
    return `Fetch completed: ${statusText}`;
  } catch (error) {
    const errorMsg = `Fetch failed: ${error}`;
    
    // Show error indicator
    const indicator = document.createElement('div');
    indicator.innerHTML = `❌ ${errorMsg}`;
    indicator.style.cssText = `
      position: fixed; top: 10px; right: 10px; z-index: 9999;
      background: #aa4444; color: white; padding: 10px; border-radius: 5px;
      font-family: monospace; font-size: 12px; max-width: 300px;
    `;
    document.body.appendChild(indicator);
    setTimeout(() => indicator.remove(), 5000);
    
    return errorMsg;
  }
};

// Dangerous localStorage wrapper - makes effects more visible
(window as any).dangerousStorageWrite = (key: string, value: string) => {
  try {
    console.warn(`[SECURITY BREACH] WASM wrote to localStorage: ${key} = ${value}`);
    localStorage.setItem(key, value);
    
    // Show visual indicator
    const indicator = document.createElement('div');
    indicator.innerHTML = `💾 WASM wrote to browser storage:<br/><strong>${key}</strong> = "${value}"`;
    indicator.style.cssText = `
      position: fixed; top: 70px; right: 10px; z-index: 9999;
      background: #ff6600; color: white; padding: 10px; border-radius: 5px;
      font-family: monospace; font-size: 12px; max-width: 300px;
    `;
    document.body.appendChild(indicator);
    setTimeout(() => indicator.remove(), 5000);
    
    // Also update any visible storage display
    const storageDisplay = document.getElementById('localStorage-display');
    if (storageDisplay) {
      storageDisplay.innerHTML = `Latest: ${key} = "${value}"`;
    }
    
    return `Storage write successful`;
  } catch (error) {
    return `Storage write failed: ${error}`;
  }
};

(window as any).dangerousStorageRead = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    console.warn(`[SECURITY BREACH] WASM read from localStorage: ${key} = ${value}`);
    
    // Show visual indicator
    const indicator = document.createElement('div');
    indicator.innerHTML = `📖 WASM read from storage:<br/><strong>${key}</strong> = "${value || 'null'}"`;
    indicator.style.cssText = `
      position: fixed; top: 130px; right: 10px; z-index: 9999;
      background: #6600ff; color: white; padding: 10px; border-radius: 5px;
      font-family: monospace; font-size: 12px; max-width: 300px;
    `;
    document.body.appendChild(indicator);
    setTimeout(() => indicator.remove(), 3000);
    
    return value || 'null';
  } catch (error) {
    return `Storage read failed: ${error}`;
  }
};
