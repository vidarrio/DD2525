use wasm_bindgen::prelude::*;

// UNSAFE VERSION: Buffer overflow vulnerability
#[wasm_bindgen]
pub fn unsafe_copy_user_data(input: &str, position: usize) -> String {
    // Create two adjacent arrays in memory
    let mut buffer1 = [b'A'; 16]; // First buffer filled with 'A's
    let buffer2 = [b'B'; 16]; // Second buffer filled with 'B's
    
    unsafe {
        // Get a raw pointer to our first buffer
        let buffer_ptr = buffer1.as_mut_ptr();
        
        // Perform unsafe memory writes without bounds checking
        for (i, byte) in input.bytes().enumerate() {
            *buffer_ptr.add(position + i) = byte;
        }
    }
    
    // Show both buffers to demonstrate the corruption
    let result1 = String::from_utf8_lossy(&buffer1).to_string();
    let result2 = String::from_utf8_lossy(&buffer2).to_string();
    
    format!("\nBuffer 1: {}\nBuffer 2: {}", result1, result2)
}

// SAFE VERSION: Memory-safe copy
#[wasm_bindgen]
pub fn safe_copy_user_data(input: &str, position: usize) -> String {
    // Create two adjacent arrays in memory (mirroring unsafe version)
    let mut buffer1 = [b'A'; 16]; // First buffer filled with 'A's
    let buffer2 = [b'B'; 16]; // Second buffer filled with 'B's
    
    // Safe copy - with bounds checking
    for (i, byte) in input.bytes().enumerate() {
        // Only write if we're within the bounds of buffer1
            buffer1[position + i] = byte;
    }
    
    // Show both buffers to demonstrate NO corruption in buffer2
    let result1 = String::from_utf8_lossy(&buffer1).to_string();
    let result2 = String::from_utf8_lossy(&buffer2).to_string();
    
    format!("\nBuffer 1: {}\nBuffer 2: {}", result1, result2)
}