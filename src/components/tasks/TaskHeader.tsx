import React from 'react';
import { Bot } from 'lucide-react';
import { ExpandableField } from '../shared/ExpandableField';
import type { Agent } from '../../lib/types';

interface TaskHeaderProps {
  agent: Agent;
}

export function TaskHeader({ agent }: TaskHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Bot size={32} />
        <div>
          <h2 className="text-3xl font-bold">{agent.name}</h2>
          {agent.role && (
            <p className="text-indigo-200 mt-1">{agent.role}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {agent.goal && (
          <ExpandableField
            label="Goal"
            value={agent.goal}
            variant="primary"
          />
        )}
        {agent.description && (
          <ExpandableField
            label="Description"
            value={agent.description}
            variant="primary"
          />
        )}
        {agent.backstory && (
          <ExpandableField
            label="Backstory"
            value={agent.backstory}
            variant="primary"
          />
        )}
      </div>
    </div>
  );
}