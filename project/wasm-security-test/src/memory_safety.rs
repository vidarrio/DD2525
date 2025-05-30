use wasm_bindgen::prelude::*;

// UNSAFE VERSION: Buffer overflow vulnerability
#[wasm_bindgen]
pub fn unsafe_copy_user_data(input: &str, position: usize) -> String {
    if position + input.len() > 32 {
        return format!(
            "[Error]\nYou tried to write {} bytes at position {} (position + input length = {}).\nThis would exceed the total buffer size of 32 bytes.\n\nNo write was performed. Please enter a shorter input or a lower position so that the data fits within the 32-byte region.",
            input.len(), position, position + input.len()
        );
    }

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
    if position + input.len() > 32 {
        return format!(
            "[Error]\nYou tried to write {} bytes at position {} (position + input length = {}).\nThis would exceed the total buffer size of 32 bytes.\n\nNo write was performed. Please enter a shorter input or a lower position so that the data fits within the 32-byte region.",
            input.len(), position, position + input.len()
        );
    }

    // Create two adjacent arrays in memory (mirroring unsafe version)
    let mut buffer1 = [b'A'; 16]; // First buffer filled with 'A's
    let buffer2 = [b'B'; 16]; // Second buffer filled with 'B's
    
    // Safe copy - panics if out of bounds
    for (i, byte) in input.bytes().enumerate() {
        buffer1[position + i] = byte;
    }
    
    // Show both buffers to demonstrate NO corruption in buffer2
    let result1 = String::from_utf8_lossy(&buffer1).to_string();
    let result2 = String::from_utf8_lossy(&buffer2).to_string();
    
    format!("\nBuffer 1: {}\nBuffer 2: {}", result1, result2)
}

// Unsafe version: Heap metadata corruption
#[wasm_bindgen]
pub fn unsafe_heap_corruption(input: &str, position: usize) -> String {
    if position + input.len() > 32 {
        return format!(
            "[Error]\nYou tried to write {} bytes at position {} (position + input length = {}).\nThis would exceed the total buffer size of 32 bytes.\n\nNo write was performed. Please enter a shorter input or a lower position so that the data fits within the 32-byte region.",
            input.len(), position, position + input.len()
        );
    }

    // Allocate a single buffer, treat as two regions
    let mut buffer = vec![b'A'; 16];
    buffer.extend(vec![b'B'; 16]); // buffer[0..16] = 'A', buffer[16..32] = 'B'
    let (region1, region2) = buffer.split_at_mut(16);

    unsafe {
        let ptr = region1.as_mut_ptr();
        for (i, byte) in input.bytes().enumerate() {
            *ptr.add(position + i) = byte;
        }
    }

    let result1 = String::from_utf8_lossy(region1);
    let result2 = String::from_utf8_lossy(region2);
    format!("\nRegion 1: {}\nRegion 2: {}", result1, result2)
}

// Safe version: Heap metadata corruption
#[wasm_bindgen]
pub fn safe_heap_corruption(input: &str, position: usize) -> String {
    if position + input.len() > 32 {
        return format!(
            "[Error]\nYou tried to write {} bytes at position {} (position + input length = {}).\nThis would exceed the total buffer size of 32 bytes.\n\nNo write was performed. Please enter a shorter input or a lower position so that the data fits within the 32-byte region.",
            input.len(), position, position + input.len()
        );
    }

    // Allocate a single buffer, treat as two regions
    let mut buffer = vec![b'A'; 16];
    buffer.extend(vec![b'B'; 16]); // buffer[0..16] = 'A', buffer[16..32] = 'B'
    let (region1, region2) = buffer.split_at_mut(16);

    for (i, byte) in input.bytes().enumerate() {
        // Panics if position + i >= 16
        region1[position + i] = byte;
    }

    let result1 = String::from_utf8_lossy(region1);
    let result2 = String::from_utf8_lossy(region2);
    format!("\nRegion 1: {}\nRegion 2: {}", result1, result2)
}

// Stack overflow (infinite recursion, safe)
#[wasm_bindgen]
#[allow(unconditional_recursion)]
pub fn stack_overflow() {
    // This will always overflow the stack and trap in WASM
    stack_overflow(); 
}
