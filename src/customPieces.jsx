const pieces = [
  "wP",
  "wN",
  "wB",
  "wR",
  "wQ",
  "wK",
  "bP",
  "bN",
  "bB",
  "bR",
  "bQ",
  "bK",
];

export const customPieces = () => {
  const returnPieces = {};
  pieces.map((p) => {
    returnPieces[p] = ({ squareWidth }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(./${p}.png)`,
          backgroundSize: "100%",
        }}
      />
    );
    return null;
  });
  return returnPieces;
};
