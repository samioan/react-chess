const createEmptyBoard = () => {
  const row = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const columns = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const board = columns
    .map(() => row)
    .map((row, index) => row.map((item) => item + (index + 1)))
    .reverse()
    .map((row, rowIndex) =>
      row.map((item, itemIndex) => ({
        id: item,
        position: `${rowIndex}${itemIndex}`,
        color: null,
        rank: null,
        unicodeSymbol: null,
        status: null,
      }))
    );
  return board;
};

export { createEmptyBoard };
export default createEmptyBoard;
