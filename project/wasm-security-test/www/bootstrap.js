console.log('Bootstrap loading...');
import('./src/index')
  .then(() => console.log('React app loaded successfully'))
  .catch(e => console.error('Error loading React app:', e));