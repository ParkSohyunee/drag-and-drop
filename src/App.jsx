import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./components/Column";
import { columnOrder, initialData, initialSelectedItems } from "./data";

export default function App() {
  const [columns, setColumns] = useState(initialData);
  const [startIndex, setStartIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  /** 컬럼 간 아이템 이동 순서 정렬 */
  const reorder = (list, selectedItems, startIndex, endIndex) => {
    let result = [...list];

    const reorderResult = result.filter(
      (item) => !selectedItems.includes(item),
    );

    if (selectedItems.length > 1) {
      const find = reorderResult.findIndex((item) => item === list[endIndex]);
      reorderResult.splice(find, 0, ...selectedItems);
      return reorderResult;
    } else {
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }
  };

  const onDragStart = useCallback(
    (start) => {
      const homeIndex = columnOrder.indexOf(start.source.droppableId);
      setStartIndex(homeIndex);
    },
    [startIndex],
  );

  const onDragEnd = useCallback(
    (result) => {
      setStartIndex(null);

      const { destination, source, draggableId } = result;
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return; // 출발지, 도착지 같으면 return
      }

      const startCol = columns[source.droppableId]; // 출발 컬럼
      const finishCol = columns[destination.droppableId]; // 도착 컬럼

      // 짝수 아이템이 다른 짝수 아이템 앞으로 이동 금지
      if (
        Number(draggableId.split("-")[1]) % 2 === 0 &&
        finishCol.contents.length > 0
      ) {
        const destinationIndex =
          destination.index === 0
            ? finishCol.contents[destination.index].split("-")[1]
            : finishCol.contents[destination.index - 1].split("-")[1];
        if (destinationIndex % 2 === 0) {
          return;
        }
      }

      // 같은 column일 때
      if (startCol.id === finishCol.id) {
        const newContents = reorder(
          startCol.contents,
          selectedItems[startCol.id],
          source.index,
          destination.index,
        );
        const newColumn = {
          ...startCol,
          contents: newContents,
        };
        setColumns({
          ...columns,
          [newColumn.id]: newColumn,
        });
      } else {
        const itemToMove = selectedItems[startCol.id];
        let startContents = startCol.contents;

        if (itemToMove.length > 0) {
          startContents = startCol.contents.filter(
            (item) => !selectedItems[startCol.id].includes(item),
          );
        } else {
          startCol.contents.splice(source.index, 1);
        }
        const newStart = {
          ...startCol,
          contents: startContents,
        };

        const finishContents = finishCol.contents;
        if (itemToMove.length > 0) {
          finishContents.splice(destination.index, 0, ...itemToMove);
        } else {
          finishContents.splice(destination.index, 0, draggableId);
        }

        const newFinish = {
          ...finishCol,
          contents: finishContents,
        };

        setColumns({
          ...columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        });
      }
      setSelectedItems(initialSelectedItems);
    },
    [columns, selectedItems],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="flex">
        {columnOrder.map((order, index) => (
          <Column
            key={order}
            columnOrder={order}
            columns={columns}
            isDropDisabled={startIndex === 0 && index === 2}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
