import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Item from "./Item";
import { useColumnDataContext } from "../context/ColumnDataContext";

export default function Column({
  columnOrder,
  columns,
  isDropDisabled,
  selectedItems,
  setSelectedItems,
}) {
  const { addItemCard } = useColumnDataContext();

  return (
    <div className="bg-slate-100 rounded-xl border p-3 h-full">
      <p className="font-bold text-slate-800 mb-2">
        {columns[columnOrder].title}
      </p>
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
            w-[250px] transition-colors rounded-xl min-h-14
            ${isDraggingOver ? "bg-slate-200 border-slate-200" : "bg-slate-100"}
            `}
          >
            {columns[columnOrder].contents.map((item, index) => (
              <Item
                key={item}
                allItems={columns.items}
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
      <button
        onClick={() => addItemCard(columnOrder)}
        className="w-full p-2 text-slate-800 text-sm font-medium text-start hover:bg-slate-200 rounded-lg"
      >
        + Add a card
      </button>
    </div>
  );
}
