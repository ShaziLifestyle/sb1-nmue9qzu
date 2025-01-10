import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FieldCompletionCheckbox } from './FieldCompletionCheckbox';

interface Field {
  key: string;
  label: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  template?: string;
}

interface EditModalProps {
  title: string;
  fields: Field[];
  onSave: (values: Record<string, any>) => void;
  onClose: () => void;
}

export function EditModal({ title, fields, onSave, onClose }: EditModalProps) {
  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: field.value }), {})
  );
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useEscapeKey(onClose);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(values);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-[#F9F9FF] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-indigo-100"
      >
        <div className="p-6 border-b border-indigo-100 bg-white flex justify-between items-center">
          <h3 className="text-2xl font-['Crimson_Pro'] text-[#2D3748]">{title}</h3>
          <button
            onClick={onClose}
            className="text-indigo-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-76px)]">
          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.key} className="bg-white rounded-lg p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#2D3748] font-['Crimson_Pro']">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                </div>
                <textarea
                  value={values[field.key]}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  className="w-full p-4 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                    min-h-[200px] font-['IBM_Plex_Mono'] text-base bg-white text-[#2D3748] resize-none leading-relaxed
                    placeholder-indigo-300"
                  placeholder={field.template || field.placeholder}
                  required={field.required}
                  style={{ whiteSpace: 'pre-wrap' }}
                />
                {field.template && (
                  <div className="mt-4 p-4 bg-indigo-50/50 rounded-lg border border-indigo-100">
                    <p className="text-sm font-medium text-indigo-700 mb-2 font-['Crimson_Pro']">Template Format:</p>
                    <pre className="text-sm text-indigo-600 whitespace-pre-wrap font-['IBM_Plex_Mono'] leading-relaxed">
                      {field.template}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-['Crimson_Pro'] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                transition-all duration-200 font-['Crimson_Pro'] shadow-sm hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}