const boardCreator = () => {
  const rows = Array(8)
    .fill(1)
    .map((item, index) => item + index)
    .reverse();

  const files = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const board = [...rows.map((x) => files.map((y) => x + y))].flat();
  return board;
};

export { boardCreator };
export default boardCreator;
