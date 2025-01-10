import { useCallback, useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import type { Agent } from '../types';
import { reorderAgents } from '../api/agentApi';

export function useDragAndDrop(agents: Agent[], setAgents: (agents: Agent[]) => void) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(async (result: DropResult) => {
    setIsDragging(false);
    
    if (!result.destination) return;
    
    const { success, agents: reorderedAgents, error } = await reorderAgents(
      agents, 
      result.source.index, 
      result.destination.index
    );

    if (success) {
      setAgents(reorderedAgents);
    } else {
      console.error('Failed to reorder agents:', error);
    }
  }, [agents, setAgents]);

  return { handleDragStart, handleDragEnd, isDragging };
}