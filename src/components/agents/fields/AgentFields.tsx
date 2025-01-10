import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FieldCompletionCheckbox } from '../../shared/FieldCompletionCheckbox';
import { supabase } from '../../../lib/supabase';
import type { Agent } from '../../../lib/types';

interface AgentFieldsProps {
  agent: Agent;
  onUpdate: (id: string, updates: Partial<Agent>) => void;
  isComplete?: boolean;
}

interface ExpandableFieldProps {
  label: string;
  value: string | undefined;
  isComplete: boolean;
  onComplete: (checked: boolean) => Promise<void>;
  isParentComplete?: boolean;
}

function ExpandableField({ 
  label, 
  value, 
  isComplete, 
  onComplete,
  isParentComplete 
}: ExpandableFieldProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const shouldShowExpand = value && value.length > 100;

  const textColor = isParentComplete ? 'text-white' : 'text-gray-800';
  const labelColor = isParentComplete ? 'text-white/80' : 'text-gray-600';
  const bgColor = isComplete 
    ? isParentComplete 
      ? 'bg-white/20' 
      : 'bg-green-50/90'
    : isParentComplete 
      ? 'bg-white/10 hover:bg-white/20' 
      : 'bg-gray-50 hover:bg-gray-100';

  return (
    <div className={`rounded-lg overflow-hidden transition-all duration-200 ${bgColor}`}>
      <div className="px-4 py-3">
        <div className="flex items-start gap-3">
          <FieldCompletionCheckbox
            checked={isComplete}
            onChange={onComplete}
            showSaveStatus={true}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${labelColor}`}>{label}</span>
              {shouldShowExpand && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`ml-2 p-1.5 rounded-full transition-colors flex items-center gap-1 text-sm
                    ${isParentComplete ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      <span>Show More</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <div className={`text-sm mt-2 ${textColor} ${!isExpanded && shouldShowExpand ? 'line-clamp-2' : ''}`}>
              {value || 'Not set'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AgentFields({ agent, onUpdate, isComplete }: AgentFieldsProps) {
  const fields = [
    { 
      key: 'role' as const, 
      label: 'Role', 
      value: agent.role, 
      isComplete: agent.role_complete 
    },
    { 
      key: 'description' as const, 
      label: 'Description', 
      value: agent.description, 
      isComplete: agent.description_complete 
    },
    { 
      key: 'goal' as const, 
      label: 'Goal', 
      value: agent.goal, 
      isComplete: agent.goal_complete 
    },
    { 
      key: 'backstory' as const, 
      label: 'Backstory', 
      value: agent.backstory, 
      isComplete: agent.backstory_complete 
    }
  ];

  async function handleFieldComplete(field: keyof Agent, checked: boolean) {
    try {
      if (!agent.id) {
        console.error('Missing agent ID for field completion update');
        return;
      }

      // Prepare the update data
      const updates = {
        [`${field}_complete`]: checked
      };

      const { error } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', agent.id);

      if (error) {
        console.error('Error updating field completion:', error);
        throw error;
      }

      // Only update UI if the database update was successful
      onUpdate(agent.id, updates);
    } catch (err) {
      console.error('Error updating field completion:', err);
      // Handle error gracefully without throwing
    }
  }

  return (
    <div className="space-y-3">
      {fields.map(({ key, label, value, isComplete: fieldComplete }) => (
        value?.trim()?.length > 0 && (
        <ExpandableField
          key={key}
          label={label}
          value={value}
          isComplete={fieldComplete}
          isParentComplete={isComplete}
          onComplete={(checked) => handleFieldComplete(key, checked)}
        />
        )
      ))}
    </div>
  );
}