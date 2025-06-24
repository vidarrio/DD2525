

# WebAssembly Security Test

This directory contains the Rust code that compiles to WebAssembly for the security demonstration.

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) with `wasm32-unknown-unknown` target
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/) (version 23.11.1 or higher)

## Installation

1. Install Rust target for WebAssembly:
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

2. Install wasm-pack:
   ```bash
   cargo install wasm-pack
   ```

## Building

1. Build the WebAssembly package:
   ```bash
   wasm-pack build
   ```

2. Patch the WebAssembly package (needed for certain exploit demonstrations):
   ```bash
   node patch_wasm_bg_export.js
   ```

This will generate the `pkg/` directory with the compiled WebAssembly files and JavaScript bindings.
