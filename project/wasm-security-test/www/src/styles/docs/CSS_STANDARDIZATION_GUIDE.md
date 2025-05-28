# CSS Standardization Guide

## Overview

The CSS system has been refactored to eliminate duplication and provide a consistent, maintainable styling system using CSS variables and standardized component classes.

## CSS Variables System

### Core Variables (defined in `variables.css`)

#### Colors
- `--primary-color`: Main brand color (#0078d7)
- `--success-color`: Success/safe actions (#28a745)
- `--danger-color`: Danger/unsafe actions (#dc3545)
- `--warning-color`: Warning states (#ffc107)
- `--info-color`: Informational content (#0056b3)

#### Button System
- `--btn-safe-bg`, `--btn-safe-hover`, `--btn-safe-active`: Safe action buttons
- `--btn-unsafe-bg`, `--btn-unsafe-hover`, `--btn-unsafe-active`: Unsafe action buttons
- `--btn-primary-bg`, `--btn-primary-hover`: Primary buttons

#### Layout & Spacing
- `--spacing-xs` to `--spacing-xl`: Consistent spacing scale
- `--border-radius-sm` to `--border-radius-xl`: Border radius scale
- `--transition-fast`, `--transition-normal`, `--transition-slow`: Animation timing

#### Dark Mode Variables
Dark mode automatically overrides colors using `[data-theme="dark"]` selectors.

## Standardized Component Classes

### Buttons

#### Basic Button Classes
```css
.run-button           /* Base run button */
.run-button.safe      /* Safe/secure action */
.run-button.unsafe    /* Unsafe/vulnerable action */
.run-button.active    /* Currently active button */
.run-button.stop      /* Stop/cancel action */
```

#### Usage Example
```html
<button class="run-button safe">Run Safe Implementation</button>
<button class="run-button unsafe">Run Vulnerable Implementation</button>
```

### Tabs

#### Tab Classes
```css
.tabs                 /* Tab container */
.tab-btn              /* Individual tab button */
.tab-btn.active       /* Active tab */
.tab-content          /* Tab content panel */
.tab-content.active   /* Visible tab content */
```

#### Usage Example
```html
<div class="tabs">
  <button class="tab-btn active">Tab 1</button>
  <button class="tab-btn">Tab 2</button>
</div>
<div class="tab-content active">Content 1</div>
<div class="tab-content">Content 2</div>
```

### Layout Components

#### Control Elements
```css
.control-row          /* Row of controls/buttons */
.control-group        /* Grouped form elements */
.implementation-label /* Labels for implementations */
.mode-toggle          /* Radio button groups */
```

### Form Elements

#### Form Classes
```css
.form-group           /* Form field container */
.form-group label     /* Form labels */
.form-group input     /* Form inputs */
```

### Status & Result Messages

#### Message Classes
```css
.result               /* Base result message */
.result.success       /* Success message */
.result.error         /* Error message */
.result.warning       /* Warning message */
.result.info          /* Info message */

.security-success     /* Security-specific success */
.security-error       /* Security-specific error */
.security-warning     /* Security-specific warning */
.security-info        /* Security-specific info */
```

### Display Components

#### Display Classes
```css
.output               /* Code/text output areas */
.code-block           /* Code display blocks */
.wasm-errors          /* WASM error displays */
```

## Migration Guide

### For New Components

1. **Use CSS Variables**: Always use variables instead of hardcoded colors
2. **Use Standard Classes**: Apply existing component classes before creating new ones
3. **Follow Naming Convention**: Use semantic names that describe function, not appearance

### Updating Existing Files

1. **Remove Duplicated Styles**: Check if standardized classes already exist
2. **Replace Hardcoded Colors**: Use CSS variables instead
3. **Simplify Dark Mode**: Let variables handle theme switching automatically

### Example Migration

#### Before (duplicated styles):
```css
.my-component .button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
}

.my-component .button:hover {
  background-color: #218838;
}
```

#### After (using standards):
```css
.my-component .run-button {
  /* Safe button styling handled by .run-button.safe class */
}
```

```html
<button class="run-button safe">My Button</button>
```

## File Structure

```
styles/
├── variables.css              # All CSS variables
├── components.css             # Standardized component classes
├── dark-mode-simplified.css   # Minimal dark mode overrides
├── index.css                  # Main import file
└── category-specific/
    ├── control-flow/
    │   ├── tabs.css          # Simplified, category-specific only
    │   └── implementation-buttons.css
    └── other-categories/     # Each only contains unique styles
```

## Benefits

1. **Consistency**: All components use the same color palette and spacing
2. **Maintainability**: Change colors/spacing in one place (variables.css)
3. **Dark Mode**: Automatic theme switching with CSS variables
4. **Performance**: Smaller CSS files, less duplication
5. **Developer Experience**: Clear, semantic class names
6. **Accessibility**: Consistent focus states and color contrast

## Best Practices

1. **Always check `components.css`** before creating new styles
2. **Use semantic class names** (`.run-button.safe` not `.green-button`)
3. **Prefer CSS variables** over hardcoded values
4. **Test in both light and dark modes**
5. **Keep category-specific files minimal** and focused on unique requirements
