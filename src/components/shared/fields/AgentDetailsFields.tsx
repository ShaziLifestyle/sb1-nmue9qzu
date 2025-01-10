import React from 'react';
import { ExpandableField } from './ExpandableField';
import type { Agent } from '../../../lib/types';

interface AgentDetailsFieldsProps {
  agent: Agent;
  onUpdate?: (id: string, updates: Partial<Agent>) => void;
  readOnly?: boolean;
}

export function AgentDetailsFields({ agent, onUpdate, readOnly = false }: AgentDetailsFieldsProps) {
  return (
    <div className="space-y-4">
      <ExpandableField
        label="Role"
        value={agent.role || ''}
        placeholder="No role set"
        onUpdate={readOnly ? undefined : (value) => onUpdate?.(agent.id, { role: value })}
        readOnly={readOnly}
      />
      <ExpandableField
        label="Goal"
        value={agent.goal || ''}
        placeholder="No goal set"
        onUpdate={readOnly ? undefined : (value) => onUpdate?.(agent.id, { goal: value })}
        readOnly={readOnly}
      />
      <ExpandableField
        label="Description"
        value={agent.description || ''}
        placeholder="No description available"
        onUpdate={readOnly ? undefined : (value) => onUpdate?.(agent.id, { description: value })}
        readOnly={readOnly}
      />
    </div>
  );
}