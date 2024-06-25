import "./styles/globals.css";
import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const getItems = (count, colsId) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `col-${colsId}-item-${k}`,
      content: `col-${colsId}-item ${k}`,
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
  console.log(columns); // 삭제 예정

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setData(newItems);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
        {columnOrder.map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {columns[column].contents.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
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
        ))}
      </div>
    </DragDropContext>
  );
}

const GRID = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
  width: 250,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
