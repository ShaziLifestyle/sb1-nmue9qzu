import React from 'react';
import { DraggableAgentItem } from './DraggableAgentItem';
import { DroppableWrapper } from '../../lib/components/dnd/DroppableWrapper';
import type { Agent } from '../../lib/types';

interface DroppableAgentGridProps {
  agents: Agent[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, agent: Partial<Agent>) => void;
  isDragging: boolean;
}

export function DroppableAgentGrid({ 
  agents, 
  onDelete, 
  onUpdate,
  isDragging 
}: DroppableAgentGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <DroppableWrapper droppableId="agents">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-6 ${
              snapshot.isDraggingOver ? 'bg-indigo-50/50' : ''
            } transition-colors duration-200`}
          >
            {agents.map((agent, index) => (
              <DraggableAgentItem
                key={agent.id}
                agent={agent}
                index={index}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </DroppableWrapper>
    </div>
  );
}