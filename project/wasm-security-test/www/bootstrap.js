console.log('Bootstrap loading...');
import('./src/index.ts')
  .then(() => console.log('Index loaded successfully'))
  .catch(e => console.error('Error loading index:', e));