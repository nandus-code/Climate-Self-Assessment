import React from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, color = 'bg-[#52E5A3]' }) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      {label && <div className="text-sm font-medium text-gray-300 mb-1">{label}</div>}
      <div className="w-full bg-white/10 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;