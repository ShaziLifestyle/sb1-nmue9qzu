import React from 'react';
import { FormBackground } from './FormBackground';

interface FormContainerProps {
  type: 'agent' | 'task' | 'prompt';
  children: React.ReactNode;
  className?: string;
}

export function FormContainer({ type, children, className = '' }: FormContainerProps) {
  return (
    <div className={`relative mb-8 overflow-hidden rounded-xl shadow-2xl ${className}`}>
      {/* Background wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <FormBackground type={type} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 bg-white/95 dark:bg-dark-800/95 backdrop-blur-md p-8 
        transition-all duration-300 hover:bg-white/98 dark:hover:bg-dark-800/98">
        {children}
      </div>
    </div>
  );
}