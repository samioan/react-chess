import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  playerContainer: {
    padding: 8,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgb(111, 115, 210)",
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  default: {
    width: 40,
    height: 40,
    marginRight: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "rgb(157, 172, 255)",
  },
}));

export { styles };
export default styles;
