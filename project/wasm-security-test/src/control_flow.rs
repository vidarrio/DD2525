use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn safe_function() -> i32 {
    42
}

#[wasm_bindgen]
pub fn secret_function() -> i32 {
    1337
}

#[wasm_bindgen]
pub fn call_by_index(index: usize) -> i32 {
    let table: [fn() -> i32; 2] = [safe_function, secret_function];
    if index < table.len() {
        table[index]()
    } else {
        -1 // Invalid index
    }
}

#[wasm_bindgen]
pub fn call_by_index_cfi(index: usize) -> i32 {
    match index {
        0 => safe_function(),
        // Do not expose secret_function via table
        _ => -1,
    }
}

