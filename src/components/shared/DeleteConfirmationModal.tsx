import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useClickOutside } from '../../hooks/useClickOutside';

interface DeleteConfirmationModalProps {
  title: string;
  message: string;
  itemToDelete: string;
  confirmationKeyword: string;
  userInput: string;
  isValid: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onInputChange: (value: string) => void;
}

export function DeleteConfirmationModal({
  title,
  message,
  itemToDelete,
  confirmationKeyword,
  userInput,
  isValid,
  onConfirm,
  onCancel,
  onInputChange
}: DeleteConfirmationModalProps) {
  const modalRef = useClickOutside<HTMLDivElement>(onCancel);
  useEscapeKey(onCancel);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-red-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-800">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-900 mb-4">{message}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700 mb-2">Item to delete:</p>
            <p className="font-medium text-gray-900">{itemToDelete}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700 mb-2">Type this confirmation code to delete:</p>
            <p className="font-mono text-base bg-white p-3 rounded border border-gray-200 text-gray-900 select-all">
              {confirmationKeyword}
            </p>
            <input
              type="text"
              value={userInput}
              onChange={(e) => onInputChange(e.target.value)}
              className="mt-3 w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 
                font-mono text-base text-gray-900"
              placeholder="Type the confirmation code"
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!isValid}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                isValid 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}