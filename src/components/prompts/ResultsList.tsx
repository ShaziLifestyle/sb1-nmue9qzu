import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { PromptResult } from '../../lib/types';

interface ResultsListProps {
  results: PromptResult[];
  onClose: () => void;
}

export function ResultsList({ results, onClose }: ResultsListProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-indigo-800">Results History</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {results.length === 0 ? (
            <p className="text-gray-500 text-center">No results yet</p>
          ) : (
            <div className="space-y-6">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-gray-700">
                    {result.content}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}