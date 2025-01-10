import React from 'react';
import { ExpandableAgentField } from './ExpandableAgentField';
import type { Agent } from '../../../lib/types';

interface AgentDetailsSectionProps {
  agent: Agent;
  onEdit?: (field: keyof Agent) => void;
  isEditable?: boolean;
}

export function AgentDetailsSection({ 
  agent, 
  onEdit,
  isEditable = false 
}: AgentDetailsSectionProps) {
  const fields: Array<{ key: keyof Agent; label: string }> = [
    { key: 'role', label: 'Role' },
    { key: 'goal', label: 'Goal' },
    { key: 'description', label: 'Description' },
    { key: 'backstory', label: 'Backstory' }
  ];

  return (
    <div className="space-y-3">
      {fields.map(({ key, label }) => (
        <ExpandableAgentField
          key={key}
          label={label}
          value={agent[key] as string}
          onEdit={isEditable && onEdit ? () => onEdit(key) : undefined}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
}