import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface PromptResultModalProps {
  promptResult?: string;
  onSave: (result: string) => Promise<void>;
  onClose: () => void;
}

export function PromptResultModal({ promptResult, onSave, onClose }: PromptResultModalProps) {
  const [result, setResult] = useState(promptResult || '');
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useEscapeKey(onClose);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(result);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-indigo-800">ChatGPT Result</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-none"
            placeholder="Paste the ChatGPT result here..."
          />
          
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Save Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}