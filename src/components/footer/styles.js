import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  container: {
    backgroundColor: "rgb(157, 172, 255)",
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    padding: 4,
  },
  title: {
    marginLeft: 10,
  },
  linkContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
  },
}));

export { styles };
export default styles;
