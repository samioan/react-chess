const piecesArranger = (pieces) => {
  const rearrangedTopPieces = [
    pieces[2],
    pieces[6],
    pieces[4],
    pieces[1],
    pieces[0],
    pieces[4],
    pieces[6],
    pieces[2],
    ...pieces.slice(8, pieces.length),
  ];

  const rearrangedBottomPieces = [
    ...pieces.slice(8, pieces.length),
    pieces[2],
    pieces[6],
    pieces[4],
    pieces[1],
    pieces[0],
    pieces[4],
    pieces[6],
    pieces[2],
  ];

  const rearrangedPieces = [rearrangedTopPieces, rearrangedBottomPieces];
  return rearrangedPieces;
};

export { piecesArranger };
export default piecesArranger;
