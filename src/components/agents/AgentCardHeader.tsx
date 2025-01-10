import React from 'react';
import { OrderSelect } from './OrderSelect';
import type { Agent } from '../../lib/types';

interface AgentCardHeaderProps {
  isEditing: boolean;
  editedAgent: Agent;
  agent: Agent;
  onEditChange: (agent: Agent) => void;
  isComplete?: boolean;
}

export function AgentCardHeader({ 
  isEditing, 
  editedAgent, 
  agent, 
  onEditChange,
  isComplete
}: AgentCardHeaderProps) {
  if (isEditing) {
    return (
      <div className="space-y-6">
        {/* Name Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent Name *
          </label>
          <input
            type="text"
            value={editedAgent.name}
            onChange={(e) => onEditChange({ ...editedAgent, name: e.target.value })}
            className="w-full p-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter agent name"
            required
          />
        </div>

        {/* Role Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            value={editedAgent.role || ''}
            onChange={(e) => onEditChange({ ...editedAgent, role: e.target.value })}
            className="w-full p-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter agent role"
          />
        </div>

        {/* Description Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={editedAgent.description || ''}
            onChange={(e) => onEditChange({ ...editedAgent, description: e.target.value })}
            className="w-full p-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none transition-colors"
            placeholder="Enter agent description"
          />
        </div>

        {/* Goal Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal
          </label>
          <textarea
            value={editedAgent.goal || ''}
            onChange={(e) => onEditChange({ ...editedAgent, goal: e.target.value })}
            className="w-full p-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none transition-colors"
            placeholder="Enter agent goal"
          />
        </div>

        {/* Backstory Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Backstory
          </label>
          <textarea
            value={editedAgent.backstory || ''}
            onChange={(e) => onEditChange({ ...editedAgent, backstory: e.target.value })}
            className="w-full p-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none transition-colors"
            placeholder="Enter agent backstory"
          />
        </div>

        {/* Order Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <OrderSelect
            value={editedAgent.order || 1}
            onChange={(value) => onEditChange({ ...editedAgent, order: value })}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className={`text-xl font-semibold ${isComplete ? 'text-white' : 'text-indigo-800'}`}>
        {agent.name}
      </h3>
      <p className={`text-sm ${isComplete ? 'text-white/80' : 'text-gray-500'}`}>
        Order: {agent.order || 1}
      </p>
    </div>
  );
}