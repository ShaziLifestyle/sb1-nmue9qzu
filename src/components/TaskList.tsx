import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TaskHeader } from './tasks/TaskHeader';
import { Plus } from 'lucide-react';
import { CreateFormModal } from './shared/CreateFormModal';
import { TaskForm } from './tasks/TaskForm';
import { TaskGrid } from './tasks/TaskGrid';
import { SearchBar } from './common/SearchBar';
import { useSearch } from '../hooks/useSearch';
import { fetchAgent } from '../lib/api/agentApi';
import { supabase } from '../lib/supabase';
import type { Agent, Task } from '../lib/types';

export default function TaskList() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useSearch(tasks, ['name', 'description'], searchTerm);

  useEffect(() => {
    if (!agentId) {
      navigate('/');
      return;
    }

    async function loadData() {
      try {
        // Fetch agent details
        const agentData = await fetchAgent(agentId);
        if (!agentData) {
          navigate('/');
          return;
        }
        setAgent(agentData);

        // Fetch tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .eq('agent_id', agentId)
          .order('created_at', { ascending: false });

        if (tasksError) {
          console.error('Error fetching tasks:', tasksError);
          return;
        }

        setTasks(tasksData || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [agentId, navigate]);

  async function handleTaskCreated() {
    const { data: tasksData } = await supabase
      .from('tasks')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    setTasks(tasksData || []);
  }

  async function handleTaskDeleted(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      return;
    }

    setTasks(tasks.filter(task => task.id !== id));
  }

  if (!agentId || !agent) return null;
  if (isLoading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Back to Agents
        </Link>
      </div>

      <TaskHeader agent={agent} />
      
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search tasks by name or description..."
      />

      <TaskGrid 
        tasks={filteredTasks}
        onDelete={handleTaskDeleted}
        onUpdate={handleTaskCreated}
      />
      
      {showCreateForm && (
        <CreateFormModal
          title="Create New Task"
          onClose={() => setShowCreateForm(false)}
        >
          <TaskForm 
            agentId={agentId}
            onTaskCreated={handleTaskCreated}
          />
        </CreateFormModal>
      )}
    </div>
  );
}