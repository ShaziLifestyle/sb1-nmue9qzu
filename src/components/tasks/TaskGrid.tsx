import React from 'react';
import { TaskCard } from './TaskCard';
import type { Task } from '../../lib/types';

interface TaskGridProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export function TaskGrid({ tasks, onDelete, onUpdate }: TaskGridProps) {
  if (!tasks.length) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-6">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}