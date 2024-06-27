import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Item from "./Item";

export default function Column({
  columnOrder,
  columns,
  isDropDisabled,
  selectedItems,
  setSelectedItems,
}) {
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
            <Item
              key={item}
              item={item}
              columnOrder={columnOrder}
              index={index}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
