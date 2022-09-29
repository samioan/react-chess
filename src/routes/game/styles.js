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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    gap: 16,
    borderRadius: 8,
    backgroundColor: "rgb(111, 115, 210)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  modalTitle: {
    marginBottom: 16,
    fontSize: "2.125rem",
    fontWeight: 400,
    lineHeight: 1.235,
    letterSpacing: "0.00735em",
  },
  modalSubtitle: {
    marginBottom: 16,
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
  },
  modalButton: {
    width: "100%",
  },
}));

export { styles };
export default styles;
