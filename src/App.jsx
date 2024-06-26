import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";

/**
 TODO
 [x] 컬럼 간 아이템 이동 기능
 [x] 컬럼 이동 제약 조건 설정
 [x] 제약이 있을 때 스타일링
 [ ] 멀티 드래그 구현
 */

export default function App() {
  const getItems = (count, colsId) =>
    Array.from({ length: count }, (_, k) => k).map((k) => ({
      id: `col-${colsId}-item-${k + 1}`,
      content: `col-${colsId}-item ${k + 1}`,
    }));

  const columnOrder = ["column-1", "column-2", "column-3", "column-4"];

  const initialData = {
    "column-1": {
      id: "column-1",
      contents: getItems(10, 1),
    },
    "column-2": {
      id: "column-2",
      contents: getItems(10, 2),
    },
    "column-3": {
      id: "column-3",
      contents: getItems(10, 3),
    },
    "column-4": {
      id: "column-4",
      contents: getItems(10, 4),
    },
  };

  const [columns, setColumns] = useState(initialData);
  const [startIndex, setStartIndex] = useState(null);
  console.log(columns); // 삭제 예정

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
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

      // 짝수 아이템이 다른 짝수 아이템 앞으로 이동 제약
      if ((source.index + 1) % 2 === 0)
        if ((destination.index + 1) % 2 !== 0) {
          return;
        }

      const startCol = columns[source.droppableId]; // 출발 컬럼
      const finishCol = columns[destination.droppableId]; // 도착 컬럼

      // 같은 column일 때
      if (startCol.id === finishCol.id) {
        const newContents = reorder(
          startCol.contents,
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
        const startContents = Array.from(startCol.contents);
        startContents.splice(source.index, 1);
        const newStart = {
          ...startCol,
          contents: startContents,
        };

        const finishContents = Array.from(finishCol.contents);
        finishContents.splice(destination.index, 0, {
          id: draggableId,
          content: draggableId,
        });
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
    },
    [columns],
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
          />
        ))}
      </div>
    </DragDropContext>
  );
}
