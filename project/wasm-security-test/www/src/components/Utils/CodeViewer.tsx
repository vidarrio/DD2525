import React, { useState } from 'react';
import StarryNightHighlighter from './StarryNightHighlighter';
import '../../styles/code-injection/code-viewer.css';

interface CodeViewerProps {
  unsafeCode?: string;
  safeCode?: string;
  title?: string;
  singleCode?: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ unsafeCode, safeCode, singleCode, title = "Implementation Code" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'unsafe' | 'safe'>('unsafe');
  
  // Determine if we're in single code mode
  const isSingleCodeMode = !!singleCode;

  // Use a more generic button label
  const buttonLabel = isOpen ? 'Hide Code' : 'Show Code';
  
  // Background color based on theme - darker in dark mode
  const bgColorStyle = { ['--bg-override' as string]: '#1e1e1e' };

  return (
    <div className="code-viewer-container">
      {/* Only show toggle button if we're not in single code mode */}
      {!isSingleCodeMode && (
        <button 
          className="code-toggle-button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {buttonLabel}
        </button>
      )}
      
      {/* Show code panel if we're in single code mode or if the panel is open */}
      {(isSingleCodeMode || isOpen) && (
        <div className={`code-panel ${isSingleCodeMode ? 'single-code-panel' : ''}`}>
          {/* Only show h4 title if not in single code mode */}
          {!isSingleCodeMode && <h4>{title}</h4>}
          
          {/* Only show tabs if we're not in single code mode and we have both unsafe and safe code */}
          {!isSingleCodeMode && unsafeCode && safeCode && (
            <div className="code-tabs">
              <button 
                className={`code-tab ${activeTab === 'unsafe' ? 'active' : ''}`} 
                onClick={() => setActiveTab('unsafe')}
              >
                Unsafe Version
              </button>
              <button 
                className={`code-tab ${activeTab === 'safe' ? 'active' : ''}`} 
                onClick={() => setActiveTab('safe')}
              >
                Safe Version
              </button>
            </div>
          )}
          
          {/* Add a header bar for single code mode */}
          {isSingleCodeMode && (
            <div className="single-code-header">{title}</div>
          )}
          
          <div className="code-content dark-code-bg" style={bgColorStyle}>
            <StarryNightHighlighter
              code={isSingleCodeMode ? singleCode! : (activeTab === 'unsafe' ? (unsafeCode || 'No unsafe implementation provided.') : (safeCode || 'No safe implementation provided.'))}
              language="rust"
              className={isSingleCodeMode ? 'single-code starry-night-block' : (activeTab === 'unsafe' ? 'unsafe-code starry-night-block' : 'safe-code starry-night-block')}
              style={bgColorStyle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;