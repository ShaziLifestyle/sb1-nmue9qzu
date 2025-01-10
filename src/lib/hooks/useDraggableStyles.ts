import { useCallback } from 'react';
import type { DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

export function useDraggableStyles() {
  return useCallback((
    style: DraggingStyle | NotDraggingStyle | undefined,
    snapshot: DraggableStateSnapshot
  ) => ({
    ...style,
    opacity: snapshot.isDragging ? 0.5 : 1,
    cursor: snapshot.isDragging ? 'grabbing' : 'grab',
    transform: style?.transform,
    transition: snapshot.isDragging ? 'none' : 'transform 0.2s ease-in-out'
  }), []);
}