const alternateTileColors = (tile) => {
  if (
    tile.id.charAt(0) === "a" ||
    tile.id.charAt(0) === "c" ||
    tile.id.charAt(0) === "e" ||
    tile.id.charAt(0) === "g"
  ) {
    if (Number(tile.id.charAt(1)) % 2 === 0) {
      return "light";
    } else return "dark";
  } else if (
    tile.id.charAt(0) === "b" ||
    tile.id.charAt(0) === "d" ||
    tile.id.charAt(0) === "f" ||
    tile.id.charAt(0) === "h"
  ) {
    if (Number(tile.id.charAt(1)) % 2 === 0) {
      return "dark";
    } else return "light";
  }
};

export { alternateTileColors };
export default alternateTileColors;
