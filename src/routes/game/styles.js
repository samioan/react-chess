import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(({ breakpoints }) => ({
  gameContainer: {
    width: "40vh",
    margin: "auto",
    padding: 8,
    [breakpoints.up("sm")]: {
      width: "70vh",
    },
  },
  boardContainer: {
    width: "40vh",
    height: "40vh",
    [breakpoints.up("sm")]: {
      width: "70vh",
      height: "70vh",
    },
    marginTop: 16,
    marginBottom: 16,
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    gap: 16,
    borderRadius: 8,
  },
}));

export { styles };
export default styles;
