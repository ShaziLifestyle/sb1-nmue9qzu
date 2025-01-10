import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ResultFormProps {
  promptContent: string;
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
}

export function ResultForm({ promptContent, onSubmit, onCancel }: ResultFormProps) {
  const [content, setContent] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(content);
    setContent('');
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-indigo-800">Generate New Result</h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Prompt:</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{promptContent}</p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="result" className="block text-sm font-semibold text-gray-600 mb-2">
              Result:
            </label>
            <textarea
              id="result"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the result content..."
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Save Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}