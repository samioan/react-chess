import React from "react";
import Tile from "../tile";
import { connect } from "react-redux";

import "./board.css";

import {
  boardPieces,
  reservePieces,
  playerPieces,
  aiPieces,
} from "../../models/game/selectors";
import { startGame } from "../../models/game/actions";

const Board = ({
  boardPieces,
  reservePieces,
  playerPieces,
  aiPieces,
  startGame,
  onClickPlayHandler,
}) => {
  return (
    <>
      <button onClick={onClickPlayHandler}>Start Game</button>
      <div className="board">
        {boardPieces.map((pieceSymbol) => (
          <Tile
            type={Object.keys(pieceSymbol).toString().split(",")[0]}
            pieceChar={Object.keys(pieceSymbol).toString().split(",")[1]}
            symbol={Object.values(pieceSymbol)}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  boardPieces: boardPieces(state),
  reservePieces: reservePieces(state),
  playerPieces: playerPieces(state),
  aiPieces: aiPieces(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlayHandler: () => dispatch(startGame()),
});

export { Board };
export default connect(mapStateToProps, mapDispatchToProps)(Board);
