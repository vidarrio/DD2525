use wasm_bindgen::prelude::*;

// ----------------------------------------------------------
// Dangerous Host Function Exposure
// ----------------------------------------------------------

// UNSAFE VERSION: Simulates WASM with access to dangerous host functions
#[wasm_bindgen]
pub fn unsafe_eval_access(code: &str) -> String {
    // In a real scenario, this would call an imported JS eval() function
    // We simulate the danger for demo purposes
    format!("DANGER: WASM executed JavaScript code: '{}'", code)
}

#[wasm_bindgen]
pub fn unsafe_fetch_access(url: &str) -> String {
    // Simulate dangerous network access through exposed fetch()
    format!("DANGER: WASM made network request to: {}", url)
}

#[wasm_bindgen]
pub fn unsafe_storage_access(key: &str, value: &str) -> String {
    // Simulate dangerous storage access through exposed localStorage
    format!("DANGER: WASM wrote to browser storage: '{}' = '{}'", key, value)
}

// SAFE VERSION: WASM with only safe, restricted host function access
#[wasm_bindgen]
pub fn safe_restricted_access() -> String {
    // Only safe operations are available
    let computation = 42 + 8;
    format!("SAFE: WASM performed safe computation: {}", computation)
}

// Simulate a safe logging function that could be exposed
#[wasm_bindgen]
pub fn safe_log_message(message: &str) -> String {
    format!("SAFE LOG: {}", message)
}
