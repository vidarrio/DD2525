import React, { useState } from 'react';
import StarryNightHighlighter from './StarryNightHighlighter';

interface CodeViewerProps {
  unsafeCode: string;
  safeCode: string;
  title?: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ unsafeCode, safeCode, title = "Implementation Code" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'unsafe' | 'safe'>('unsafe');

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
          <div className="code-content">
            <StarryNightHighlighter
              code={activeTab === 'unsafe' ? unsafeCode : safeCode}
              language="rust"
              className={activeTab === 'unsafe' ? 'unsafe-code starry-night-block' : 'safe-code starry-night-block'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;