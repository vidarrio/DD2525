use wasm_bindgen::prelude::*;
use std::sync::{Mutex, Arc, OnceLock};
use std::collections::HashMap;

// Global state for TOCTOU demonstration using safe OnceLock
static PERMISSION_CACHE: OnceLock<Arc<Mutex<HashMap<String, bool>>>> = OnceLock::new();
static FILE_SYSTEM: OnceLock<Arc<Mutex<HashMap<String, String>>>> = OnceLock::new();

// Initialize global state safely
fn get_permission_cache() -> &'static Arc<Mutex<HashMap<String, bool>>> {
    PERMISSION_CACHE.get_or_init(|| {
        Arc::new(Mutex::new(HashMap::new()))
    })
}

fn get_file_system() -> &'static Arc<Mutex<HashMap<String, String>>> {
    FILE_SYSTEM.get_or_init(|| {
        let mut fs = HashMap::new();
        fs.insert("config.txt".to_string(), "admin_mode=false".to_string());
        fs.insert("user_data.txt".to_string(), "sensitive_user_information".to_string());
        fs.insert("public.txt".to_string(), "public_information".to_string());
        Arc::new(Mutex::new(fs))
    })
}

// ----------------------------------------------------------
// Time-of-Check-to-Time-of-Use (TOCTOU) Vulnerabilities
// ----------------------------------------------------------

// VULNERABLE VERSION: Check and use happen in separate operations
#[wasm_bindgen]
pub fn vulnerable_file_access(filename: &str, user_id: &str) -> String {
    // TIME OF CHECK: Validate permission
    let has_permission = check_file_permission(filename, user_id);
    
    if !has_permission {
        return format!("ACCESS DENIED: User {} cannot access {}", user_id, filename);
    }
    
    // Simulate some delay that creates the race condition window
    // In a real scenario, this could be network I/O, other operations, etc.
    simulate_delay();
    
    // TIME OF USE: Actually access the file (vulnerability window!)
    let fs = get_file_system();
    if let Ok(files) = fs.lock() {
        if let Some(content) = files.get(filename) {
            return format!("SUCCESS: Read file '{}': {}", filename, content);
        }
    }
    
    format!("ERROR: File '{}' not found", filename)
}

// Helper function that simulates checking permissions (can be manipulated during delay)
fn check_file_permission(filename: &str, user_id: &str) -> bool {
    // Check if permission is cached
    let cache = get_permission_cache();
    if let Ok(permissions) = cache.lock() {
        let key = format!("{}:{}", user_id, filename);
        if let Some(&cached_permission) = permissions.get(&key) {
            return cached_permission;
        }
    }
    
    // Default permission logic (simplified)
    match filename {
        "public.txt" => true,
        "config.txt" | "user_data.txt" => user_id == "admin",
        _ => false
    }
}

// Function to modify permissions during the TOCTOU window (simulates race condition)
#[wasm_bindgen]
pub fn modify_permission_during_delay(user_id: &str, filename: &str, grant_access: bool) -> String {
    let cache = get_permission_cache();
    if let Ok(mut permissions) = cache.lock() {
        let key = format!("{}:{}", user_id, filename);
        permissions.insert(key.clone(), grant_access);
        return format!("RACE CONDITION: Modified permission for '{}' to {}", key, grant_access);
    }
    
    "ERROR: Could not modify permissions".to_string()
}

// Function to clear permission cache
#[wasm_bindgen]
pub fn clear_permission_cache() -> String {
    let cache = get_permission_cache();
    if let Ok(mut permissions) = cache.lock() {
        permissions.clear();
        return "Permission cache cleared".to_string();
    }
    
    "ERROR: Could not clear cache".to_string()
}

// SECURE VERSION: Atomic check-and-use operation
#[wasm_bindgen]
pub fn secure_file_access(filename: &str, user_id: &str) -> String {
    // SECURE: Check and use in single atomic operation
    let fs = get_file_system();
    if let Ok(files) = fs.lock() {
        // Check permission at the exact moment of use
        let has_permission = match filename {
            "public.txt" => true,
            "config.txt" | "user_data.txt" => user_id == "admin",
            _ => false
        };
        
        if !has_permission {
            return format!("ACCESS DENIED: User {} cannot access {}", user_id, filename);
        }
        
        // Immediately use the resource while we have the lock
        if let Some(content) = files.get(filename) {
            return format!("SECURE SUCCESS: Read file '{}': {}", filename, content);
        }
    }
    
    format!("ERROR: File '{}' not found", filename)
}

// Simulate processing delay that creates TOCTOU window
fn simulate_delay() {
    // In WASM, we can't actually sleep, but this represents the concept
    // In a real system, this would be I/O operations, network calls, etc.
    let mut _dummy = 0;
    for i in 0..1000 {
        _dummy += i;
    }
}

// Function to get current file system state for demonstration
#[wasm_bindgen]
pub fn get_file_system_state() -> String {
    let fs = get_file_system();
    if let Ok(files) = fs.lock() {
        let mut state = String::from("Current file system:\n");
        for (filename, content) in files.iter() {
            state.push_str(&format!("  {}: {}\n", filename, content));
        }
        return state;
    }
    
    "ERROR: Could not read file system state".to_string()
}

// Function to get current permission cache for demonstration
#[wasm_bindgen]
pub fn get_permission_cache_state() -> String {
    let cache = get_permission_cache();
    if let Ok(permissions) = cache.lock() {
        if permissions.is_empty() {
            return "Permission cache is empty (using default rules)".to_string();
        }
        
        let mut state = String::from("Current permission cache:\n");
        for (key, permission) in permissions.iter() {
            state.push_str(&format!("  {}: {}\n", key, permission));
        }
        return state;
    }
    
    "ERROR: Could not read permission cache".to_string()
}
