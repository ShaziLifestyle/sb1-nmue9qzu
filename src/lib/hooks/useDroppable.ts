import { useCallback } from 'react';
import type { DroppableProvided } from 'react-beautiful-dnd';
import type { Agent } from '../types';

export function useDroppable(
  agents: Agent[],
  onDelete: (id: string) => void,
  onUpdate: (id: string, agent: Partial<Agent>) => void
) {
  const renderDroppableContent = useCallback((provided: DroppableProvided) => {
    return {
      ref: provided.innerRef,
      ...provided.droppableProps,
      agents,
      onDelete,
      onUpdate,
      placeholder: provided.placeholder
    };
  }, [agents, onDelete, onUpdate]);

  return { renderDroppableContent };
}