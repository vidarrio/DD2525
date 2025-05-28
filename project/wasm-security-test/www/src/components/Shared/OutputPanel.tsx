import React from 'react';

interface OutputPanelProps {
  title: string;
  children: React.ReactNode;
  type?: 'default' | 'success' | 'error' | 'warning';
  className?: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  title,
  children,
  type = 'default',
  className = ''
}) => {
  return (
    <div className={`output-panel ${type} ${className}`}>
      <h4>{title}</h4>
      <div className="output-content">
        {children}
      </div>
    </div>
  );
};

export default OutputPanel;
