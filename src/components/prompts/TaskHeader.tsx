import React, { useState } from 'react';
import { ClipboardList, Bot, ChevronDown, ChevronUp } from 'lucide-react';
import { ExpandableField } from '../shared/fields/ExpandableField';
import type { Agent } from '../../lib/types';

interface TaskHeaderProps {
  task: {
    name: string;
    description?: string;
  };
  agent: Agent;
}

export function TaskHeader({ task, agent }: TaskHeaderProps) {
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({
    name: false,
    description: false
  });

  function toggleField(field: string) {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg mb-8">
      {/* Task Name Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList size={32} />
            <div>
              <h2 className="text-3xl font-bold">Task Details</h2>
              <p className="text-indigo-200">Agent: {agent.name}</p>
            </div>
          </div>
          <button
            onClick={() => toggleField('name')}
            className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <span className="text-sm">{expandedFields.name ? 'Show less' : 'Show more'}</span>
            {expandedFields.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        <div className={`mt-2 overflow-hidden transition-all duration-200 
          ${expandedFields.name ? 'max-h-96' : 'max-h-8'}`}>
          <p className="text-white/90">{task.name}</p>
        </div>
      </div>

      {/* Task Description Section */}
      <div className="mb-6 bg-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Task Description</h3>
          <button
            onClick={() => toggleField('description')}
            className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <span className="text-sm">{expandedFields.description ? 'Show less' : 'Show more'}</span>
            {expandedFields.description ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        <div className={`overflow-hidden transition-all duration-200 
          ${expandedFields.description ? 'max-h-96' : 'max-h-12'}`}>
          <p className="text-white/90 whitespace-pre-wrap">{task.description || 'No description available'}</p>
        </div>
      </div>

      {/* Agent Details Section */}
      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bot size={24} className="text-indigo-200" />
          <h3 className="text-xl font-semibold">Agent Details</h3>
        </div>
        <div className="space-y-3">
          <ExpandableField
            label="Role"
            value={agent.role || ''}
            variant="secondary"
          />
          <ExpandableField
            label="Goal"
            value={agent.goal || ''}
            variant="secondary"
          />
          <ExpandableField
            label="Description"
            value={agent.description || ''}
            variant="secondary"
          />
          <ExpandableField
            label="Backstory"
            value={agent.backstory || ''}
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
}