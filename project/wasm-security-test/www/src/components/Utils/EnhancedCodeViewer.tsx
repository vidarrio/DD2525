import React, { useState } from 'react';
import StarryNightHighlighter from './StarryNightHighlighter';
import '../../styles/code-injection/code-viewer.css';

interface EnhancedCodeViewerProps {
  unsafeCode?: string;
  safeCode?: string;
  singleCode?: string;
  title?: string;
}

const EnhancedCodeViewer: React.FC<EnhancedCodeViewerProps> = ({ 
  unsafeCode, 
  safeCode, 
  singleCode, 
  title = "Implementation Code" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'unsafe' | 'safe'>('unsafe');
  
  // Determine if we're using single code mode
  const isSingleCodeMode = !!singleCode;

  // Use a more generic button label
  const buttonLabel = isOpen ? 'Hide Code' : 'Show Code';

  return (
    <div className="code-viewer-container">
      <button 
        className="code-toggle-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonLabel}
      </button>
      {isOpen && (
        <div className="code-panel">
          <h4>{title}</h4>
          {/* Only show tabs if we have both unsafe and safe code */}
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
          <div className="code-content">
            <StarryNightHighlighter
              code={isSingleCodeMode ? singleCode! : (activeTab === 'unsafe' ? unsafeCode! : safeCode!)}
              language="rust"
              className={isSingleCodeMode ? 'single-code starry-night-block' : (activeTab === 'unsafe' ? 'unsafe-code starry-night-block' : 'safe-code starry-night-block')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCodeViewer;
