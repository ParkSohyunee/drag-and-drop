import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Column({ columnOrder, columns, isDropDisabled }) {
  return (
    <Droppable
      key={columnOrder}
      droppableId={columnOrder}
      isDropDisabled={isDropDisabled}
    >
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`
          w-[250px] p-2 
          ${snapshot.isDraggingOver ? "bg-blue-100" : "bg-slate-100"}
          `}
        >
          {columns[columnOrder].contents.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`
                  p-4 mb-2 select-none
                  ${snapshot.isDragging ? "bg-blue-300" : "bg-slate-300"}
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
