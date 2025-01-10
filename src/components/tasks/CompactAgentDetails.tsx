import React from 'react';
import { Bot } from 'lucide-react';
import type { Agent } from '../../lib/types';

interface CompactAgentDetailsProps {
  agent: Agent;
}

export function CompactAgentDetails({ agent }: CompactAgentDetailsProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg mb-8">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Bot size={24} className="text-indigo-200" />
          <div>
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            {agent.role && (
              <p className="text-indigo-200 mt-1 text-sm">{agent.role}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}