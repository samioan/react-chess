const cleanPiecesStatus = (pieces) =>
  pieces.forEach((row) =>
    row.forEach((item) => {
      if (item.status === "selected" || item.status === "move") {
        if (item.rank) {
          item.status = "idle";
        } else {
          item.status = null;
        }
      }
    })
  );
export { cleanPiecesStatus };
export default cleanPiecesStatus;
