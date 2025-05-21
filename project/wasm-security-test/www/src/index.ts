import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Initialize the React application
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
  console.log('React app rendered');
} else {
  console.error('Root element not found');
}