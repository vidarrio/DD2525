import React, { useContext } from 'react';
import { WasmErrorContext } from '../../App';

interface WasmErrorDisplayProps {
  className?: string;
  title?: string;
}

const WasmErrorDisplay: React.FC<WasmErrorDisplayProps> = ({ 
  className = 'wasm-errors',
  title = 'WASM Panic Output:'
}) => {
  const { errors } = useContext(WasmErrorContext);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h4>{title}</h4>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default WasmErrorDisplay;