import React from 'react';

export interface ImplementationContainerProps {
  title: string;
  description: string;
  type: 'vulnerable' | 'secure';
  children: React.ReactNode;
  className?: string;
}

const ImplementationContainer: React.FC<ImplementationContainerProps> = ({
  title,
  description,
  type,
  children,
  className = ''
}) => {
  return (
    <div className={`implementation ${type} ${className}`}>
      <h4>{title}</h4>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default ImplementationContainer;
