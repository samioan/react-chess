import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  boardPieces,
  playersTurn,
  movesLog,
  startGame,
  choosePiece,
  goToPreviousMove,
  goToNextMove,
  movesLogIndex,
} from "models/game";

import { Board, PlayerInfo, ActionButton } from "./components";
import actionButtonsArray from "./constants/actionButtonsArray";
import styles from "./styles";

const Game = ({
  onClickPlay,
  onClickChoosePiece,
  onClickPreviousMove,
  onClickNextMove,
  boardPieces,
  playersTurn,
  movesLog,
  movesLogIndex,
}) => {
  const classes = styles();

  useEffect(() => {
    onClickPlay();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.gameContainer}>
      <PlayerInfo playerName="Steve" playerAvatar="" />

      <div className={classes.boardContainer}>
        <Board
          onClickPlay={onClickPlay}
          onClickChoosePiece={onClickChoosePiece}
          onClickPreviousMove={onClickPreviousMove}
          onClickNextMove={onClickNextMove}
          boardPieces={boardPieces}
          playersTurn={playersTurn}
          movesLog={movesLog}
          movesLogIndex={movesLogIndex}
        />
      </div>

      <PlayerInfo playerName="Robert" playerAvatar="" />

      <div className={classes.buttonContainer}>
        {actionButtonsArray(
          onClickPlay,
          onClickPreviousMove,
          movesLogIndex,
          onClickNextMove,
          movesLog
        ).map((item) => (
          <ActionButton
            key={item.tooltipTitle}
            tooltipTitle={item.tooltipTitle}
            onClick={item.onClick}
            disabled={item.disabled}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardPieces: boardPieces(state),
  playersTurn: playersTurn(state),
  movesLog: movesLog(state),
  movesLogIndex: movesLogIndex(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlay: () => dispatch(startGame()),
  onClickChoosePiece: (piece) => dispatch(choosePiece(piece)),
  onClickPreviousMove: () => dispatch(goToPreviousMove()),
  onClickNextMove: () => dispatch(goToNextMove()),
});

export { Game };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
