import type { Agent } from './index';

export interface DragAndDropHandlers {
  onDragEnd: (startIndex: number, endIndex: number) => Promise<void>;
  onDragStart?: () => void;
  onDragUpdate?: () => void;
}

export interface ReorderResult {
  success: boolean;
  agents: Agent[];
  error?: string;
}