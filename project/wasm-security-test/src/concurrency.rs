use wasm_bindgen::prelude::*;
use std::sync::{Mutex, OnceLock};
use std::collections::HashMap;

// Global state using OnceLock for thread-safe lazy initialization
static PERMISSION_CACHE: OnceLock<Mutex<HashMap<String, bool>>> = OnceLock::new();
static FILE_SYSTEM: OnceLock<Mutex<HashMap<String, String>>> = OnceLock::new();

// Initialize permission cache
fn permission_cache() -> &'static Mutex<HashMap<String, bool>> {
    PERMISSION_CACHE.get_or_init(|| Mutex::new(HashMap::new()))
}

// Initialize file system with default files
fn file_system() -> &'static Mutex<HashMap<String, String>> {
    FILE_SYSTEM.get_or_init(|| {
        let mut fs = HashMap::new();
        fs.insert("config.txt".to_string(), "admin_mode=false".to_string());
        fs.insert("user_data.txt".to_string(), "sensitive_user_information".to_string());
        fs.insert("public.txt".to_string(), "public_information".to_string());
        Mutex::new(fs)
    })
}

// Check default permission rules
fn has_default_permission(filename: &str, user_id: &str) -> bool {
    match filename {
        "public.txt" => true,
        "config.txt" | "user_data.txt" => user_id == "admin",
        _ => false
    }
}

// ----------------------------------------------------------
// Time-of-Check-to-Time-of-Use (TOCTOU) Vulnerabilities
// ----------------------------------------------------------

// VULNERABLE: Separate check and use operations with delay
#[wasm_bindgen]
pub fn vulnerable_file_access(filename: &str, user_id: &str) -> String {
    // TIME OF CHECK: Validate permission
    let key = format!("{}:{}", user_id, filename);
    let has_permission = permission_cache()
        .lock()
        .unwrap()
        .get(&key)
        .copied()
        .unwrap_or_else(|| has_default_permission(filename, user_id));
    
    if !has_permission {
        return format!("ACCESS DENIED: User {} cannot access {}", user_id, filename);
    }
    
    // Simulate delay creating TOCTOU window
    for i in 0..1000 { let _ = i; }
    
    // TIME OF USE: Access file (vulnerability window!)
    match file_system().lock().unwrap().get(filename) {
        Some(content) => format!("SUCCESS: Read file '{}': {}", filename, content),
        None => format!("ERROR: File '{}' not found", filename)
    }
}

// Exploit: Modify permissions during TOCTOU window
#[wasm_bindgen]
pub fn modify_permission_during_delay(user_id: &str, filename: &str, grant_access: bool) -> String {
    let key = format!("{}:{}", user_id, filename);
    permission_cache().lock().unwrap().insert(key.clone(), grant_access);
    format!("RACE CONDITION: Modified permission for '{}' to {}", key, grant_access)
}

// SECURE: Atomic check-and-use operation
#[wasm_bindgen]
pub fn secure_file_access(filename: &str, user_id: &str) -> String {
    let files = file_system().lock().unwrap();
    
    if !has_default_permission(filename, user_id) {
        return format!("ACCESS DENIED: User {} cannot access {}", user_id, filename);
    }
    
    match files.get(filename) {
        Some(content) => format!("SECURE SUCCESS: Read file '{}': {}", filename, content),
        None => format!("ERROR: File '{}' not found", filename)
    }
}

// Utility functions
#[wasm_bindgen]
pub fn clear_permission_cache() -> String {
    permission_cache().lock().unwrap().clear();
    "Permission cache cleared".to_string()
}

#[wasm_bindgen]
pub fn get_file_system_state() -> String {
    let files = file_system().lock().unwrap();
    let mut state = String::from("Current file system:\n");
    for (filename, content) in files.iter() {
        state.push_str(&format!("  {}: {}\n", filename, content));
    }
    state
}

#[wasm_bindgen]
pub fn get_permission_cache_state() -> String {
    let cache = permission_cache().lock().unwrap();
    if cache.is_empty() {
        return "Permission cache is empty (using default rules)".to_string();
    }
    
    let mut state = String::from("Current permission cache:\n");
    for (key, permission) in cache.iter() {
        state.push_str(&format!("  {}: {}\n", key, permission));
    }
    state
}