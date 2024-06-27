const columnOrder = ["column-1", "column-2", "column-3", "column-4"];

const initialSelectedItems = columnOrder.reduce((acc, cur) => {
  acc[cur] = [];
  return acc;
}, {});

const items = {
  "item-1": { id: "item-1", content: "item 1" },
  "item-2": { id: "item-2", content: "item 2" },
  "item-3": { id: "item-3", content: "item 3" },
  "item-4": { id: "item-4", content: "item 4" },
  "item-5": { id: "item-5", content: "item 5" },
  "item-6": { id: "item-6", content: "item 6" },
  "item-7": { id: "item-7", content: "item 7" },
  "item-8": { id: "item-8", content: "item 8" },
  "item-9": { id: "item-9", content: "item 9" },
  "item-10": { id: "item-10", content: "item 10" },
};

const initialData = {
  "column-1": {
    id: "column-1",
    title: "할 일",
    contents: Object.keys(items),
  },
  "column-2": {
    id: "column-2",
    title: "진행 중",
    contents: [],
  },
  "column-3": {
    id: "column-3",
    title: "완료",
    contents: [],
  },
  "column-4": {
    id: "column-4",
    title: "백로그",
    contents: [],
  },
};

export { columnOrder, initialSelectedItems, initialData, items };
