import React, { useState } from 'react';
import { Plus, Bot, Sparkles, CircuitBoard, Zap } from 'lucide-react';
import { OrderSelect } from './OrderSelect';
import { FormContainer } from '../forms/FormContainer';
import type { Agent } from '../../lib/types';

interface AgentFormProps {
  onSubmit: (agent: Partial<Agent>) => void;
}

export function AgentForm({ onSubmit }: AgentFormProps) {
  const initialState = {
    name: '',
    role: '',
    description: '',
    goal: '',
    backstory: '',
    order: 1
  };
  
  const [agent, setAgent] = useState(initialState);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { 
      name, role, description, goal, backstory, order,
      name_complete, role_complete, description_complete,
      goal_complete, backstory_complete 
    } = agent;
    // Only include fields that have values
    const newAgent: Partial<Agent> = { 
      order
    };
    
    if (name.trim()) newAgent.name = name.trim();
    if (role.trim()) newAgent.role = role.trim();
    if (description.trim()) newAgent.description = description.trim();
    if (goal.trim()) newAgent.goal = goal.trim();
    if (backstory.trim()) newAgent.backstory = backstory.trim();
    
    onSubmit(newAgent);
    setAgent(initialState);
  }

  return (
    <FormContainer type="agent">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group hover:from-indigo-200 hover:to-purple-200 transition-all duration-300">
            <div className="relative transform group-hover:rotate-180 transition-transform duration-500">
              <Bot className="w-6 h-6 text-indigo-600 relative z-10" />
              <CircuitBoard className="w-6 h-6 text-purple-600 absolute inset-0 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <Zap className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 transform rotate-12 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create AI Agent
          </h2>
        </div>

        <div className="grid gap-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agent Name *
              </label>
              <input
                type="text"
                value={agent.name}
                onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                className="w-full p-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter agent name"
                required
                minLength={1}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <OrderSelect
                value={agent.order}
                onChange={(value) => setAgent({ ...agent, order: value })}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <textarea
              value={agent.role}
              onChange={(e) => setAgent({ ...agent, role: e.target.value })}
              className="w-full p-4 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 font-mono text-sm bg-gray-50 resize-none"
              placeholder={`Example:
You are an expert AI assistant specializing in [specific domain]

Primary Functions:
1. [Main function 1]
2. [Main function 2]
3. [Main function 3]

Expertise Areas:
- [Area of expertise 1]
- [Area of expertise 2]
- [Area of expertise 3]`}
              required
              minLength={1}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={agent.description}
              onChange={(e) => setAgent({ ...agent, description: e.target.value })}
              className="w-full p-4 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 font-mono text-sm bg-gray-50 resize-none"
              placeholder={`Example:
Core Capabilities:
[Capability 1]
[Capability 2]
[Capability 3]

Specialized Skills:
1. [Skill 1]: [Brief description]
2. [Skill 2]: [Brief description]
3. [Skill 3]: [Brief description]

Additional Features:
[Feature 1]
[Feature 2]`}
              required
              minLength={1}
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal *
            </label>
            <textarea
              value={agent.goal}
              onChange={(e) => setAgent({ ...agent, goal: e.target.value })}
              className="w-full p-4 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 font-mono text-sm bg-gray-50 resize-none"
              placeholder={`Example:
Primary Objective:
[State the main goal]

Key Outcomes:
1. [Outcome 1]
2. [Outcome 2]
3. [Outcome 3]

Success Metrics:
[Metric 1]
[Metric 2]
[Metric 3]

Constraints:
- [Constraint 1]
- [Constraint 2]`}
              required
              minLength={1}
            />
          </div>

          {/* Backstory */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Backstory *
            </label>
            <textarea
              value={agent.backstory}
              onChange={(e) => setAgent({ ...agent, backstory: e.target.value })}
              className="w-full p-4 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-40 font-mono text-sm bg-gray-50 resize-none"
              placeholder={`Example:
Origin:
[Brief origin story]

Development History:
1. [Phase 1]: [Description]
2. [Phase 2]: [Description]
3. [Phase 3]: [Description]

Key Experiences:
[Experience 1]
[Experience 2]
[Experience 3]

Guiding Principles:
1. [Principle 1]
2. [Principle 2]
3. [Principle 3]`}
              required
              minLength={1}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md group"
          >
            <Plus size={20} className="group-hover:rotate-180 transition-transform duration-300" />
            <span>Add Agent</span>
          </button>
        </div>
      </form>
    </FormContainer>
  );
}