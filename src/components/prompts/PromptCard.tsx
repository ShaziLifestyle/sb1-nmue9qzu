import React, { useState } from 'react';
import { Trash2, Edit2, ChevronDown, ChevronUp, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { FieldCompletionCheckbox } from '../shared/FieldCompletionCheckbox';
import { DeleteConfirmationModal } from '../shared/DeleteConfirmationModal';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { EditModal } from '../shared/EditModal';
import type { Prompt } from '../../lib/types';

const PROMPT_TEMPLATES = {
  name: "Enter a descriptive name for this prompt",
  content: `Example Prompt Format:

ROLE:
You are an AI assistant tasked with [specific role]

CONTEXT:
[Provide relevant background information]

TASK:
[Describe the specific task or request]

REQUIREMENTS:
1. [First requirement]
2. [Second requirement]
3. [Third requirement]

FORMAT:
[Specify desired output format]

ADDITIONAL NOTES:
- [Important constraint or consideration]
- [Other relevant information]

Please provide your response following the specified format.`
};

interface PromptCardProps {
  prompt: Prompt;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export function PromptCard({ prompt, onDelete, onUpdate }: PromptCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({
    name: false,
    content: false
  });
  
  function toggleField(field: string) {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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

  async function handleFieldComplete(field: 'name' | 'content', complete: boolean) {
    if (!prompt.id) {
      console.error('Missing prompt ID');
      return;
    }

    // Prepare the update data
    const updates = {
      [`${field}_complete`]: complete
    };

    const { error } = await supabase
      .from('prompts')
      .update(updates)
      .eq('id', prompt.id);

    if (error) {
      console.error('Error updating prompt completion:', error);
      return;
    }

    // Only call onUpdate if the update was successful
    onUpdate();
  }

  const editFields = [
    {
      key: 'name',
      label: 'Prompt Name',
      value: prompt.name,
      required: true,
      template: PROMPT_TEMPLATES.name
    },
    {
      key: 'content',
      label: 'Prompt Content',
      value: prompt.content,
      required: true,
      template: PROMPT_TEMPLATES.content
    }
  ];

  const isFullyComplete = 
    // Prompt fields must be non-empty and complete
    prompt.name?.trim()?.length > 0 && 
    prompt.name_complete &&
    prompt.content?.trim()?.length > 0 && 
    prompt.content_complete;

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
                checked={prompt.name_complete}
                onChange={(checked) => handleFieldComplete('name', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className={`flex-1 rounded-md transition-all duration-200 ${getLabelBackgroundColor(prompt.name_complete)}`}>
                    <h3 className={`font-medium px-2 py-1 ${getLabelColor(prompt.name_complete)}`}>
                      Prompt Name
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
                  ${getBackgroundColor(prompt.name_complete)}
                  ${expandedFields.name ? 'max-h-96' : 'max-h-6'}`}>
                  <p className={isFullyComplete ? 'text-white/90' : 'text-gray-600'}>
                    {prompt.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FieldCompletionCheckbox
                checked={prompt.content_complete}
                onChange={(checked) => handleFieldComplete('content', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className={`flex-1 rounded-md transition-all duration-200 ${getLabelBackgroundColor(prompt.content_complete)}`}>
                    <h4 className={`text-sm font-medium px-2 py-1 ${getLabelColor(prompt.content_complete)}`}>
                      Prompt Content
                    </h4>
                  </div>
                  <button
                    onClick={() => toggleField('content')}
                    className={`ml-2 p-1 rounded transition-colors duration-200
                      ${isFullyComplete 
                        ? 'text-white/80 hover:bg-white/10' 
                        : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'}`}
                    type="button"
                  >
                    {expandedFields.content ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-200 p-2 rounded-lg
                  ${getBackgroundColor(prompt.content_complete)}
                  ${expandedFields.content ? 'max-h-[500px]' : 'max-h-12'}`}>
                  <pre className={`whitespace-pre-wrap font-sans mt-1
                    ${isFullyComplete ? 'text-white/90' : 'text-gray-600'}`}>
                    {prompt.content}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setShowEditModal(true)}
              className={`p-1 rounded transition-colors duration-200
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'}`}
              title="Edit prompt"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={() => handleDelete(prompt.name, () => onDelete(prompt.id))}
              className={`p-1 rounded transition-colors duration-200
                ${isFullyComplete 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}
              title="Delete prompt"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditModal
          title="Edit Prompt"
          fields={editFields}
          onSave={async (values) => {
            const { error } = await supabase
              .from('prompts')
              .update(values)
              .eq('id', prompt.id);

            if (error) {
              console.error('Error updating prompt:', error);
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
          title="Delete Prompt"
          message="Are you sure you want to delete this prompt? This action cannot be undone."
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