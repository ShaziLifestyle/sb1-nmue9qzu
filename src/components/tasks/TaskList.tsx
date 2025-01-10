import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TaskHeader } from './TaskHeader';
import { TaskForm } from './TaskForm';
import { TaskGrid } from './TaskGrid';
import { SearchBar } from '../common/SearchBar';
import { useSearch } from '../../hooks/useSearch';
import { useTasks } from '../../hooks/useTasks';
import { fetchAgent } from '../../lib/api/agentApi';
import type { Agent } from '../../lib/types';

export default function TaskList() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { tasks, isLoading, refreshTasks } = useTasks(agentId);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoadingAgent, setIsLoadingAgent] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useSearch(tasks, ['name', 'description'], searchTerm);

  useEffect(() => {
    if (!agentId) {
      navigate('/');
      return;
    }

    async function loadAgent() {
      const data = await fetchAgent(agentId);
      if (!data) {
        navigate('/');
        return;
      }

      setAgent(data);
      setIsLoadingAgent(false);
    }

    loadAgent();
  }, [agentId, navigate]);

  if (!agentId || !agent) return null;
  if (isLoading || isLoadingAgent) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link to="/" className="text-white hover:text-red-100 font-medium">
            ← Back to Agents
          </Link>
        </div>

        <TaskHeader agent={agent} />
        
        <TaskForm 
          agentId={agentId}
          onTaskCreated={refreshTasks}
        />

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search tasks by name or description..."
        />

        <TaskGrid 
          tasks={filteredTasks}
          onUpdate={refreshTasks}
        />
      </div>
    </div>
  );
}