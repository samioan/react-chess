import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  introContainer: {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    maxWidth: "50vw",
    minWidth: 248,
    margin: "8px auto",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(157, 172, 255, 0.5)",
  },
  title: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
  },
  buttonMiddle: {
    marginBottom: 8,
  },
}));

export { styles };
export default styles;
