import React from 'react';
import { Trash2, Edit2, Save, X, Play, MessageSquare, CheckCircle2 } from 'lucide-react';
import { CompletionReport } from './reports/CompletionReport';

interface AgentCardActionsProps {
  isEditing: boolean;
  isProcessing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onProcess: () => void;
  onPromptResult: () => void;
  onEdit: () => void;
  onDelete: () => void;
  agentId: string;
  isComplete?: boolean;
}

export function AgentCardActions({
  isEditing,
  isProcessing,
  onSave,
  onCancel,
  onProcess,
  onPromptResult,
  onEdit,
  onDelete,
  agentId,
  isComplete
}: AgentCardActionsProps) {
  const [showCompletedReport, setShowCompletedReport] = React.useState(false);

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="text-green-500 hover:text-green-700 transition-colors duration-200"
          title="Save changes"
        >
          <Save size={20} />
        </button>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          title="Cancel editing"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onProcess}
        className={`text-indigo-500 hover:text-indigo-700 transition-colors duration-200 
          ${isProcessing ? 'animate-pulse' : ''}`}
        title="Process agent data"
        disabled={isProcessing}
      >
        <Play size={20} />
      </button>
      <button
        onClick={onPromptResult}
        className="text-emerald-500 hover:text-emerald-700 transition-colors duration-200"
        title="Add/View Prompt Result"
      >
        <MessageSquare size={20} />
      </button>
      <button
        onClick={() => setShowCompletedReport(true)}
        className="text-green-500 hover:text-green-700 transition-colors duration-200"
        title="View Completed Items"
      >
        <CheckCircle2 size={20} />
      </button>
      <button
        onClick={onEdit}
        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        title="Edit agent"
      >
        <Edit2 size={20} />
      </button>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 transition-colors duration-200"
        title="Delete agent"
      >
        <Trash2 size={20} />
      </button>

      {showCompletedReport && (
        <CompletionReport
          agentId={agentId}
          onClose={() => setShowCompletedReport(false)}
        />
      )}
    </div>
  );
}