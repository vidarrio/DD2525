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
    
    // For the demo, we'll use simple fixed passwords
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

// Create a struct to return timing result and debugging info
#[wasm_bindgen]
pub struct TimingResult {
    message: String,
    simulated_time_ms: f64,
    matching_chars: u32,
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
    
    #[wasm_bindgen(getter)]
    pub fn matching_chars(&self) -> u32 {
        self.matching_chars
    }
}

// UNSAFE VERSION: Leaks password length through timing
#[wasm_bindgen]
pub fn unsafe_check_credentials_timing(username: &str, password: &str) -> TimingResult {
    // For demo purposes, we only use the admin account
    if username != "admin" {
        return TimingResult {
            message: "Error: Invalid username or password".to_string(),
            simulated_time_ms: 50.0, // Base processing time
            matching_chars: 0,
        };
    }
    
    let correct_password = "admin123";
    
    // Insecure character-by-character comparison
    let mut is_correct = true;
    let min_length = std::cmp::min(password.len(), correct_password.len());
    let mut matching_chars = 0;
    
    for i in 0..min_length {
        // Check each character
        if password.chars().nth(i) != correct_password.chars().nth(i) {
            is_correct = false;
            break;
        }
        
        matching_chars += 1;
    }
    
    // If lengths are different, it's incorrect
    if password.len() != correct_password.len() {
        is_correct = false;
    }
    
    // SIMULATED TIMING:
    // Base processing time (50ms) + 2ms for each matching character
    // This simulates what would happen with real processing delays
    let simulated_time = 50.0 + (matching_chars as f64 * 2.0);
    
    TimingResult {
        message: if is_correct {
            "Login successful".to_string()
        } else {
            "Error: Invalid username or password".to_string()
        },
        simulated_time_ms: simulated_time,
        matching_chars,
    }
}

// SAFE VERSION: Constant-time comparison
#[wasm_bindgen]
pub fn safe_check_credentials_timing(username: &str, password: &str) -> TimingResult {
    // For demo purposes, we only use the admin account
    if username != "admin" {
        return TimingResult {
            message: "Error: Invalid username or password".to_string(),
            simulated_time_ms: 300.0, // Constant processing time
            matching_chars: 0,
        };
    }
    
    let correct_password = "admin123";
    
    // Constant-time comparison - we always check all characters
    // and use a bitwise operation to track correctness
    let mut result = if password.len() == correct_password.len() { 1 } else { 0 };
    
    // Compare all characters in constant time
    for i in 0..std::cmp::max(password.len(), correct_password.len()) {
        let pass_char = if i < password.len() { password.chars().nth(i).unwrap() as u32 } else { 0 };
        let correct_char = if i < correct_password.len() { correct_password.chars().nth(i).unwrap() as u32 } else { 0 };
        
        // Use bitwise AND to accumulate the result without branching
        result &= if pass_char == correct_char { 1 } else { 0 };
    }
    
    // SIMULATED TIMING:
    // In the secure version, timing is constant regardless of input
    let correct_chars = if result == 1 { correct_password.len() as u32 } else { 0 };
    
    TimingResult {
        message: if result == 1 {
            "Login successful".to_string()
        } else {
            "Error: Invalid username or password".to_string()
        },
        simulated_time_ms: 300.0, // Always constant time
        matching_chars: correct_chars,
    }
}