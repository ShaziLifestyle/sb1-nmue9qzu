import React from 'react';
import { Bot } from 'lucide-react';
import type { Agent } from '../../lib/types';

interface AgentHeaderProps {
  agent: Agent;
}

export function AgentHeader({ agent }: AgentHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Bot size={32} />
        <h2 className="text-3xl font-bold">{agent.name}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agent.role && (
          <div>
            <h3 className="text-indigo-200 font-semibold mb-1">Role</h3>
            <p>{agent.role}</p>
          </div>
        )}
        
        {agent.goal && (
          <div>
            <h3 className="text-indigo-200 font-semibold mb-1">Goal</h3>
            <p>{agent.goal}</p>
          </div>
        )}
        
        {agent.description && (
          <div className="lg:col-span-3">
            <h3 className="text-indigo-200 font-semibold mb-1">Description</h3>
            <p>{agent.description}</p>
          </div>
        )}
        
        {agent.backstory && (
          <div className="lg:col-span-3">
            <h3 className="text-indigo-200 font-semibold mb-1">Backstory</h3>
            <p>{agent.backstory}</p>
          </div>
        )}
      </div>
    </div>
  );
}