import React, { forwardRef } from 'react';

interface AgentGridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  innerRef?: (element: HTMLElement | null) => void;
  isDraggingOver?: boolean;
}

export const AgentGridLayout = forwardRef<HTMLDivElement, AgentGridLayoutProps>(
  ({ children, innerRef, isDraggingOver, className = '', ...props }, ref) => {
    return (
      <div 
        ref={(element) => {
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
          if (innerRef) {
            innerRef(element);
          }
        }}
        className={`
          grid gap-6 md:grid-cols-2 lg:grid-cols-3 
          transition-colors duration-200
          ${isDraggingOver ? 'bg-indigo-50/50' : ''}
          ${className}
        `.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AgentGridLayout.displayName = 'AgentGridLayout';