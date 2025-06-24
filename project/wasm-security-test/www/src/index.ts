import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import CSS - these will be processed by webpack's css-loader
import './styles/index.css'; // Main CSS that imports common styles
import './styles/shared-components.css'; // Shared component styles
import './styles/memory-safety/index.css';
import './styles/side-channels/index.css';
import './styles/control-flow/index.css';
import './styles/code-injection/index.css';
import './styles/sandbox-escapes/index.css';
import './styles/concurrency/index.css';

// Import dangerous host functions for sandbox escape demonstration
import './utils/dangerousHostFunctions';

// Initialize the React application
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
  console.log('React app rendered');
} else {
  console.error('Root element not found');
}