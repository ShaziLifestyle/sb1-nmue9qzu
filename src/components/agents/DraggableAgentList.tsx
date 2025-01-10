import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DroppableAgentGrid } from './DroppableAgentGrid';
import { useDragAndDrop } from '../../lib/hooks/useDragAndDrop';
import type { Agent } from '../../lib/types';

interface DraggableAgentListProps {
  agents: Agent[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, agent: Partial<Agent>) => void;
  setAgents: (agents: Agent[]) => void;
}

export function DraggableAgentList({ 
  agents, 
  onDelete, 
  onUpdate, 
  setAgents 
}: DraggableAgentListProps) {
  const { handleDragStart, handleDragEnd, isDragging } = useDragAndDrop(agents, setAgents);

  return (
    <DragDropContext 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DroppableAgentGrid 
        agents={agents}
        onDelete={onDelete}
        onUpdate={onUpdate}
        isDragging={isDragging}
      />
    </DragDropContext>
  );
}