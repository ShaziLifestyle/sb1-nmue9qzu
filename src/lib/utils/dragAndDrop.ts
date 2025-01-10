import type { DropResult } from 'react-beautiful-dnd';

export function handleDragEnd(
  result: DropResult,
  onReorder: (startIndex: number, endIndex: number) => void
) {
  if (!result.destination) return;
    
  const startIndex = result.source.index;
  const endIndex = result.destination.index;
    
  if (startIndex === endIndex) return;
    
  onReorder(startIndex, endIndex);
}