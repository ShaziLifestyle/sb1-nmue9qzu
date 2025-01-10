import React, { useEffect } from 'react';
import { X, Copy } from 'lucide-react';
import { useClipboard } from '../../../hooks/useClipboard';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface ProcessModalProps {
  content: string;
  onClose: () => void;
}

export function ProcessModal({ content, onClose }: ProcessModalProps) {
  const { copyToClipboard } = useClipboard();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-indigo-800">Agent Process Data</h3>
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(content)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              title="Copy to clipboard"
            >
              <Copy size={20} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg max-h-[60vh] overflow-y-auto border border-gray-200">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
}