import React from 'react';
import { Check } from 'lucide-react';

interface CompletionCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => Promise<void>;
}

export function CompletionCheckbox({ checked, onChange }: CompletionCheckboxProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-6 h-6 rounded border transition-colors duration-200 flex items-center justify-center
        ${checked 
          ? 'bg-[#22C55E] border-[#22C55E] hover:bg-[#16A34A]' 
          : 'bg-white border-gray-300 hover:border-gray-400'
        }`}
      aria-label={checked ? 'Mark as incomplete' : 'Mark as complete'}
    >
      {checked && <Check className="w-4 h-4 text-white" />}
    </button>
  );
}