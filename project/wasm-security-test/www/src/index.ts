import * as wasm from "wasm-security-test";
import { setupMemorySafetyDemo } from './components/memory_safety';
import { setupCodeInjectionDemo } from './components/code_injection';
import { setupSideChannelDemo } from './components/side_channels';
import { setupSandboxEscapeDemo } from './components/sandbox_escapes';

import { setupHeader } from './components/header';

// Function to handle navigation between pages
export function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  
  console.log('Nav links found:', navLinks.length);
  console.log('Pages found:', pages.length);
  
  // Debug every nav link found
  navLinks.forEach(link => {
    console.log('Nav link:', link.getAttribute('href'), link);
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href')?.substring(1);
      console.log('Navigation clicked, target:', targetId);
      
      if (targetId) {
        // Update URL hash
        window.location.hash = targetId;
        
        // Hide all pages
        pages.forEach(page => {
          page.classList.remove('active');
        });
        
        // Show the target page
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
          targetPage.classList.add('active');
          console.log('Activated page:', targetId);
        } else {
          console.error('Target page not found:', targetId);
        }
        
        // Update active state in navigation
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
        });
        link.classList.add('active');
      }
    });
  });
}

export function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  console.log('Tab buttons found:', tabButtons.length);
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the parent element (the tabs container)
      const tabsContainer = button.closest('.tabs')?.parentElement;
      if (!tabsContainer) return;
      
      // Get the tab to display based on the data-tab attribute
      const tabToActivate = button.getAttribute('data-tab');
      console.log('Tab clicked:', tabToActivate);
      
      if (tabToActivate) {
        // Remove active class from all tab buttons in this container
        const siblingButtons = tabsContainer.querySelectorAll('.tab-btn');
        siblingButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all tab content sections in this container
        const tabContents = tabsContainer.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Try different ID patterns to find the tab content
        const pageId = tabsContainer.id || button.closest('.page')?.id || '';
        
        // First look for IDs in the format "pageId-tabId" (e.g., "memory-safety-exploit")
        const targetContent = tabsContainer.querySelector(`#${pageId}-${tabToActivate}`);
        if (targetContent) {
          targetContent.classList.add('active');
          console.log('Found tab content with ID:', `${pageId}-${tabToActivate}`);
        } else {
          // Try "tabId-pageId" format
          const altTargetContent = tabsContainer.querySelector(`#${tabToActivate}-${pageId}`);
          if (altTargetContent) {
            altTargetContent.classList.add('active');
            console.log('Found tab content with alternative ID:', `${tabToActivate}-${pageId}`);
          } else {
            // Final fallback - just look by tab ID
            const simpleTargetContent = tabsContainer.querySelector(`#${tabToActivate}`);
            if (simpleTargetContent) {
              simpleTargetContent.classList.add('active');
              console.log('Found tab content with simple ID:', tabToActivate);
            } else {
              console.error('No matching tab content found for:', tabToActivate);
            }
          }
        }
      }
    });
  });
}

// Initialize the application
function init() {
    console.log('Init function called');

    // Setup navigation and UI components
    setupNavigation();
    setupHeader();
    setupTabs(); // Add tab functionality
    
    // Setup demos
    setupMemorySafetyDemo();
    setupCodeInjectionDemo();
    setupSideChannelDemo();
    setupSandboxEscapeDemo();
}

init();