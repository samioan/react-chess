import React, { useEffect } from "react";
import Tile from "../tile";
import { connect } from "react-redux";

import "./board.css";

import { boardPieces } from "../../models/game/selectors";
import { startGame, choosePiece } from "../../models/game/actions";
import colorPicker from "../../lib/colorPicker";

const Board = ({ boardPieces, onClickPlayHandler, onClickChooseHandler }) => {
  useEffect(() => {
    onClickPlayHandler();
  }, []);

  return (
    <div className="board">
      {boardPieces.map((tile, index) => (
        <Tile
          key={index}
          color={colorPicker(tile)}
          type={tile[1]}
          symbol={tile[3]}
          onClick={() => onClickChooseHandler(tile)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardPieces: boardPieces(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlayHandler: () => dispatch(startGame()),
  onClickChooseHandler: (piece) => dispatch(choosePiece(piece)),
});

export { Board };
export default connect(mapStateToProps, mapDispatchToProps)(Board);
