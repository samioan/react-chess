import ReplayIcon from "@material-ui/icons/Replay";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

const actionButtonsArray = (
  onClickPlay,
  onClickPreviousMove,
  movesLogIndex,
  onClickNextMove,
  movesLog
) => [
  {
    tooltipTitle: "New Game",
    onClick: onClickPlay,
    disabled: null,
    icon: <ReplayIcon />,
  },
  {
    tooltipTitle: "Previous Move",
    onClick: onClickPreviousMove,
    disabled: movesLogIndex === 0,
    icon: <SkipPreviousIcon />,
  },
  {
    tooltipTitle: "Next Move",
    onClick: onClickNextMove,
    disabled: movesLogIndex === movesLog.length - 1,
    icon: <SkipNextIcon />,
  },
];

export { actionButtonsArray };
export default actionButtonsArray;
