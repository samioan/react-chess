import React from "react";
import Tile from "../tile";
import { connect } from "react-redux";

import "./board.css";

import { boardPieces } from "../../models/game/selectors";
import { startGame, choosePiece } from "../../models/game/actions";

const Board = ({ boardPieces, onClickPlayHandler, onClickChooseHandler }) => {
  return (
    <div>
      <button onClick={onClickPlayHandler}>Start Game</button>
      <div className="board">
        {boardPieces.map((tile, index) => (
          <Tile
            key={index}
            type={tile[1]}
            symbol={tile[3]}
            onClick={() => onClickChooseHandler(tile)}
          />
        ))}
      </div>
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
