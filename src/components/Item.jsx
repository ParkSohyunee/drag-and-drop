import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { items } from "../data";

export default function Item({
  columnOrder,
  item,
  index,
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
      bgColor = isSelected ? "bg-orange-300" : "bg-slate-300";
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
    <Draggable draggableId={item} index={index}>
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
  );
}
