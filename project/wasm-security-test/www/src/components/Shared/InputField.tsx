import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  htmlFor,
  className = ''
}) => {
  const inputId = htmlFor || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={inputId}>{label}:</label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default InputField;
