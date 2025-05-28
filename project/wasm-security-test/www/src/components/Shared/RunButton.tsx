import React from 'react';

interface RunButtonProps {
  type?: 'safe' | 'unsafe' | 'primary' | 'secondary';
  onClick: (e?: React.FormEvent | React.MouseEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  formButton?: boolean;
}

const RunButton: React.FC<RunButtonProps> = ({
  type = 'primary',
  onClick,
  disabled = false,
  children,
  className = '',
  isLoading = false,
  loadingText = 'Loading...',
  formButton = false
}) => {
  const handleClick = (e: React.FormEvent | React.MouseEvent) => {
    if (!disabled && !isLoading) {
      onClick(e);
    }
  };

  return (
    <button
      type={formButton ? 'submit' : 'button'}
      className={`run-button ${type} ${disabled || isLoading ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default RunButton;
