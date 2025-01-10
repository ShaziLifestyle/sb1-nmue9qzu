import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface FieldCompletionCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  showSaveStatus?: boolean;
}

export function FieldCompletionCheckbox({ 
  checked, 
  onChange, 
  className = '',
  showSaveStatus = false
}: FieldCompletionCheckboxProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleChange() {
    try {
      setIsSaving(true);
      await onChange(!checked);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save');
      console.error('Error saving completion status:', error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleChange}
        disabled={isSaving}
        className={`w-5 h-5 rounded border transition-colors duration-200 flex items-center justify-center
          ${checked 
            ? 'bg-[#22C55E] border-[#22C55E] hover:bg-[#16A34A]' 
            : 'bg-white border-gray-300 hover:border-gray-400'
          }
          ${isSaving ? 'opacity-50 cursor-wait' : ''}
          ${className}`}
        aria-label={checked ? 'Mark field as incomplete' : 'Mark field as complete'}
      >
        {isSaving ? (
          <Loader2 className="w-3 h-3 text-white animate-spin" />
        ) : (
          checked && <Check className="w-3 h-3 text-white" />
        )}
      </button>
      {showSaveStatus && saveError && (
        <div className="absolute left-7 top-0 text-xs text-red-500 whitespace-nowrap bg-red-50 px-2 py-1 rounded">
          {saveError}
        </div>
      )}
    </div>
  );
}