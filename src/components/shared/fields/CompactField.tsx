import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CompactFieldProps {
  label: string;
  value: string;
}

export function CompactField({ label, value }: CompactFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!value) return null;

  const truncatedValue = value.length > 150 
    ? `${value.slice(0, 150)}...` 
    : value;

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2.5 flex items-center justify-between group hover:bg-white/10 transition-colors duration-200"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-indigo-200">{label}</span>
            {value.length > 150 && !isExpanded && (
              <span className="text-xs text-indigo-300/80">Click to expand</span>
            )}
          </div>
          <p className="text-sm text-white/90 mt-0.5">
            {isExpanded ? value : truncatedValue}
          </p>
        </div>
        {value.length > 150 && (
          <div className="ml-3 text-indigo-200">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        )}
      </button>
    </div>
  );
}