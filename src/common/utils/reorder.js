/**
 * 컬럼 간 아이템 이동 순서 정렬 함수
 * @param {array} list 컬럼의 콘텐츠
 * @param {number} startIndex 드래그 시작 인덱스
 * @param {number} endIndex 드래그 도착 인덱스
 * @returns 재정렬 컬럼 콘텐츠
 */
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * 싱글 드래그 이동 후 컬럼 item update 함수, 객체를 파라미터로 받음
 * 객체 안 param
 *
 * @param {object} startCol 드래그 시작 컬럼
 * @param {object} finishCol 드래그 도착 컬럼
 * @param {object} source 드래그 시작 위치
 * @param {object} destination 드래그 도착 위치
 * @param {string} itemIdToMove 이동할 아이템 draggableId
 * @returns dragGroup
 */
export const reorderSingleDrag = ({
  startCol,
  finishCol,
  source,
  destination,
  itemIdToMove,
}) => {
  // 같은 컬럼 이동
  if (startCol.id === finishCol.id) {
    const newContents = reorder(
      startCol.contents,
      source.index,
      destination.index,
    );
    return {
      dragGroup: {
        updateStartCol: newContents,
        updateFinishCol: null,
      },
    };
  }

  // 다른 컬럼 이동
  let startContents = startCol.contents;
  let finishContents = finishCol.contents;

  startContents.splice(source.index, 1);
  finishContents.splice(destination.index, 0, itemIdToMove);

  return {
    dragGroup: {
      updateStartCol: startContents,
      updateFinishCol: finishContents,
    },
  };
};

/**
 * 멀티 드래그 이동 후 컬럼 item update 함수, 객체를 파라미터로 받음
 */
export const reorderMultiDrag = ({
  startCol,
  finishCol,
  source,
  destination,
  selectedItems,
}) => {
  const filteredStartContents = startCol.contents.filter(
    (item) => !selectedItems.includes(item),
  );

  // 같은 컬럼 이동
  if (startCol.id === finishCol.id) {
    const dragged = startCol.contents[source.index]; // 드래그 하는 아이템

    // 최종 드랍 위치를 계산하는 즉시 실행 함수
    const insertAtIndex = (() => {
      const destinationIndexOffset = selectedItems.reduce((acc, cur) => {
        if (cur === dragged) {
          return acc;
        }
        const index = startCol.contents.indexOf(cur);
        if (index >= destination.index) {
          return acc;
        } else {
          return acc + 1; // 선택한 아이템보다 앞에 놓을 경우
        }
      }, 0);
      const result = destination.index - destinationIndexOffset;
      return result;
    })();

    filteredStartContents.splice(insertAtIndex, 0, ...selectedItems);

    return {
      dragGroup: {
        updateStartCol: filteredStartContents,
        updateFinishCol: null,
      },
    };
  }

  // 다른 컬럼 이동
  let finishContents = finishCol.contents;
  finishCol.contents.splice(destination.index, 0, ...selectedItems);

  return {
    dragGroup: {
      updateStartCol: filteredStartContents,
      updateFinishCol: finishContents,
    },
  };
};
