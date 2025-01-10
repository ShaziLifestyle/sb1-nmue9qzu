import React, { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';
import { fetchAgents, createAgent, updateAgent, deleteAgent } from '../lib/api/agentApi';
import { Plus } from 'lucide-react';
import { CreateFormModal } from './shared/CreateFormModal';
import { AgentForm } from './agents/AgentForm';
import { AgentCard } from './agents/AgentCard';
import { SearchBar } from './common/SearchBar';
import { useSearch } from '../hooks/useSearch';
import type { Agent } from '../lib/types';

export default function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filteredAgents = useSearch(agents, ['name', 'description', 'role'], searchTerm);

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    setIsLoading(true);
    const agentList = await fetchAgents();
    setAgents(agentList);
    setIsLoading(false);
  }

  async function handleCreateAgent(newAgent: Partial<Agent>) {
    const { error } = await createAgent(newAgent);
    if (error) {
      console.error('Error creating agent:', error);
      return;
    }
    setShowCreateForm(false);
    loadAgents();
  }

  async function handleUpdateAgent(id: string, updates: Partial<Agent>) {
    const { error } = await updateAgent(id, updates);
    if (error) {
      console.error('Error updating agent:', error);
      return;
    }
    // Update the local state directly instead of reloading
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  }

  async function handleDeleteAgent(id: string) {
    const { error } = await deleteAgent(id);
    if (error) {
      console.error('Error deleting agent:', error);
      return;
    }
    loadAgents();
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-indigo-600">Loading agents...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-800 flex items-center gap-2">
        <Bot className="h-8 w-8" />
        AI Agents
      </h2>
      
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          <Plus size={20} />
          Add Agent
        </button>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search agents by name, description, or role..."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onDelete={handleDeleteAgent}
            onUpdate={handleUpdateAgent}
          />
        ))}
      </div>
      
      {showCreateForm && (
        <CreateFormModal
          title="Create New Agent"
          onClose={() => setShowCreateForm(false)}
        >
          <AgentForm onSubmit={handleCreateAgent} />
        </CreateFormModal>
      )}
    </div>
  );
}