import React from 'react';

interface AttackLogProps {
  logs: string[];
  isVisible: boolean;
  title?: string;
  className?: string;
}

const AttackLog: React.FC<AttackLogProps> = ({
  logs,
  isVisible,
  title = 'Attack Log',
  className = ''
}) => {
  const logContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs are added
  React.useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isVisible || logs.length === 0) return null;

  return (
    <div className={`attack-log-container ${className}`}>
      <h4>{title}</h4>
      <div className="attack-log" ref={logContainerRef}>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttackLog;
