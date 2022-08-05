import flatten from "lodash/flatten";
import TILE_STATUS from "./tileStatus";

const SELECTED_TILE = (pieces) =>
  flatten(pieces).find((piece) => piece.status === TILE_STATUS.SELECTED);

export { SELECTED_TILE };
export default SELECTED_TILE;
