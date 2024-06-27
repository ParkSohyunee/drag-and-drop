import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./components/Column";
import { columnOrder, initialData, initialSelectedItems } from "./data";
import { reorderSingleDrag } from "./common/utils/reorder";

export default function App() {
  const [columns, setColumns] = useState(initialData);
  const [startIndex, setStartIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

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

      const itemToMove = selectedItems[startCol.id];

      if (itemToMove.length > 0) {
      } else {
        const { dragGroup } = reorderSingleDrag({
          startCol: startCol,
          finishCol: finishCol,
          source,
          destination,
          itemIdToMove: draggableId,
        });

        const newStart = {
          ...startCol,
          contents: dragGroup.updateStartCol,
        };

        setColumns({
          ...columns,
          [newStart.id]: newStart,
        });

        if (dragGroup.updateFinishCol) {
          const newFinish = {
            ...finishCol,
            contents: dragGroup.updateFinishCol,
          };

          setColumns({
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          });
        }
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
