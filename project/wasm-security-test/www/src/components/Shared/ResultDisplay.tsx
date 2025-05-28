import React from 'react';

interface ResultDisplayProps {
  result: string;
  type?: 'success' | 'error' | 'neutral';
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  type = 'neutral',
  className = ''
}) => {
  if (!result) return null;

  return (
    <div className={`result ${type} ${className}`}>
      {result}
    </div>
  );
};

export default ResultDisplay;
