import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableFieldProps {
  label: string;
  value: string;
  variant?: 'primary' | 'secondary';
}

export function ExpandableField({ 
  label, 
  value, 
  variant = 'primary' 
}: ExpandableFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!value) return null;

  const variants = {
    primary: 'bg-white/10 hover:bg-white/20',
    secondary: 'bg-white/5 hover:bg-white/15'
  };

  return (
    <div className="rounded-lg overflow-hidden backdrop-blur-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-3 flex items-center justify-between group transition-all duration-200 ${variants[variant]}`}
      >
        <div className="flex-1 text-left">
          <span className="text-sm font-medium text-indigo-200">{label}</span>
          <p className={`text-sm text-white/90 mt-1 ${!isExpanded && value.length > 100 ? 'line-clamp-2' : ''}`}>
            {value}
          </p>
        </div>
        <div className="ml-3 text-indigo-200">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
    </div>
  );
}