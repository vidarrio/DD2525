import React from 'react';

interface SecurityMessageProps {
  type: 'warning' | 'success' | 'info';
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SecurityMessage: React.FC<SecurityMessageProps> = ({
  type,
  title,
  children,
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      default:
        return '';
    }
  };

  return (
    <div className={`security-${type} ${className}`}>
      <strong>{getIcon()} {title}:</strong> {children}
    </div>
  );
};

export default SecurityMessage;
