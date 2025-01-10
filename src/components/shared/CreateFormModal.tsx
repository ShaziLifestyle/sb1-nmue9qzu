import React from 'react';
import { X } from 'lucide-react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useClickOutside } from '../../hooks/useClickOutside';

interface CreateFormModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function CreateFormModal({ title, onClose, children }: CreateFormModalProps) {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-76px)]">
          {children}
        </div>
      </div>
    </div>
  );
}