import React from 'react';
import type { Agent } from '../../lib/types';

interface AgentCardContentProps {
  isEditing: boolean;
  editedAgent: Agent;
  agent: Agent;
  onEditChange: (agent: Agent) => void;
}

export function AgentCardContent({ isEditing, editedAgent, agent, onEditChange }: AgentCardContentProps) {
  if (isEditing) {
    return (
      <div className="space-y-4 mt-4">
        <input
          type="text"
          value={editedAgent.role || ''}
          onChange={(e) => onEditChange({ ...editedAgent, role: e.target.value })}
          className="w-full p-2 border border-indigo-200 rounded-lg"
          placeholder="Role"
        />
        <textarea
          value={editedAgent.description || ''}
          onChange={(e) => onEditChange({ ...editedAgent, description: e.target.value })}
          className="w-full p-2 border border-indigo-200 rounded-lg h-20"
          placeholder="Description"
        />
        <textarea
          value={editedAgent.goal || ''}
          onChange={(e) => onEditChange({ ...editedAgent, goal: e.target.value })}
          className="w-full p-2 border border-indigo-200 rounded-lg h-20"
          placeholder="Goal"
        />
        <textarea
          value={editedAgent.backstory || ''}
          onChange={(e) => onEditChange({ ...editedAgent, backstory: e.target.value })}
          className="w-full p-2 border border-indigo-200 rounded-lg h-32"
          placeholder="Backstory"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {agent.role && (
        <div className="text-sm">
          <span className="font-semibold text-indigo-600">Role:</span>
          <p className="text-gray-600">{agent.role}</p>
        </div>
      )}
      {agent.description && (
        <div className="text-sm">
          <span className="font-semibold text-indigo-600">Description:</span>
          <p className="text-gray-600">{agent.description}</p>
        </div>
      )}
      {agent.goal && (
        <div className="text-sm">
          <span className="font-semibold text-indigo-600">Goal:</span>
          <p className="text-gray-600">{agent.goal}</p>
        </div>
      )}
      {agent.backstory && (
        <div className="text-sm">
          <span className="font-semibold text-indigo-600">Backstory:</span>
          <p className="text-gray-600">{agent.backstory}</p>
        </div>
      )}
    </div>
  );
}