import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { useColumnDataContext } from "../context/ColumnDataContext";

export default function Item({
  columnOrder,
  allItems,
  item,
  index,
  selectedItems,
  setSelectedItems,
}) {
  const { deleteItemCard } = useColumnDataContext();

  const getItemBgColor = ({ isDragging, draggingOver, isSelected }) => {
    let bgColor = "";
    if (isDragging) {
      bgColor = draggingOver
        ? "bg-blue-300 shadow-drag"
        : "bg-red-300 shadow-drag";
    } else {
      bgColor = isSelected ? "bg-orange-300" : "bg-white";
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

  const handleDeleteItem = (columnId, itemId) => (e) => {
    e.stopPropagation();

    if (selectedItems[columnId].includes(itemId)) {
      const filtered = selectedItems[columnId].filter(
        (item) => item !== itemId,
      );
      setSelectedItems((prev) => {
        return {
          ...prev,
          [columnId]: filtered,
        };
      });
    }

    deleteItemCard({
      columnId,
      itemId,
    });
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
          p-4 mb-2 select-none transition-colors relative
          rounded-xl shadow-item text-slate-800 group
          ${getItemBgColor({
            isDragging,
            draggingOver,
            isSelected: selectedItems[columnOrder].includes(item),
          })}
          `}
        >
          {allItems[item].content}
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
          <div
            onClick={handleDeleteItem(columnOrder, item)}
            className={`
              hidden group-hover:block cursor-pointer
              absolute -top-2 -right-2 w-6 h-6 
              rounded-full bg-red-400 text-center leading-[30px] 
              text-sm text-white font-bold
              `}
          >
            <img
              className="w-full h-full p-1 transi rotate-45"
              src="/icons/close-small-white.svg"
              alt="아이템 삭제"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}
