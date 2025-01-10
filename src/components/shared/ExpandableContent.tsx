import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableContentProps {
  content: string;
  maxLength?: number;
  className?: string;
  isMonospace?: boolean;
}

export function ExpandableContent({ 
  content, 
  maxLength = 200,
  className = '',
  isMonospace = true
}: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowExpand = content.length > maxLength;
  const displayContent = isExpanded ? content : content.slice(0, maxLength) + '...';

  return (
    <div className={`relative ${className}`}>
      <pre className={`whitespace-pre-wrap ${isMonospace ? 'font-mono text-sm' : 'font-sans'}`}>
        {displayContent}
      </pre>
      {shouldShowExpand && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show More
            </>
          )}
        </button>
      )}
    </div>
  );
}