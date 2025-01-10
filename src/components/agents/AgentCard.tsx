import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Play, MessageSquare, CheckCircle2, Bot, ArrowUpDown, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { OrderSelect } from './OrderSelect';
import { EditModal } from '../shared/EditModal';
import { ProcessModal } from './process/ProcessModal';
import { PromptResultModal } from './promptResult/PromptResultModal';
import { AgentFields } from './fields/AgentFields';
import { useAgentProcess } from '../../hooks/useAgentProcess';
import { usePromptResult } from '../../hooks/usePromptResult';
import { DeleteConfirmationModal } from '../shared/DeleteConfirmationModal';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { CompletionReport } from './reports/CompletionReport';
import type { Agent } from '../../lib/types';

interface AgentCardProps {
  agent: Agent;
  onDelete: (id: string) => void;
  onUpdate: (id: string, agent: Partial<Agent>) => void;
}

const FIELD_TEMPLATES = {
  role: `Example Role Format:

You are an expert AI assistant specializing in [specific domain].

Primary Functions:
1. [Main function 1]
2. [Main function 2]
3. [Main function 3]

Expertise Areas:
- [Area of expertise 1]
- [Area of expertise 2]
- [Area of expertise 3]

Special Capabilities:
- [Capability 1]
- [Capability 2]`,

  description: `Example Description Format:

Core Capabilities:
- [Capability 1]
- [Capability 2]
- [Capability 3]

Specialized Skills:
1. [Skill 1]: [Brief description]
2. [Skill 2]: [Brief description]
3. [Skill 3]: [Brief description]

Additional Features:
- [Feature 1]
- [Feature 2]`,

  goal: `Example Goal Format:

Primary Objective:
[State the main goal]

Key Outcomes:
1. [Outcome 1]
2. [Outcome 2]
3. [Outcome 3]

Success Metrics:
- [Metric 1]
- [Metric 2]
- [Metric 3]

Constraints:
- [Constraint 1]
- [Constraint 2]`,

  backstory: `Example Backstory Format:

Origin:
[Brief origin story]

Development History:
1. [Phase 1]: [Description]
2. [Phase 2]: [Description]
3. [Phase 3]: [Description]

Key Experiences:
- [Experience 1]
- [Experience 2]
- [Experience 3]

Guiding Principles:
1. [Principle 1]
2. [Principle 2]
3. [Principle 3]`
};

export function AgentCard({ agent, onDelete, onUpdate }: AgentCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCompletedReport, setShowCompletedReport] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [agentState, setAgentState] = useState(agent);

  useEffect(() => {
    async function loadTasks() {
      const { data: tasksData } = await supabase
        .from('tasks')
        .select(`
          *,
          prompts (*)
        `)
        .eq('agent_id', agent.id);
      
      setTasks(tasksData || []);
    }
    
    loadTasks();
  }, [agent.id]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setAgentState(agent);
  }, [agent]);
  const { 
    showProcessModal,
    isProcessing,
    error: processError,
    handleProcess,
    handleCloseModal: handleCloseProcessModal 
  } = useAgentProcess(agent);

  const {
    showPromptResultModal,
    error: promptResultError,
    handlePromptResultClick,
    handleClosePromptResultModal,
    handleSavePromptResult
  } = usePromptResult(agent);

  const {
    showDeleteConfirmation,
    itemToDelete,
    confirmationKeyword,
    userInput,
    isValid,
    handleDelete,
    handleCancelDelete,
    handleConfirmDelete,
    handleInputChange
  } = useDeleteConfirmation();

  const editFields = [
    { 
      key: 'role',
      label: 'Role',
      value: agent.role || '',
      complete: agent.role_complete,
      template: FIELD_TEMPLATES.role
    },
    { 
      key: 'description',
      label: 'Description',
      value: agent.description || '',
      complete: agent.description_complete,
      template: FIELD_TEMPLATES.description
    },
    { 
      key: 'goal',
      label: 'Goal',
      value: agent.goal || '',
      complete: agent.goal_complete,
      template: FIELD_TEMPLATES.goal
    },
    { 
      key: 'backstory',
      label: 'Backstory',
      value: agent.backstory || '',
      complete: agent.backstory_complete,
      template: FIELD_TEMPLATES.backstory
    }
  ];

  const isFullyComplete = 
    agentState.role?.trim()?.length > 0 && agentState.role_complete &&
    agentState.goal?.trim()?.length > 0 && agentState.goal_complete &&
    agentState.description?.trim()?.length > 0 && agentState.description_complete &&
    agentState.backstory?.trim()?.length > 0 && agentState.backstory_complete &&
    // Check if there's at least one task
    tasks.length > 0 &&
    // Check if all tasks are complete
    tasks.every(task => {
      // Task fields must be non-empty and complete
      const isTaskComplete = task.name?.trim()?.length > 0 && 
        task.name_complete &&
        task.description?.trim()?.length > 0 && 
        task.description_complete;

      // Check if task has at least one prompt
      const hasPrompts = task.prompts?.length > 0;

      // Check if all prompts are complete
      const arePromptsComplete = task.prompts?.every(prompt =>
        prompt.name?.trim()?.length > 0 && 
        prompt.name_complete &&
        prompt.content?.trim()?.length > 0 && 
        prompt.content_complete
      );

      return isTaskComplete && hasPrompts && arePromptsComplete;
    });

  async function handleFieldUpdate(id: string, updates: Partial<Agent>) {
    try {
      setIsSaving(true);
      setSaveError(null);

      const { error } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      if (error) {
        setSaveError('Failed to save changes');
        throw error;
      }

      // Update local state
      setAgentState(prev => ({ ...prev, ...updates }));
      
      // Notify parent
      onUpdate(id, updates);
      setSaveError(null);
    } catch (err) {
      console.error('Error updating agent:', err);
      setSaveError('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <div className={`rounded-lg shadow-sm hover:shadow-md transition-all duration-200
      ${isFullyComplete 
        ? 'bg-gradient-to-br from-purple-700 to-indigo-800 text-white' 
        : 'bg-white'}`}>
      <div className="p-6 space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2.5 rounded-lg bg-white/10">
              <Bot className={`w-6 h-6 ${isFullyComplete ? 'text-white/90' : 'text-indigo-600'}`} />
            </div>
            <h3 className={`text-xl font-semibold ${isFullyComplete ? 'text-white' : 'text-indigo-800'}`}>
              {agent.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            {isSaving && (
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-indigo-500">
                <Save size={16} className="animate-pulse" />
              </div>
            )}
            {saveError && (
              <div className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                {saveError}
              </div>
            )}
            <button
              onClick={handleProcess}
              className={`w-7 h-7 rounded-lg transition-colors duration-200 flex items-center justify-center
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50'}
                ${isProcessing ? 'animate-pulse' : ''}`}
              title="Process agent data"
              disabled={isProcessing}
            >
              <Play size={16} />
            </button>
            <button
              onClick={handlePromptResultClick}
              className={`w-7 h-7 rounded-lg transition-colors duration-200 flex items-center justify-center
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50'}`}
              title="Add/View Prompt Result"
            >
              <MessageSquare size={16} />
            </button>
            <button
              onClick={() => setShowCompletedReport(true)}
              className={`w-7 h-7 rounded-lg transition-colors duration-200 flex items-center justify-center
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-green-500 hover:text-green-700 hover:bg-green-50'}`}
              title="View Completed Items"
            >
              <CheckCircle2 size={16} />
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className={`w-7 h-7 rounded-lg transition-colors duration-200 flex items-center justify-center
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'}`}
              title="Edit agent"
            >
              <Edit2 size={16} />
            </button>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md transition-colors duration-200
              ${isFullyComplete ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-50 hover:bg-gray-100'}"
            >
              <ArrowUpDown className={`w-4 h-4 ${isFullyComplete ? 'text-white/60' : 'text-gray-400'}`} />
              <OrderSelect
                value={agent.order || 1}
                onChange={(value) => onUpdate(agent.id, { order: value })}
                variant={isFullyComplete ? 'light' : 'dark'}
              />
            </div>
            <button
              onClick={() => handleDelete(agent.name, () => onDelete(agent.id))}
              className={`w-7 h-7 rounded-lg transition-colors duration-200 flex items-center justify-center
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}
              title="Delete agent"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Fields Section */}
        <div className="pt-2">
          <AgentFields 
            agent={agentState}
            onUpdate={handleFieldUpdate}
            isComplete={isFullyComplete}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex-1">
            {(processError || promptResultError) && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {processError || promptResultError}
              </div>
            )}
          </div>

          <Link
            to={`/agents/${agent.id}/tasks`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isFullyComplete 
                ? 'text-white/90 hover:text-white hover:bg-white/10' 
                : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'}`}
          >
            View Tasks
            <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {showEditModal && (
        <EditModal
          title="Edit Agent"
          fields={editFields}
          onSave={async (values) => {
            await handleFieldUpdate(agent.id, values);
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showProcessModal && agent.agent_process && (
        <ProcessModal
          content={agent.agent_process}
          onClose={handleCloseProcessModal}
        />
      )}

      {showPromptResultModal && (
        <PromptResultModal
          promptResult={agent.prompt_result}
          onSave={handleSavePromptResult}
          onClose={handleClosePromptResultModal}
        />
      )}

      {showCompletedReport && (
        <CompletionReport
          agentId={agent.id}
          onClose={() => setShowCompletedReport(false)}
        />
      )}

      {showDeleteConfirmation && itemToDelete && (
        <DeleteConfirmationModal
          title="Delete Agent"
          message="Are you sure you want to delete this agent? This action cannot be undone."
          itemToDelete={itemToDelete}
          confirmationKeyword={confirmationKeyword}
          userInput={userInput}
          isValid={isValid}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
}