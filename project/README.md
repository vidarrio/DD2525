# Project: A dive into WebAssembly: Exploitation and Mitigation

[Live Demo](https://vidarrio.github.io/DD2525/)

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) with `wasm32-unknown-unknown` target
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/) (version 23.11.1 or higher)

## Installation and Setup

1. Install Rust target for WebAssembly:
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

2. Install wasm-pack:
   ```bash
   cargo install wasm-pack
   ```

3. Build the WebAssembly package:
   ```bash
   cd wasm-security-test
   wasm-pack build
   ```
4. Patch the webassembly package (needed for certain exploit demonstrations):
   ```bash
   node patch_wasm_bg_export.js
   ```

5. Install frontend dependencies:
   ```bash
   cd www
   npm install
   ```

## Running the Project

Start the development server:
```bash
cd wasm-security-test/www
npm run start
```

The application will be available at [http://localhost:8080](http://localhost:8080).

