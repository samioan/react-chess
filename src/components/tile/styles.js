import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  tile: {
    textAlign: "center",
    fontSize: 60,
    height: 80,
    width: 80,
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
}));

export { styles };
export default styles;
