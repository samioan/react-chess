import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(({ breakpoints }) => ({
  gameContainer: {
    width: "40vh",
    height: "40vh",
    margin: "auto",
    padding: 8,
    [breakpoints.up("sm")]: {
      width: "70vh",
      height: "70vh",
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
  buttonContainer: {
    marginTop: 16,
    display: "flex",
    justifyContent: "center",
  },
}));

export { styles };
export default styles;
