import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { EditModal } from '../shared/EditModal';
import { FieldCompletionCheckbox } from '../shared/FieldCompletionCheckbox';
import { DeleteConfirmationModal } from '../shared/DeleteConfirmationModal';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import type { Task } from '../../lib/types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const TASK_TEMPLATES = {
  name: "Enter a descriptive name for this task",
  description: `Example Task Description Format:

Objective:
[Clear statement of what this task aims to achieve]

Requirements:
1. [Primary requirement]
2. [Secondary requirement]
3. [Additional requirement]

Input Parameters:
- [Parameter 1]: [Description]
- [Parameter 2]: [Description]

Expected Output:
- [Output format]
- [Success criteria]

Additional Notes:
- [Important considerations]
- [Constraints or limitations]`
};

export function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
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
  
  async function handleFieldComplete(field: 'name' | 'description', complete: boolean) {
    if (!task.id) {
      console.error('Missing task ID');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .update({ [`${field}_complete`]: complete })
      .eq('id', task.id);

    if (error) {
      console.error('Error updating task completion:', error);
      // Handle error gracefully - don't throw
    } else {
      onUpdate();
    }
  }

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
      key: 'name',
      label: 'Task Name',
      value: task.name,
      required: true,
      template: TASK_TEMPLATES.name
    },
    {
      key: 'description',
      label: 'Description',
      value: task.description || '',
      required: true,
      template: TASK_TEMPLATES.description
    }
  ];

  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    async function loadPrompts() {
      const { data: promptsData } = await supabase
        .from('prompts')
        .select('*')
        .eq('task_id', task.id);
      
      setPrompts(promptsData || []);
    }
    
    loadPrompts();
  }, [task.id]);

  const isFullyComplete = 
    // Task fields must be non-empty and complete
    task.name?.trim()?.length > 0 && task.name_complete &&
    task.description?.trim()?.length > 0 && task.description_complete &&
    // Must have at least one prompt
    prompts.length > 0 &&
    // All prompts must be complete
    prompts.every(prompt =>
      prompt.name?.trim()?.length > 0 && prompt.name_complete &&
      prompt.content?.trim()?.length > 0 && prompt.content_complete
    );

  // Function to get background color based on completion status
  function getBackgroundColor(fieldComplete: boolean) {
    if (isFullyComplete) {
      return '';
    }
    return fieldComplete ? 'bg-green-50' : 'bg-white';
  }

  // Function to get label color based on completion status
  function getLabelColor(fieldComplete: boolean) {
    if (isFullyComplete) {
      return 'text-white/90';
    }
    return fieldComplete ? 'text-black' : 'text-gray-900';
  }

  // Function to get label background color based on completion status
  function getLabelBackgroundColor(fieldComplete: boolean) {
    if (isFullyComplete) {
      return 'bg-transparent';
    }
    return fieldComplete ? 'bg-green-50 w-full' : 'w-full';
  }

  return (
    <div className={`rounded-lg shadow-sm hover:shadow-md transition-all duration-200
      ${isFullyComplete 
        ? 'bg-gradient-to-br from-purple-700 to-indigo-800 text-white' 
        : 'bg-white'}`}>
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <FieldCompletionCheckbox
                checked={task.name_complete}
                onChange={(checked) => handleFieldComplete('name', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className={`flex-1 rounded-md transition-all duration-200 ${getLabelBackgroundColor(task.name_complete)}`}>
                    <h3 className={`font-medium px-2 py-1 ${getLabelColor(task.name_complete)}`}>
                    Task Name
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleField('name')}
                    className={`ml-2 p-1 rounded transition-colors duration-200
                      ${isFullyComplete 
                        ? 'text-white/80 hover:bg-white/10' 
                        : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'}`}
                    type="button"
                  >
                    {expandedFields.name ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-200 p-2 rounded-lg
                  ${getBackgroundColor(task.name_complete)}
                  ${expandedFields.name ? 'max-h-96' : 'max-h-6'}`}>
                  <p className={`${isFullyComplete ? 'text-white/90' : 'text-gray-600'}`}>
                    {task.name}
                  </p>
                </div>
              </div>
            </div>
            {task.description && (
              <div className="flex items-start gap-3">
                <FieldCompletionCheckbox
                  checked={task.description_complete}
                  onChange={(checked) => handleFieldComplete('description', checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className={`flex-1 rounded-md transition-all duration-200 ${getLabelBackgroundColor(task.description_complete)}`}>
                      <h4 className={`text-sm font-medium px-2 py-1 ${getLabelColor(task.description_complete)}`}>
                      Task Description
                      </h4>
                    </div>
                    <button
                      onClick={() => toggleField('description')}
                      className={`ml-2 p-1 rounded transition-colors duration-200
                        ${isFullyComplete 
                          ? 'text-white/80 hover:bg-white/10' 
                          : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'}`}
                      type="button"
                    >
                      {expandedFields.description ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className={`overflow-hidden transition-all duration-200 p-2 rounded-lg
                    ${getBackgroundColor(task.description_complete)}
                    ${expandedFields.description ? 'max-h-[500px]' : 'max-h-12'}`}>
                    <pre className={`whitespace-pre-wrap font-mono text-sm mt-1 ${isFullyComplete ? 'text-white/90' : 'text-gray-600'}`}>
                      {task.description}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            <Link
              to={`/tasks/${task.id}/prompts`}
              className={`px-3 py-1 rounded-md border transition-colors duration-200
                ${isFullyComplete 
                  ? 'text-white border-white/30 hover:bg-white/10' 
                  : 'text-indigo-500 border-indigo-500 hover:border-indigo-700 hover:text-indigo-700'}`}
            >
              View Prompts
            </Link>
            <button
              onClick={() => setShowEditModal(true)}
              className={`p-1 rounded transition-colors duration-200
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'}`}
              title="Edit task"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={() => handleDelete(task.name, () => onDelete(task.id))}
              className={`p-1 rounded transition-colors duration-200
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}
              title="Delete task"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditModal
          title="Edit Task"
          fields={editFields}
          onSave={async (values) => {
            const { error } = await supabase
              .from('tasks')
              .update(values)
              .eq('id', task.id);

            if (error) {
              console.error('Error updating task:', error);
              return;
            }

            setShowEditModal(false);
            onUpdate();
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteConfirmation && itemToDelete && (
        <DeleteConfirmationModal
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
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