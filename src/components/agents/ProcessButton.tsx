import React from 'react';
import { Play } from 'lucide-react';

interface ProcessButtonProps {
  onClick: () => void;
  isProcessing?: boolean;
}

export function ProcessButton({ onClick, isProcessing = false }: ProcessButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-indigo-500 hover:text-indigo-700 transition-colors duration-200 
        ${isProcessing ? 'animate-pulse' : ''}`}
      title="Process agent data"
    >
      <Play size={20} />
    </button>
  );
}