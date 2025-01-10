import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface EditFieldModalProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  onClose: () => void;
}

export function EditFieldModal({ label, value, onSave, onClose }: EditFieldModalProps) {
  const [editedValue, setEditedValue] = useState(value || '');
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-indigo-800">Edit {label}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <textarea
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            placeholder={`Enter ${label.toLowerCase()}`}
          />

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(editedValue)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}