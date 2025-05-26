mod utils;
mod memory_safety;
mod side_channel;
mod control_flow;
mod sandbox_escapes;

use wasm_bindgen::prelude::*;

// export the utils module
pub use utils::set_panic_hook;

// Export the memory safety functions
pub use memory_safety::*;

// Export the side-channel functions
pub use side_channel::*;

// Export the control flow functions
pub use control_flow::*;

// Export the sandbox escape functions
pub use sandbox_escapes::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
