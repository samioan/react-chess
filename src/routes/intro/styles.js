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
    fontSize: "2.125rem",
    fontWeight: 400,
    lineHeight: 1.235,
    letterSpacing: "0.00735em",
  },
  subtitle: {
    marginBottom: 16,
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
  },
  button: {
    marginTop: 16,
  },
}));

export { styles };
export default styles;
