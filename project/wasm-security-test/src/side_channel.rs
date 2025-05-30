use wasm_bindgen::prelude::*;

// ----------------------------------------------------------
// Storage Side-Channel Attack
// ----------------------------------------------------------

// UNSAFE VERSION: Reveals whether username exists through different error messages
#[wasm_bindgen]
pub fn unsafe_check_credentials_storage(username: &str, password: &str) -> String {
    let stored_users = vec!["admin", "user", "guest", "moderator"];
    
    // This implementation leaks information about whether a username exists
    if !stored_users.contains(&username) {
        return "Error: Username does not exist".to_string();
    }
    
    // Just hardcoded passwords for the demo
    let correct_password = match username {
        "admin" => "admin123",
        "user" => "user123",
        "guest" => "guest123",
        "moderator" => "mod123",
        _ => "",
    };
    
    if password != correct_password {
        return "Error: Incorrect password".to_string();
    }
    
    "Login successful".to_string()
}

// SAFE VERSION: Does not reveal whether username exists
#[wasm_bindgen]
pub fn safe_check_credentials_storage(username: &str, password: &str) -> String {
    let stored_users = vec!["admin", "user", "guest", "moderator"];
    
    // This implementation uses a generic error message
    // that doesn't leak information about whether a username exists
    if !stored_users.contains(&username) {
        return "Error: Invalid username or password".to_string();
    }
    
    // Same password logic as unsafe version
    let correct_password = match username {
        "admin" => "admin123",
        "user" => "user123",
        "guest" => "guest123",
        "moderator" => "mod123",
        _ => "",
    };
    
    if password != correct_password {
        return "Error: Invalid username or password".to_string();
    }
    
    "Login successful".to_string()
}

// ----------------------------------------------------------
// Timing Side-Channel Attack
// ----------------------------------------------------------

#[wasm_bindgen]
pub struct TimingResult {
    message: String,
    simulated_time_ms: f64,
}

#[wasm_bindgen]
impl TimingResult {
    #[wasm_bindgen(getter)]
    pub fn message(&self) -> String {
        self.message.clone()
    }
    
    #[wasm_bindgen(getter)]
    pub fn simulated_time_ms(&self) -> f64 {
        self.simulated_time_ms
    }
}

// UNSAFE VERSION: Leaks password length through timing
#[wasm_bindgen]
pub fn unsafe_check_credentials_timing(username: &str, password: &str) -> TimingResult {
    if username != "admin" {
        return TimingResult {
            message: "Error: Invalid username or password".to_string(),
            simulated_time_ms: 0.85, // Base processing time (milliseconds)
        };
    }
    
    let correct_password = "admin123";
    
    // Insecure character-by-character comparison
    let mut is_correct = true;
    let mut simulated_time: f64 = 0.85;
    let min_length = std::cmp::min(password.len(), correct_password.len());
    
    for i in 0..min_length {
        if password.chars().nth(i) != correct_password.chars().nth(i) {
            is_correct = false;
            break;
        }

        simulated_time += 0.03;
    }
    
    if password.len() != correct_password.len() {
        is_correct = false;
    }
    
    TimingResult {
        message: if is_correct {
            "Login successful".to_string()
        } else {
            "Error: Invalid username or password".to_string()
        },
        simulated_time_ms: simulated_time,
    }
}

// SAFE VERSION: Constant-time comparison
#[wasm_bindgen]
pub fn safe_check_credentials_timing(username: &str, password: &str) -> TimingResult {
    if username != "admin" {
        return TimingResult {
            message: "Error: Invalid username or password".to_string(),
            simulated_time_ms: 1.05, // Constant processing time (milliseconds)
        };
    }
    
    let correct_password = "admin123";
    
    // Constant-time comparison - we always check all characters
    let mut result = if password.len() == correct_password.len() { 1 } else { 0 };
    
    // Compare all characters in constant time
    for i in 0..std::cmp::max(password.len(), correct_password.len()) {
        let pass_char = if i < password.len() { password.chars().nth(i).unwrap() as u32 } else { 0 };
        let correct_char = if i < correct_password.len() { correct_password.chars().nth(i).unwrap() as u32 } else { 0 };
        
        // Use bitwise AND to accumulate the result without branching
        result &= if pass_char == correct_char { 1 } else { 0 };
    }
    
    TimingResult {
        message: if result == 1 {
            "Login successful".to_string()
        } else {
            "Error: Invalid username or password".to_string()
        },
        simulated_time_ms: 1.05, // Always constant time (milliseconds)
    }
}

// ----------------------------------------------------------
// Cache Timing Side-Channel Attack
// ----------------------------------------------------------

#[wasm_bindgen]
pub struct CacheTimingResult {
    message: String,
    simulated_time_ms: f64,
    access_pattern: Vec<u8>,
    memory_value: u8,
}

#[wasm_bindgen]
impl CacheTimingResult {
    #[wasm_bindgen(getter)]
    pub fn message(&self) -> String {
        self.message.clone()
    }
    
    #[wasm_bindgen(getter)]
    pub fn simulated_time_ms(&self) -> f64 {
        self.simulated_time_ms
    }
    
    #[wasm_bindgen(getter)]
    pub fn access_pattern(&self) -> Vec<u8> {
        self.access_pattern.clone()
    }
    
    #[wasm_bindgen(getter)]
    pub fn memory_value(&self) -> u8 {
        self.memory_value
    }
}

// Unsafe implementation - accesses memory in patterns that depend on secret data
#[wasm_bindgen]
pub fn unsafe_cache_timing(probe_index: u32) -> CacheTimingResult {
    let buffer_size = 16;
    let mut lookup_table: Vec<u8> = vec![0; buffer_size];
    
    // Lookup table filled with "encryption key" bytes
    lookup_table[0] = 0x7A; 
    lookup_table[1] = 0x2B;
    lookup_table[2] = 0x15;
    lookup_table[3] = 0xED;
    lookup_table[4] = 0x9C;
    lookup_table[5] = 0x5F;
    lookup_table[6] = 0xD1;
    lookup_table[7] = 0x41;
    lookup_table[8] = 0x86;
    lookup_table[9] = 0x03;
    lookup_table[10] = 0xB2;
    lookup_table[11] = 0xA7;
    lookup_table[12] = 0xE4; // The "secret" key byte at index 12
    lookup_table[13] = 0x6D;
    lookup_table[14] = 0x33;
    lookup_table[15] = 0xC8;
    
    // Convert probe index to usize and ensure it's within bounds
    let index = (probe_index as usize) % buffer_size;
    
    // Access the table at the index being probed
    let accessed_value = lookup_table[index];
    
    // Hard-coded "secret" index for simulation
    const SECRET_INDEX: usize = 12;
    
    // Simulate timing - accessing the SECRET_INDEX is FASTER (cache hit)
    // while all other indices are slower (cache miss)
    let simulated_time = if index == SECRET_INDEX {
        0.02
    } else {
        0.12 + (index as f64 * 0.005)
    };
    
    // Track which indices were accessed (for visualization)
    let mut access_pattern = vec![0; buffer_size];
    access_pattern[index] = 1;
    
    CacheTimingResult {
        message: format!("Accessed key byte: 0x{:02X}", accessed_value),
        simulated_time_ms: simulated_time,
        access_pattern,
        memory_value: accessed_value,
    }
}

// Safe implementation - access pattern doesn't depend on secret data
#[wasm_bindgen]
pub fn safe_cache_timing(probe_index: u32) -> CacheTimingResult {
    let buffer_size = 16;
    let mut lookup_table: Vec<u8> = vec![0; buffer_size];
    
    // Lookup table filled with "encryption key" bytes
    lookup_table[0] = 0x7A;
    lookup_table[1] = 0x2B;
    lookup_table[2] = 0x15;
    lookup_table[3] = 0xED;
    lookup_table[4] = 0x9C;
    lookup_table[5] = 0x5F;
    lookup_table[6] = 0xD1;
    lookup_table[7] = 0x41;
    lookup_table[8] = 0x86;
    lookup_table[9] = 0x03;
    lookup_table[10] = 0xB2;
    lookup_table[11] = 0xA7;
    lookup_table[12] = 0xE4; // The "secret" key byte at index 12
    lookup_table[13] = 0x6D;
    lookup_table[14] = 0x33;
    lookup_table[15] = 0xC8;
    
    // Convert probe index to usize and ensure it's within bounds
    let index = (probe_index as usize) % buffer_size;
    
    // Always access EVERY element in the table regardless of the secret index
    let mut accessed_value = 0;
    let mut dummy_accumulator = 0u8;
    
    for i in 0..buffer_size {
        // Access every element to prevent optimization
        let value = lookup_table[i];
        if i == index {
            accessed_value = value;
        } else {
            // Use the value in a way that can't be optimized away
            // but doesn't affect the actual result
            dummy_accumulator = dummy_accumulator.wrapping_add(value);
        }
    }
    
    // Use the dummy_accumulator in a way that doesn't affect the result
    // but prevents the compiler from optimizing away the accesses
    if dummy_accumulator == 255 {
        // This condition is very unlikely but prevents optimization
        accessed_value = accessed_value.wrapping_add(0);
    }
    
    // Track all memory accesses (for visualization)
    let access_pattern = vec![1; buffer_size];
    
    CacheTimingResult {
        message: format!("Accessed key byte: 0x{:02X}", accessed_value),
        simulated_time_ms: 0.25, // Constant time regardless of index (milliseconds)
        access_pattern,
        memory_value: accessed_value,
    }
}