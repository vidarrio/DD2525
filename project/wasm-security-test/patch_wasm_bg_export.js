// Patch the wasm-bindgen glue file to export the raw wasm instance for JS-side CFI demo
const fs = require('fs');
const path = require('path');

const gluePath = path.join(__dirname, 'pkg', 'wasm_security_test_bg.js');
const exportLine = 'export { wasm };\n';

let glue = fs.readFileSync(gluePath, 'utf8');

if (!glue.includes('export { wasm };')) {
  // Insert export at the end
  glue += '\n' + exportLine;
  fs.writeFileSync(gluePath, glue, 'utf8');
  console.log('Patched wasm_security_test_bg.js to export { wasm }');
} else {
  console.log('wasm_security_test_bg.js already exports { wasm }');
}
