import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Column({ columnOrder, columns, isDropDisabled }) {
  return (
    <Droppable
      key={columnOrder}
      droppableId={columnOrder}
      isDropDisabled={isDropDisabled}
    >
      {(provided, { isDraggingOver }) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`
          w-[250px] p-2 border transition-colors 
          ${isDraggingOver ? "bg-blue-100 border-blue-500" : "bg-slate-100"}
          `}
        >
          {columns[columnOrder].contents.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, { isDragging, draggingOver }) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`
                  p-4 mb-2 select-none transition-colors 
                  ${
                    isDragging
                      ? draggingOver
                        ? "bg-blue-300 shadow-item"
                        : "bg-red-300 shadow-item"
                      : "bg-slate-300"
                  }
                  `}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
