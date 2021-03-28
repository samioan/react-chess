const colorPicker = (tile) => {
  if (
    tile[0].charAt(0) === "A" ||
    tile[0].charAt(0) === "C" ||
    tile[0].charAt(0) === "E" ||
    tile[0].charAt(0) === "G"
  ) {
    if (Number(tile[0].charAt(1)) % 2 === 0) {
      return "light";
    } else return "dark";
  } else if (
    tile[0].charAt(0) === "B" ||
    tile[0].charAt(0) === "D" ||
    tile[0].charAt(0) === "F" ||
    tile[0].charAt(0) === "H"
  ) {
    if (Number(tile[0].charAt(1)) % 2 === 0) {
      return "dark";
    } else return "light";
  }
};

export { colorPicker };
export default colorPicker;
