use wasm_bindgen::prelude::*;

// External JavaScript functions that we'll import (dangerous!)
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = window)]
    fn eval(code: &str) -> JsValue;
    
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    
    // Custom functions we'll expose from JavaScript
    #[wasm_bindgen(js_name = "dangerousFetch")]
    fn dangerous_fetch(url: &str) -> JsValue;
    
    #[wasm_bindgen(js_name = "dangerousStorageWrite")]
    fn dangerous_storage_write(key: &str, value: &str) -> JsValue;
    
    #[wasm_bindgen(js_name = "dangerousStorageRead")]
    fn dangerous_storage_read(key: &str) -> JsValue;
}

// ----------------------------------------------------------
// Dangerous Host Function Exposure
// ----------------------------------------------------------

// UNSAFE VERSION: WASM gets access to dangerous host functions
#[wasm_bindgen]
pub fn unsafe_eval_access(code: &str) -> String {
    // Actually execute the JavaScript code!
    match std::panic::catch_unwind(|| {
        let result = eval(code);
        format!("EXECUTED: JavaScript code '{}' returned: {:?}", code, result)
    }) {
        Ok(success) => success,
        Err(_) => format!("ERROR: JavaScript code '{}' caused an error", code)
    }
}

#[wasm_bindgen]
pub fn unsafe_fetch_access(url: &str) -> String {
    // Actually make the network request!
    match std::panic::catch_unwind(|| {
        let result = dangerous_fetch(url);
        format!("EXECUTED: Network request to '{}' initiated: {:?}", url, result)
    }) {
        Ok(success) => success,
        Err(_) => format!("ERROR: Network request to '{}' failed", url)
    }
}

#[wasm_bindgen]
pub fn unsafe_storage_access(key: &str, value: &str) -> String {
    // Actually write to browser storage!
    match std::panic::catch_unwind(|| {
        let _write_result = dangerous_storage_write(key, value);
        let read_result = dangerous_storage_read(key);
        format!("EXECUTED: Wrote '{}' = '{}' to storage. Read back: {:?}", 
                key, value, read_result)
    }) {
        Ok(success) => success,
        Err(_) => format!("ERROR: Storage access for key '{}' failed", key)
    }
}

// SAFE VERSION: WASM only gets safe, restricted host function access
#[wasm_bindgen]
pub fn safe_restricted_access() -> String {
    // Just safe operations here
    let computation = 42 + 8;
    format!("SAFE: WASM performed safe computation: {}", computation)
}

// A safe logging function that could be exposed
#[wasm_bindgen]
pub fn safe_log_message(message: &str) -> String {
    format!("SAFE LOG: {}", message)
}

