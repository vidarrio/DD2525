mod utils;
mod memory_safety; // Add this line

use wasm_bindgen::prelude::*;

// Export the memory safety functions
pub use memory_safety::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}