import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { PromptResult } from '../../lib/types';

interface ResultsListProps {
  results: PromptResult[];
}

export function ResultsList({ results }: ResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No results yet. Generate your first result!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <div
          key={result.id}
          className="bg-white rounded-lg p-6 shadow border border-gray-200"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}
            </span>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-4 rounded-lg">
            {result.content}
          </pre>
        </div>
      ))}
    </div>
  );
}