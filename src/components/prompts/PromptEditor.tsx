import React from 'react';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function PromptEditor({ value, onChange, placeholder, required }: PromptEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 p-2 border rounded h-32 resize-y min-h-[8rem]"
      required={required}
    />
  );
}