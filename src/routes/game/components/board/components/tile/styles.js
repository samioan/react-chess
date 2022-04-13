import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(({ breakpoints }) => ({
  colorContainer: {
    width: "12.5%",
    height: "100%",
  },
  tileContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  idle: {
    cursor: "pointer",
  },
  selected: {
    cursor: "pointer",
    backgroundColor: "rgb(111, 115, 210)",
  },
  move: {
    cursor: "pointer",
    backgroundColor: "rgb(157, 172, 255)",
  },
  light: {
    backgroundColor: "rgb(204, 183, 174)",
  },
  dark: {
    backgroundColor: "rgb(112, 102, 119)",
  },
  symbol: {
    fontSize: "1.5rem",
    [breakpoints.up("sm")]: {
      fontSize: "4rem",
    },
  },
}));

export { styles };
export default styles;
