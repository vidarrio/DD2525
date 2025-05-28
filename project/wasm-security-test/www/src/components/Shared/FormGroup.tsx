import React from 'react';

export interface FormGroupProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ 
  label, 
  htmlFor, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
};

export default FormGroup;
