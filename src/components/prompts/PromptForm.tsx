import React, { useState } from 'react';
import { Plus, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { FormContainer } from '../forms/FormContainer';
import type { Task } from '../../lib/types';

interface PromptFormProps {
  task: Task;
  agent: {
    role?: string;
    role_complete?: boolean;
    goal?: string;
    goal_complete?: boolean;
    description?: string;
    description_complete?: boolean;
    backstory?: string;
    backstory_complete?: boolean;
  };
  onSubmit: (prompt: { 
    name: string;
    content: string
  }) => Promise<void>;
}

export function PromptForm({ task, agent, onSubmit }: PromptFormProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({
    name: false,
    content: false
  });
  const [error, setError] = useState<string | null>(null);


  function toggleField(field: string) {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Prompt name is required');
      return;
    }

    if (!content.trim()) {
      setError('Prompt content is required');
      return;
    }

    await onSubmit({
      name: name.trim(),
      content: content.trim()
    });
    setName('');
    setContent('');
  }

  return (
    <FormContainer type="prompt">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Prompt</h2>
        </div>

        {/* Agent Fields Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Agent Context</h3>
          <div className="space-y-4">
            {agent.role && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-indigo-200">Role</h4>
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    agent.role_complete 
                      ? 'bg-green-500/20 text-green-100' 
                      : 'bg-yellow-500/20 text-yellow-100'
                  }`}>
                    {agent.role_complete ? 'Complete' : 'Incomplete'}
                  </div>
                </div>
                <pre className="text-sm text-white/90 whitespace-pre-wrap">{agent.role}</pre>
              </div>
            )}
            {agent.goal && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-indigo-200">Goal</h4>
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    agent.goal_complete 
                      ? 'bg-green-500/20 text-green-100' 
                      : 'bg-yellow-500/20 text-yellow-100'
                  }`}>
                    {agent.goal_complete ? 'Complete' : 'Incomplete'}
                  </div>
                </div>
                <pre className="text-sm text-white/90 whitespace-pre-wrap">{agent.goal}</pre>
              </div>
            )}
            {agent.description && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-indigo-200">Description</h4>
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    agent.description_complete 
                      ? 'bg-green-500/20 text-green-100' 
                      : 'bg-yellow-500/20 text-yellow-100'
                  }`}>
                    {agent.description_complete ? 'Complete' : 'Incomplete'}
                  </div>
                </div>
                <pre className="text-sm text-white/90 whitespace-pre-wrap">{agent.description}</pre>
              </div>
            )}
            {agent.backstory && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-indigo-200">Backstory</h4>
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    agent.backstory_complete 
                      ? 'bg-green-500/20 text-green-100' 
                      : 'bg-yellow-500/20 text-yellow-100'
                  }`}>
                    {agent.backstory_complete ? 'Complete' : 'Incomplete'}
                  </div>
                </div>
                <pre className="text-sm text-white/90 whitespace-pre-wrap">{agent.backstory}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-900">
                Prompt Name *
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                bg-white text-gray-900 font-medium transition-all duration-200 resize-none
                ${expandedFields.name ? 'h-32' : 'h-12'}`}
              placeholder="Enter prompt name"
              required
            />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-900">
                Prompt Content *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {expandedFields.content ? 'Show less' : 'Show more'}
                </span>
                <button
                  onClick={() => toggleField('content')}
                  className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                  type="button"
                >
                  {expandedFields.content ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
                font-mono text-base bg-white text-gray-900 resize-none transition-all duration-200
                ${expandedFields.content ? 'min-h-[300px]' : 'h-32'}`}
              placeholder={`Example ChatGPT Prompt Format:
              <button
                onClick={() => toggleField('name')}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
                type="button"
              >
                {expandedFields.name ? (
                  <ChevronUp className="inline w-4 h-4" />
                ) : (
                  <ChevronDown className="inline w-4 h-4" />
                )}
              </button>
            </label>
            <textarea
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                bg-white text-gray-900 font-medium transition-all duration-200 ${
                  expandedFields.name ? 'h-32' : 'h-12'
                }`}
              placeholder="Enter prompt name"
              required
            />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Prompt Content *
              <button
                onClick={() => toggleField('content')}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
                type="button"
              >
                {expandedFields.content ? (
                  <ChevronUp className="inline w-4 h-4" />
                ) : (
                  <ChevronDown className="inline w-4 h-4" />
                )}
              </button>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
                font-mono text-base bg-white text-gray-900 resize-none transition-all duration-200
                ${expandedFields.content ? 'min-h-[300px]' : 'h-32'}"
              placeholder={`Example ChatGPT Prompt Format:

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
[Specify desired output format]

Additional Notes:
- [Important constraint or consideration]
- [Other relevant information]

Please provide your response following the specified format.`}
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
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 
              hover:from-pink-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow"
          >
            <Plus size={20} />
            <span>Add Prompt</span>
          </button>
        </div>
      </form>
    </FormContainer>
  );
}