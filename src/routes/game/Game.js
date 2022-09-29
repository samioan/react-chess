import React from "react";
import { connect } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

import {
  boardPieces,
  playersTurn,
  lastPlayer,
  isCheckSnackbarOpen,
  isCheckmateModalOpen,
  choosePiece,
  closeCheckSnackbar,
  restartGame,
} from "models/game";

import { Board, PlayerInfo } from "./components";

import styles from "./styles";

const Game = ({
  boardPieces,
  playersTurn,
  lastPlayer,
  isCheckSnackbarOpen,
  isCheckmateModalOpen,
  choosePiece,
  closeCheckSnackbar,
  restartGame,
}) => {
  const classes = styles();

  return (
    <div className={classes.gameContainer}>
      <PlayerInfo playerName="Black" />

      <div className={classes.boardContainer}>
        <Board
          choosePiece={choosePiece}
          boardPieces={boardPieces}
          playersTurn={playersTurn}
        />
      </div>

      <PlayerInfo playerName="White" />

      <Snackbar
        open={isCheckSnackbarOpen}
        onClose={closeCheckSnackbar}
        autoHideDuration={1500}
        message="King is in Check!"
      />

      <Modal open={isCheckmateModalOpen}>
        <div className={classes.modal}>
          <Typography className={classes.modalTitle}>Checkmate!</Typography>
          {lastPlayer && (
            <Typography className={classes.modalSubtitle}>
              {`${
                lastPlayer.charAt(0)?.toUpperCase() + lastPlayer.slice(1)
              } wins!`}
            </Typography>
          )}
          <Button
            variant="contained"
            className={classes.modalButton}
            onClick={restartGame}
          >
            Play Again
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardPieces: boardPieces(state),
  playersTurn: playersTurn(state),
  lastPlayer: lastPlayer(state),
  isCheckmateModalOpen: isCheckmateModalOpen(state),
  isCheckSnackbarOpen: isCheckSnackbarOpen(state),
});

const mapDispatchToProps = (dispatch) => ({
  choosePiece: (piece) => dispatch(choosePiece(piece)),
  closeCheckSnackbar: () => dispatch(closeCheckSnackbar()),
  restartGame: () => dispatch(restartGame()),
});

export { Game };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
