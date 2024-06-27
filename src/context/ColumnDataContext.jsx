import React, { createContext, useContext, useState } from "react";

import { initialData } from "../data";

const ColumnDataContext = createContext(null);

export const useColumnDataContext = () => {
  const context = useContext(ColumnDataContext);
  if (!context) {
    throw new Error(
      "useColumnDataContext는 ColumnDataProvider 안에서 사용해야 합니다.",
    );
  }
  return context;
};

export const ColumnDataProvider = ({ children }) => {
  const [columns, setColumns] = useState(initialData);

  /**
   * 컬럼에 아이템 추가 기능 함수
   */
  const addItemCard = (columnId) => {
    const currentItemCount = Object.keys(columns.items).length;
    const newItemId = `item-${currentItemCount + 1}`;
    const newItemInfo = {
      id: newItemId,
      content: `item ${currentItemCount + 1}`,
    };

    return setColumns((prev) => {
      const newItems = { ...prev.items, [newItemId]: newItemInfo };
      const newColumn = {
        ...prev[columnId],
        contents: [...prev[columnId].contents, newItemId],
      };
      return {
        ...prev,
        [columnId]: newColumn,
        items: newItems,
      };
    });
  };

  return (
    <ColumnDataContext.Provider value={{ columns, setColumns, addItemCard }}>
      {children}
    </ColumnDataContext.Provider>
  );
};