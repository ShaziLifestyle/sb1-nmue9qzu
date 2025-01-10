import React, { useState } from 'react';
import { Plus, ListTodo, ChevronDown, ChevronUp } from 'lucide-react';
import { FormContainer } from '../forms/FormContainer';
import { supabase } from '../../lib/supabase';

interface TaskFormProps {
  agentId: string;
  onTaskCreated: () => void;
}

const TASK_TEMPLATE = `Example Task Description Format:

OBJECTIVE:
[Clear statement of what needs to be achieved]

REQUIREMENTS:
1. [Primary requirement]
2. [Secondary requirement]
3. [Additional requirement]

INPUT PARAMETERS:
[Parameter 1]: [Description]
[Parameter 2]: [Description]

EXPECTED OUTPUT:
[Output format]
[Success criteria]

ADDITIONAL NOTES:
[Important considerations]
[Constraints or limitations]

CONTEXT:
[Any relevant background information or context]`;

export function TaskForm({ agentId, onTaskCreated }: TaskFormProps) {
  const initialState = {
    name: '', 
    description: ''
  };
  
  const [newTask, setNewTask] = useState(initialState);
  const [error, setError] = useState<string | null>(null);


  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({
    name: false,
    description: false
  });

  function toggleField(field: string) {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!newTask.name.trim()) {
      setError('Task name is required');
      return;
    }

    if (!newTask.description?.trim()) {
      setError('Task description is required');
      return;
    }

    const { error: submitError } = await supabase
      .from('tasks')
      .insert([{
        name: newTask.name.trim(),
        description: newTask.description.trim(),
        agent_id: agentId
      }]);

    if (submitError) {
      if (submitError.code === '23505') {
        setError('A task with this name already exists');
      } else {
        setError('Failed to create task');
        console.error('Error creating task:', submitError);
      }
      return;
    }

    setNewTask(initialState);
    onTaskCreated();
  }

  return (
    <FormContainer type="task">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-100 rounded-lg">
            <ListTodo className="w-6 h-6 text-cyan-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Task</h2>
        </div>

        <div className="space-y-4">
          {/* Task Name Field */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-900">
                Task Name *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {expandedFields.name ? 'Show less' : 'Show more'}
                </span>
                <button
                  onClick={() => toggleField('name')}
                  className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                  type="button"
                >
                  {expandedFields.name ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <textarea
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                bg-white text-gray-900 font-medium transition-all duration-200 resize-none
                ${expandedFields.name ? 'h-32' : 'h-12'}`}
              placeholder="Enter task name"
              required
            />
          </div>

          {/* Task Description Field */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-900">
                Description *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {expandedFields.description ? 'Show less' : 'Show more'}
                </span>
                <button
                  onClick={() => toggleField('description')}
                  className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                  type="button"
                >
                  {expandedFields.description ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
                font-mono text-base bg-white text-gray-900 resize-none transition-all duration-200
                ${expandedFields.description ? 'min-h-[300px]' : 'h-32'}`}
              placeholder={TASK_TEMPLATE}
              required
              style={{ whiteSpace: 'pre-wrap' }}
            />
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
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 
              hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow"
          >
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </FormContainer>
  );
}