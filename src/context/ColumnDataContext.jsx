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
   * 새롭게 생성되는 아이템은 연속된 순서를 유지
   */
  const addItemCard = (columnId) => {
    const [lastItemCount] = Object.keys(columns.items).slice(-1);
    const nextItemCount = +lastItemCount.split("-")[1] + 1;
    const newItemId = `item-${nextItemCount}`;
    const newItemInfo = {
      id: newItemId,
      content: `item ${nextItemCount}`,
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

  /**
   * 컬럼에 아이템 삭제 기능 함수
   */
  const deleteItemCard = ({ columnId, itemId }) => {
    const newItems = {};
    for (let key in columns.items) {
      if (key !== itemId) {
        newItems[key] = columns.items[key];
      }
    }

    const newColumnContents = columns[columnId].contents.filter(
      (item) => item !== itemId,
    );

    return setColumns((prev) => {
      const newColumn = {
        ...prev[columnId],
        contents: newColumnContents,
      };
      return {
        ...prev,
        [columnId]: newColumn,
        items: newItems,
      };
    });
  };

  return (
    <ColumnDataContext.Provider
      value={{
        columns,
        setColumns,
        addItemCard,
        deleteItemCard,
      }}
    >
      {children}
    </ColumnDataContext.Provider>
  );
};
