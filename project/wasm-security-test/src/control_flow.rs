use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn safe_function() -> i32 {
    42
}

#[wasm_bindgen]
pub fn secret_function() -> i32 {
    1337
}
