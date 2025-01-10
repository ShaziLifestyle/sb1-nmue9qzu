import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plus, MessageSquare } from 'lucide-react';
import { CreateFormModal } from './shared/CreateFormModal';
import { supabase } from '../lib/supabase';
import { PromptCard } from './prompts/PromptCard';
import { TaskHeader } from './prompts/TaskHeader';
import { SearchBar } from './common/SearchBar';
import { useSearch } from '../hooks/useSearch';
import type { Agent } from '../lib/types';

interface TaskDetails {
  id: string;
  name: string;
  description: string;
  agent: Agent;
}

export default function PromptList() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const [newPrompt, setNewPrompt] = useState({ name: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  async function handleDeletePrompt(id: string) {
    try {
      const { error: deleteError } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Update local state to remove the deleted prompt
      setPrompts(prompts.filter(prompt => prompt.id !== id));
    } catch (err) {
      console.error('Error deleting prompt:', err);
    }
  }

  const filteredPrompts = useSearch(prompts, ['name', 'content'], searchTerm);

  useEffect(() => {
    if (!taskId) {
      navigate('/');
      return;
    }

    async function loadData() {
      try {
        // Load task details
        const { data: task, error: taskError } = await supabase
          .from('tasks')
          .select(`
            id,
            name,
            description,
            agent:agent_id (
              id,
              name,
              role,
              goal,
              description,
              backstory
            )
          `)
          .eq('id', taskId)
          .single();

        if (taskError) throw taskError;
        setTaskDetails(task);

        // Load prompts
        const { data: promptsData, error: promptsError } = await supabase
          .from('prompts')
          .select('*')
          .eq('task_id', taskId)
          .order('created_at', { ascending: false });

        if (promptsError) throw promptsError;
        setPrompts(promptsData || []);
      } catch (err) {
        console.error('Error loading data:', err);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [taskId, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!newPrompt.name.trim()) {
      setError('Prompt name is required');
      return;
    }

    if (!newPrompt.content.trim()) {
      setError('Prompt content is required');
      return;
    }

    try {
      const { error: submitError } = await supabase
        .from('prompts')
        .insert([{
          name: newPrompt.name,
          content: newPrompt.content,
          task_id: taskId
        }]);

      if (submitError) throw submitError;

      // Refresh prompts
      const { data: updatedPrompts } = await supabase
        .from('prompts')
        .select('*')
        .eq('task_id', taskId)
        .order('created_at', { ascending: false });

      setPrompts(updatedPrompts || []);
      setShowCreateForm(false);
      setNewPrompt({ name: '', content: '' });
    } catch (err) {
      console.error('Error creating prompt:', err);
      setError('Failed to create prompt');
    }
  }

  if (!taskId || !taskDetails) return null;
  if (isLoading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link 
          to={`/agents/${taskDetails.agent.id}/tasks`} 
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Tasks
        </Link>
      </div>

      <TaskHeader 
        task={taskDetails}
        agent={taskDetails.agent}
      />
      
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          <Plus size={20} />
          Add Prompt
        </button>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search prompts by name or content..."
      />

      <div className="grid gap-4">
        {filteredPrompts.map((prompt) => (
          <PromptCard 
            key={prompt.id}
            prompt={prompt}
            onDelete={handleDeletePrompt}
            onUpdate={() => {
              supabase
                .from('prompts')
                .select('*')
                .eq('task_id', taskId)
                .order('created_at', { ascending: false })
                .then(({ data }) => setPrompts(data || []));
            }}
          />
        ))}
      </div>

      {showCreateForm && (
        <CreateFormModal
          title="Create New Prompt"
          onClose={() => setShowCreateForm(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Create Prompt</h2>
            </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prompt Name *
            </label>
            <input
              type="text"
              value={newPrompt.name}
              onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter prompt name"
              required
              minLength={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prompt Content *
            </label>
            <div className="relative">
              <textarea
                value={newPrompt.content}
                onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-64 font-mono text-sm resize-none bg-gray-50"
                placeholder={`Enter your ChatGPT prompt here...

Example format:

You are an AI assistant tasked with [specific role].

Context:
[Provide relevant background information]

Task:
[Describe the specific task or request]

Requirements:
1. [First requirement]
2. [Second requirement]
3. [Third requirement]

Format:
[Specify desired output format if applicable]

Additional Notes:
[Any other important information or constraints]`}
                required
                minLength={1}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                Press Tab to indent
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              <Plus size={20} /> Add Prompt
            </button>
          </div>
        </div>
      </form>

        </CreateFormModal>
      )}
    </div>
  );
}