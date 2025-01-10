import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { EditFieldModal } from './EditFieldModal';
import { CompletionCheckbox } from '../CompletionCheckbox';
import { supabase } from '../../../lib/supabase';

interface ExpandableFieldProps {
  label: string;
  value: string;
  onUpdate?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  fieldKey: string;
  entityId: string;
  entityType: 'agents' | 'tasks' | 'prompts';
  isComplete?: boolean;
  onCompletionChange?: () => void;
}

export function ExpandableField({ 
  label, 
  value, 
  onUpdate, 
  placeholder,
  readOnly = false,
  fieldKey,
  entityId,
  entityType,
  isComplete = false,
  onCompletionChange
}: ExpandableFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const truncatedValue = value?.length > 100 ? `${value.slice(0, 100)}...` : value;

  if (!value && readOnly) return null;

  async function handleFieldComplete(complete: boolean) {
    const { error } = await supabase
      .from(entityType)
      .update({ [`${fieldKey}_complete`]: complete })
      .eq('id', entityId);

    if (error) {
      console.error('Error updating field completion:', error);
      return;
    }

    if (onCompletionChange) {
      onCompletionChange();
    }
  }

  return (
    <>
      <div className={`group relative backdrop-blur-sm rounded-lg p-3 transition-all duration-200
        ${isComplete ? 'bg-green-50/10' : 'bg-white/5 hover:bg-white/10'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CompletionCheckbox
                checked={isComplete || false}
                onChange={handleFieldComplete}
              />
              <h3 className="text-sm font-medium text-indigo-200">{label}</h3>
            </div>
            <p className="text-sm text-white/90">
              {isExpanded ? value : truncatedValue || placeholder}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!readOnly && onUpdate && (
              <button
                onClick={() => setShowEditModal(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/10 rounded"
                title={`Edit ${label.toLowerCase()}`}
              >
                <Edit2 size={16} className="text-indigo-200" />
              </button>
            )}
            {value?.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-white/10 rounded"
                title={isExpanded ? 'Show less' : 'Show more'}
              >
                {isExpanded ? (
                  <ChevronUp size={16} className="text-indigo-200" />
                ) : (
                  <ChevronDown size={16} className="text-indigo-200" />
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