import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { EditFieldModal } from './EditFieldModal';

interface ExpandableFieldProps {
  label: string;
  value: string;
  onUpdate?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function ExpandableField({ 
  label, 
  value, 
  onUpdate, 
  placeholder,
  readOnly = false 
}: ExpandableFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const truncatedValue = value?.length > 100 
    ? `${value.slice(0, 100)}...` 
    : value;

  return (
    <>
      <div className="group relative bg-white/50 backdrop-blur-sm rounded-lg p-4 transition-all duration-200 hover:bg-white/60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-indigo-900 mb-1">{label}</h3>
            <p className="text-gray-700 text-sm">
              {isExpanded ? value : truncatedValue || placeholder}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!readOnly && onUpdate && (
              <button
                onClick={() => setShowEditModal(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-indigo-100 rounded"
              >
                <Edit2 size={16} className="text-indigo-600" />
              </button>
            )}
            {value?.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-indigo-100 rounded"
              >
                {isExpanded ? (
                  <ChevronUp size={16} className="text-indigo-600" />
                ) : (
                  <ChevronDown size={16} className="text-indigo-600" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {showEditModal && onUpdate && (
        <EditFieldModal
          label={label}
          value={value}
          onSave={(newValue) => {
            onUpdate(newValue);
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}