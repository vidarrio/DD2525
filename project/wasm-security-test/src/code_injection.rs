use wasm_bindgen::prelude::*;

// VULNERABLE VERSION: XSS through unsafe HTML generation
#[wasm_bindgen]
pub fn vulnerable_render_user_content(user_input: &str) -> String {
    // VULNERABILITY: Direct HTML generation with user input
    let html = format!(
        r#"<div class="user-content">
            <h3>User Content:</h3>
            <p>{}</p>
            <div class="metadata">Submitted by user</div>
        </div>"#, 
        user_input
    );
    
    format!("Generated HTML: {}", html)
}

// SECURE VERSION: XSS-safe content rendering with sanitization
#[wasm_bindgen]
pub fn secure_render_user_content(user_input: &str) -> String {
    // Sanitize the user input before using it
    let sanitized_input = sanitize_input(user_input);
    
    // Generate safe HTML with sanitized content
    let html = format!(
        r#"<div class="user-content-safe">
            <h3>Secure User Content:</h3>
            <p>{}</p>
            <div class="metadata">Safely rendered content</div>
        </div>"#, 
        sanitized_input
    );
    
    format!("Generated safe HTML: {}", html)
}

// Helper function to sanitize user input
fn sanitize_input(input: &str) -> String {
    input
        .replace("&", "&amp;")  // Must be first to avoid double-encoding
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\"", "&quot;")
        .replace("'", "&#x27;")
        .replace("/", "&#x2F;")
        .chars()
        .filter(|c| c.is_ascii_graphic() || c.is_ascii_whitespace())
        .collect()
}

// VULNERABILITY: Dynamic JavaScript code generation
#[wasm_bindgen]
pub fn vulnerable_generate_javascript(user_function_name: &str, user_code: &str) -> String {
    // VULNERABILITY: Direct code injection without validation
    let javascript = format!(
        r#"function {}() {{
            console.log("User function executing...");
            {};
            return "Function executed successfully";
        }}"#, 
        user_function_name, user_code
    );
    
    format!("Generated JavaScript: {}", javascript)
}

// SECURE VERSION: Safe code generation with whitelisting
#[wasm_bindgen]
pub fn secure_generate_javascript(user_function_name: &str, user_code: &str) -> String {
    // Validate function name (alphanumeric only)
    if !user_function_name.chars().all(|c| c.is_alphanumeric()) {
        return "Error: Function name must be alphanumeric only".to_string();
    }
    
    // Whitelist allowed operations for the user code
    let allowed_operations = [
        "return ", "console.log(", "Math.", "parseInt(", "parseFloat(",
        "typeof ", "length", "+", "-", "*", "/", "(", ")", " ", ";"
    ];
    
    // Check if user code contains only allowed operations
    let safe_code = if allowed_operations.iter().any(|&op| user_code.contains(op)) 
        && !user_code.contains("alert")
        && !user_code.contains("document")
        && !user_code.contains("window")
        && !user_code.contains("eval") {
        user_code.to_string()
    } else {
        "console.log('Code blocked for security')".to_string()
    };
    
    let javascript = format!(
        r#"function {}() {{
            console.log("Safe user function executing...");
            {};
            return "Function executed safely";
        }}"#, 
        user_function_name, safe_code
    );
    
    format!("Generated safe JavaScript: {}", javascript)
}



// Common XSS payloads for educational purposes
#[wasm_bindgen]
pub fn get_xss_payloads() -> String {
    let payloads = vec![
        "<script>alert('Basic XSS')</script>",
        "<img src=x onerror=alert('Image XSS')>",
        "<iframe src=\"javascript:alert('Iframe XSS Demo - Educational Only')\"></iframe>",
        "<object data=\"data:text/html,<script>alert('Object XSS Demo')</script>\">",
        "<embed src=\"data:text/html,<script>alert('Embed XSS Demo')</script>\">",
        "<form><button formaction=\"javascript:alert('Form XSS Demo')\">Click</button></form>",
    ];
    
    format!("Common XSS payloads for testing:\n{}", payloads.join("\n"))
}

// Show different injection contexts
#[wasm_bindgen]
pub fn demonstrate_injection_contexts() -> String {
    let contexts = vec![
        "HTML Context: <div>USER_INPUT</div>",
        "Attribute Context: <img src=\"USER_INPUT\">",
        "JavaScript Context: var x = \"USER_INPUT\";",
        "CSS Context: .class { color: USER_INPUT; }",
        "URL Context: window.location = \"USER_INPUT\";",
        "Template Context: Hello {{USER_INPUT}}!",
    ];
    
    format!("Different injection contexts:\n{}", contexts.join("\n"))
}