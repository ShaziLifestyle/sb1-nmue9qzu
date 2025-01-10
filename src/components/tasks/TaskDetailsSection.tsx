import React from 'react';
import { CompactField } from '../shared/fields/CompactField';
import type { Agent } from '../../lib/types';

interface TaskDetailsSectionProps {
  agent: Agent;
}

export function TaskDetailsSection({ agent }: TaskDetailsSectionProps) {
  return (
    <div className="space-y-2">
      {agent.goal && (
        <CompactField
          label="Goal"
          value={agent.goal}
        />
      )}
      {agent.description && (
        <CompactField
          label="Description"
          value={agent.description}
        />
      )}
      {agent.backstory && (
        <CompactField
          label="Backstory"
          value={agent.backstory}
        />
      )}
    </div>
  );
}