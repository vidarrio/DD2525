import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home.css';

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minCardHeight, setMinCardHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Array of card categories
  const categories = [
    {
      id: 'memory-safety',
      title: 'Memory Safety',
      description: 'Explore buffer overflows, heap corruption, and other memory safety vulnerabilities in WebAssembly.',
      items: ['Buffer Overflow on Stack', 'Heap Metadata Corruption', 'Stack Overflow']
    },
    {
      id: 'code-injection',
      title: 'Code Injection',
      description: 'Explore vulnerabilities at the WASM-JavaScript boundary where unsanitized user data can lead to XSS and code execution.',
      items: ['WASM-to-DOM Injection', 'Dynamic JS Generation']
    },
    {
      id: 'side-channels',
      title: 'Side-Channel Attacks',
      description: 'Discover how information can leak through timing and storage side channels, even in a sandboxed environment.',
      items: ['Storage Side Channel', 'Timing Side Channel', 'Cache Timing Side Channel']
    },
    {
      id: 'sandbox-escapes',
      title: 'Sandbox Escapes',
      description: 'Explore how WebAssembly\'s sandbox can be compromised when hosts carelessly expose dangerous JavaScript functions.',
      items: ['Dangerous Host Function Exposure']
    },
    {
      id: 'concurrency',
      title: 'Concurrency & Race Conditions',
      description: 'Discover how timing-dependent vulnerabilities like TOCTOU can bypass security checks through race conditions.',
      items: ['Time-of-Check-to-Time-of-Use (TOCTOU)']
    },
    {
      id: 'control-flow',
      title: 'Control Flow Attacks',
      description: 'See how CFI can be bypassed in WASM:',
      items: ['Host Export Exposure', 'Indirect Call Logic Flaw', 'Exported Table Modification']
    }
  ];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate the maximum height of all cards once they're rendered
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, categories.length);
    
    // More aggressive height calculation approach with multiple checks
    const calculateMaxHeight = () => {
      let maxHeight = 0;
      cardRefs.current.forEach(ref => {
        if (ref && ref.scrollHeight > maxHeight) {
          maxHeight = ref.scrollHeight;
        }
      });
      
      if (maxHeight > 0) {
        setMinCardHeight(maxHeight);
        setIsLoading(false); // Mark as loaded once height is calculated
      } else {
        // If we didn't get a height yet, try again
        return false;
      }
      return true;
    };
    
    // Try immediately for faster initial render
    if (!calculateMaxHeight()) {
      // If immediate calculation failed, try a series of timed calculations
      const attempts = [10, 50, 100, 200, 500]; // Multiple attempts with increasing delays
      
      attempts.forEach(delay => {
        setTimeout(() => {
          calculateMaxHeight();
        }, delay);
      });
    }
    
    // Still keep the resize listener
    window.addEventListener('resize', calculateMaxHeight);
    
    return () => {
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, [categories.length]);

  // Get visible cards (always exactly 4 at a time)
  const getVisibleCardIndices = () => {
    const normalizedIndex = Math.abs(currentIndex % categories.length);
    const visible = [];
    
    // Get indices of the 4 currently visible cards
    for (let i = 0; i < 4; i++) {
      visible.push((normalizedIndex + i) % categories.length);
    }
    
    return visible;
  };

  // Create a duplicate array to show at the end for the loop effect
  const getDisplayCategories = () => {
    // Create a sequence that will allow infinite scrolling in both directions
    const result = [...categories];
    // Add the first 3 items to the end for smooth looping
    result.push(...categories.slice(0, 3));
    return result;
  };
  
  // Pre-render cards offscreen to ensure height is calculated properly
  // Prevents cards from appearing one-by-one with delayed heights
  const renderHiddenCards = () => {
    return (
      <div style={{ 
        position: 'absolute', 
        visibility: 'hidden', 
        height: 0, 
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {categories.map((category, index) => (
          <div
            key={`prerender-${category.id}-${index}`}
            ref={(el: HTMLDivElement | null) => {
              if (!minCardHeight && el) {
                cardRefs.current[index] = el;
              }
            }}
            className={`category-card ${category.id}`}
          >
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            {category.items && (
              <ul>
                {category.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Handle the loop-around effect for infinite scrolling
  useEffect(() => {
    if (currentIndex >= categories.length) {
      // When we reach the end, wait for the animation to complete, then jump back to start
      const timer = setTimeout(() => {
        setIsAnimating(false); // Disable animation temporarily
        setCurrentIndex(0); // Jump to the first card
      }, 400); // Matches the new animation duration
      return () => clearTimeout(timer);
    } else if (currentIndex < 0) {
      // When we go before the beginning, wait for animation to complete, then jump to end
      const timer = setTimeout(() => {
        setIsAnimating(false); // Disable animation temporarily
        setCurrentIndex(categories.length - 1); // Jump to the last card
      }, 400); // Matches the new animation duration
      return () => clearTimeout(timer);
    }
  }, [currentIndex, categories.length]);

  // Move one card to the right
  const slideRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 400); // Match new faster transition duration
  };

  // Move one card to the left
  const slideLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 400); // Match new faster transition duration
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h2>A dive into WebAssembly: Exploitation and Mitigation</h2>
        <p className="lead">
          This interactive demonstration showcases security vulnerabilities in WebAssembly 
          and their corresponding mitigations.
        </p>
      </div>

      <div className="category-section">
        <p>Select a category from the navigation to explore different security aspects:</p>
        
        <div className={`carousel-outer-container ${isLoading ? 'loading' : 'loaded'}`}>
          <button 
            className="carousel-nav-btn prev" 
            onClick={slideLeft}
            disabled={isAnimating || isLoading}
            aria-label="Previous card"
          >
            &lsaquo;
          </button>
          
          <div className="carousel-container">
            <div 
              className="category-cards spinning"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`,
                transition: isAnimating ? 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.0)' : 'none',
                opacity: isLoading ? 0 : 1
              }}
            >
              {getDisplayCategories().map((category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  ref={(el: HTMLDivElement | null) => { 
                    // Only store refs for the original categories
                    if (index < categories.length) {
                      cardRefs.current[index] = el; 
                    }
                  }}
                  className={`category-card ${category.id}`}
                  style={{ minHeight: minCardHeight ? `${minCardHeight}px` : 'auto' }}
                  onClick={() => window.location.assign(`#${category.id}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${category.title} category`}
                  onKeyDown={e => {
                    if (e.key === 'Enter') window.location.assign(`#${category.id}`);
                    if (e.key === ' ') {
                      e.preventDefault();
                      window.location.assign(`#${category.id}`);
                    }
                  }}
                >
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  {category.items && (
                    <ul>
                      {category.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="carousel-nav-btn next" 
            onClick={slideRight}
            disabled={isAnimating}
            aria-label="Next card"
          >
            &rsaquo;
          </button>
        </div>
        
        {/* Prerender hidden cards to ensure proper height calculation */}
        {renderHiddenCards()}
        
        <div className="carousel-pagination">
          {categories.map((_, i) => (
            <span 
              key={i} 
              className={`carousel-dot ${getVisibleCardIndices().includes(i) ? 'active' : ''}`}
              onClick={() => { 
                if (!isAnimating && !isLoading) {
                  setIsAnimating(true);
                  // When clicking pagination dots, set to the corresponding index
                  setCurrentIndex(i);
                  setTimeout(() => setIsAnimating(false), 400);
                } 
              }}
              role="button"
              tabIndex={0}
              aria-label={`Go to card ${i + 1}`}
            ></span>
          ))}
        </div>
      </div>
      
      <div className="project-info">
        <h3>About This Project</h3>
        <p>
          This demonstration was developed for the Language-Based Security course (DD2525) at KTH Royal Institute of Technology.
          It showcases both vulnerable and secure implementations of various security-critical functions.
        </p>
        <p>
          The critical functionality is implemented in Rust and compiled to WebAssembly, running directly in your browser.
          The user interface is built with React for interactive visualization of the security concepts.
        </p>
      </div>
    </div>
  );
};

export default Home;