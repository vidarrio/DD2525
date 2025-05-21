export function setupHeader() {
  console.log('Header component initialized');
  
  // Sync URL with active page on page load
  const currentHash = window.location.hash || '#home';
  const currentPage = currentHash.substring(1);
  
  // Find the corresponding nav link and activate it programmatically
  const navLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
  if (navLink) {
    navLink.classList.add('active');
    
    // Also show the correct page
    const targetPage = document.getElementById(currentPage);
    if (targetPage) {
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      targetPage.classList.add('active');
    }
  }
}