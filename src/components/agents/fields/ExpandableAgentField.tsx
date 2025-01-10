import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react';

interface ExpandableAgentFieldProps {
  label: string;
  value: string;
  onEdit?: () => void;
  isEditable?: boolean;
}

export function ExpandableAgentField({
  label,
  value,
  onEdit,
  isEditable = false
}: ExpandableAgentFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!value) return null;

  return (
    <div className="bg-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between group hover:bg-white/5 transition-colors duration-200"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-indigo-200">{label}</span>
            {!isExpanded && value.length > 100 && (
              <span className="text-xs text-indigo-300">Click to expand</span>
            )}
          </div>
          <p className={`text-sm text-white/90 mt-1 ${!isExpanded && 'line-clamp-2'}`}>
            {value}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          {isEditable && onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Edit2 size={16} className="text-indigo-200" />
            </button>
          )}
          {isExpanded ? (
            <ChevronUp size={16} className="text-indigo-200" />
          ) : (
            <ChevronDown size={16} className="text-indigo-200" />
          )}
        </div>
      </button>
      {isExpanded && value.length > 100 && (
        <div className="px-4 pb-4 border-t border-white/10">
          <p className="text-sm text-white/90 whitespace-pre-wrap">
            {value}
          </p>
        </div>
      )}
    </div>
  );
}