import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AgentCard } from './AgentCard';
import type { Agent } from '../../lib/types';

interface DraggableAgentItemProps {
  agent: Agent;
  index: number;
  onDelete: (id: string) => void;
  onUpdate: (id: string, agent: Partial<Agent>) => void;
}

export function DraggableAgentItem({ 
  agent, 
  index, 
  onDelete, 
  onUpdate 
}: DraggableAgentItemProps) {
  return (
    <Draggable 
      draggableId={agent.id} 
      index={index}
      isDragDisabled={false}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`transition-all duration-200 ${
            snapshot.isDragging ? 'opacity-50 scale-105' : ''
          }`}
        >
          <AgentCard
            agent={agent}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </Draggable>
  );
}