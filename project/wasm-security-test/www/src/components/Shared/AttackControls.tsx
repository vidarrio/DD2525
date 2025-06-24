import React from 'react';

export interface AttackControlsProps {
  isAttacking: boolean;
  attackMode: 'unsafe' | 'safe';
  onStartAttack: (mode: 'unsafe' | 'safe') => void;
  onStopAttack: () => void;
  disabled?: boolean;
  unsafeLabel?: string;
  safeLabel?: string;
  className?: string;
}

const AttackControls: React.FC<AttackControlsProps> = ({
  isAttacking,
  attackMode,
  onStartAttack,
  onStopAttack,
  disabled = false,
  unsafeLabel = 'Run Attack (Unsafe)',
  safeLabel = 'Run Attack (Safe)',
  className = ''
}) => {
  const handleUnsafeAttack = () => {
    if (isAttacking && attackMode === 'unsafe') {
      onStopAttack();
    } else {
      onStartAttack('unsafe');
    }
  };

  const handleSafeAttack = () => {
    if (isAttacking && attackMode === 'safe') {
      onStopAttack();
    } else {
      onStartAttack('safe');
    }
  };

  return (
    <div className={`attack-controls ${className}`}>
      {unsafeLabel && (
        <button
          className={`run-attack-btn unsafe ${isAttacking && attackMode === 'unsafe' ? 'stop-attack' : ''}`}
          onClick={handleUnsafeAttack}
          disabled={disabled || (isAttacking && attackMode !== 'unsafe')}
        >
          {isAttacking && attackMode === 'unsafe' ? 'Stop Attack' : unsafeLabel}
        </button>
      )}
      
      {safeLabel && (
        <button
          className={`run-attack-btn safe ${isAttacking && attackMode === 'safe' ? 'stop-attack' : ''}`}
          onClick={handleSafeAttack}
          disabled={disabled || (isAttacking && attackMode !== 'safe')}
        >
          {isAttacking && attackMode === 'safe' ? 'Stop Attack' : safeLabel}
        </button>
      )}
    </div>
  );
};

export default AttackControls;
