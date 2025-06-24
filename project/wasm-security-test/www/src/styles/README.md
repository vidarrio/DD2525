# Styles Organization

## Structure

### Root Level Files
- `index.css` - Main entry point, imports core styles
- `variables.css` - CSS custom properties and theme variables
- `dark-mode.css` - Dark/light theme toggle functionality
- `layout.css` - Core layout and grid systems
- `header.css` - Header component styles
- `components.css` - Shared component styles (buttons, forms, etc.)
- `shared-components.css` - Additional shared component styles
- `exploits.css` - Common exploit page styles
- `home.css` - Home page specific styles

### Category Folders
Each exploit category has its own folder with modular CSS:
- `code-injection/` - Code injection exploit styles
- `concurrency/` - Concurrency exploit styles (TOCTOU, etc.)
- `control-flow/` - Control flow exploit styles (CFI, etc.)
- `dos-attacks/` - DoS attack styles
- `memory-safety/` - Memory safety exploit styles
- `sandbox-escapes/` - Sandbox escape exploit styles
- `side-channels/` - Side channel attack styles

Each category folder contains:
- `index.css` - Main import file for the category
- Individual component CSS files for specific exploits

### Documentation
- `docs/` - Contains historical documentation and guides

## Import Pattern

1. **Global styles** are imported in `/src/index.ts`:
   ```typescript
   import './styles/index.css'; // Core styles
   import './styles/shared-components.css';
   import './styles/memory-safety/index.css';
   import './styles/side-channels/index.css';
   // ... other categories
   ```

2. **Component-specific styles** are imported directly in components:
   ```typescript
   import '../../../styles/concurrency/index.css';
   import '../../../../styles/control-flow/function-table.css';
   ```

## CSS Variables

All styling uses CSS custom properties defined in `variables.css`:
- Color system with theme support
- Consistent spacing and typography
- Standardized component tokens

## Maintenance

- Keep category styles modular and separate
- Use CSS variables instead of hardcoded values
- Import specific styles only where needed
- Document any new patterns in this README
