import React from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

type DroppableWrapperProps = Omit<DroppableProps, 'children'> & {
  children: (provided: any, snapshot: any) => React.ReactNode;
};

export function DroppableWrapper({ children, ...props }: DroppableWrapperProps) {
  return (
    <Droppable
      mode="standard"
      type="DEFAULT"
      direction="vertical"
      isCombineEnabled={false}
      {...props}
    >
      {children}
    </Droppable>
  );
}