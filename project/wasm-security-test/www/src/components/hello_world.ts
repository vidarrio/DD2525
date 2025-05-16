import * as wasm from "wasm-security-test";

function hello_world() {
    const name = "Lumar";

    wasm.greet(name);
}

export { hello_world };
