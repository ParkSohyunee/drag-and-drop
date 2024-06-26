import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { items } from "../data";

export default function Column({
  columnOrder,
  columns,
  isDropDisabled,
  selectedItems,
  setSelectedItems,
}) {
  const getItemBgColor = ({ isDragging, draggingOver, isSelected }) => {
    let bgColor = "";
    if (isDragging) {
      bgColor = draggingOver
        ? "bg-blue-300 shadow-item"
        : "bg-red-300 shadow-item";
    } else {
      bgColor = isSelected ? "bg-blue-300" : "bg-slate-300";
    }
    return bgColor;
  };

  /** 각 컬럼마다 선택한 아이템을 담는 이벤트 핸들러 */
  const handleMultiSelect = (currentItem) => () => {
    // 다른 컬럼에 있는 아이템 클릭시 초기화
    for (const key in selectedItems) {
      if (key !== columnOrder) {
        selectedItems[key] = [];
      }
    }

    if (!selectedItems[columnOrder]) {
      setSelectedItems({ ...selectedItems, [columnOrder]: [currentItem] });
      return;
    }

    const isSelected = selectedItems[columnOrder].includes(currentItem);
    if (isSelected) {
      const filteredItem = selectedItems[columnOrder].filter(
        (item) => item !== currentItem,
      );
      setSelectedItems({
        ...selectedItems,
        [columnOrder]: filteredItem,
      });
    } else {
      setSelectedItems({
        ...selectedItems,
        [columnOrder]: [...selectedItems[columnOrder], currentItem],
      });
    }
  };

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
            <Draggable key={item} draggableId={item} index={index}>
              {(provided, { isDragging, draggingOver }) => (
                <div
                  onClick={handleMultiSelect(item)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`
                  p-4 mb-2 select-none transition-colors 
                  ${getItemBgColor({
                    isDragging,
                    draggingOver,
                    isSelected: selectedItems[columnOrder].includes(item),
                  })}
                  `}
                >
                  {items[item].content}
                  {isDragging && selectedItems[columnOrder].includes(item) && (
                    <div
                      className={`
                        absolute -top-2 -right-2 w-[30px] h-[30px] 
                        rounded-full bg-white text-center leading-[30px] 
                        text-sm text-slate-800 font-bold
                        `}
                    >
                      {selectedItems[columnOrder].length}
                    </div>
                  )}
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
