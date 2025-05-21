import * as wasm from "wasm-security-test";

function hello_world() {
    const name = "WebAssembly Security Demo";
    
    // Call the greeting function from our Rust WASM module
    wasm.greet(name);
}

export { hello_world };