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

  return (
    <div className="code-viewer-container">
      <button 
        className="code-toggle-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Code' : 'Show Rust Code'}
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
              className={activeTab === 'unsafe' ? 'unsafe-code' : 'safe-code'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;