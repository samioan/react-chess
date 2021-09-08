import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  board: {
    paddingTop: 20,
    justifyContent: "center",
    alignContent: "center",
    display: "grid",
    gridTemplateColumns: "80px 80px 80px 80px 80px 80px 80px 80px",
  },
}));

export { styles };
export default styles;
