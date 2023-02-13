import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { customPieces } from "./customPieces";
import { Button, Input, notification } from "antd";
const primaryColor = "#348ceb";
const secondaryColor = "#f7f7f7";

const buttonStyle = {
  margin: "10px 10px 0px 5px",
};

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

const App = () => {
  const [status, setStatus] = useState("White's turn.");
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [PGN, setPGN] = useState(game.pgn());
  const [FEN, setFEN] = useState(game.fen());
  const [showFEN, setShowFEN] = useState(false);
  const [showPGN, setShowPGN] = useState(false);
  const onDrop = (sourceSquare, targetSquare) => {
    // check if the move is legal
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    // if the move is illegal, return the piece to the source square
    // in check
    if (move === null) {
      return "snapback";
    }
    updateStatus();
    setPGN(game.pgn());
    setFEN(game.fen());
  };
  const updateStatus = () => {
    let status = "";
    const turn = game.turn() === "w" ? "White" : "Black";

    if (game.isCheck()) {
      status = `${turn} is in check. ${turn}'s turn.`;
      if (game.isCheckmate()) {
        status = `${turn} is in checkmate.`;
      } else if (game.isStalemate()) {
        status = `Game is in stalemate.`;
      } else if (game.isInsufficientMaterial()) {
        status = `Game is in insufficient material.`;
      }
    } else {
      status = `${turn}'s turn.`;
    }

    setStatus(status);
  };

  const loadFEN = () => {
    const newFEN = document.getElementById("FEN").value;
    setGame(new Chess(newFEN));
    setFEN(newFEN);
    setPGN(game.pgn());
    updateStatus();
    setShowFEN(false);
    notification.open({
      message: "FEN Loaded",
      description: "The FEN has been loaded into the board.",
      duration: 2,
      placement: "bottomRight",
    });
  };

  const loadPGN = () => {
    const newPGN = document.getElementById("PGN").value;
    setGame(new Chess());
    game.loadPgn(newPGN);
    setPGN(newPGN);
    setFEN(game.fen());
    setGame(game);
    updateStatus();
    setShowPGN(false);
    notification.open({
      message: "PGN Loaded",
      description: "The PGN has been loaded into the board.",
      duration: 2,
      placement: "bottomRight",
    });
  };

  return (
    <div style={boardWrapper}>
      <h1
        style={{
          textAlign: "center",
          color: primaryColor,
          fontSize: "3rem",
          margin: "0px",
        }}
      >
        Chess!
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "1.5rem",
          padding: "0px 0px 20px 0px",
          margin: "0px",
        }}
      >
        {status}
      </p>
      <Chessboard
        id="Chessboard"
        boardOrientation={boardOrientation}
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        customDarkSquareStyle={{ backgroundColor: primaryColor }}
        customLightSquareStyle={{ backgroundColor: secondaryColor }}
        customPieces={customPieces()}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          style={buttonStyle}
          onClick={() => {
            setGame(new Chess());
            setPGN("");
            setFEN("");
            setStatus("White's turn.");
          }}
        >
          Reset
        </Button>
        <Button
          type="primary"
          style={buttonStyle}
          onClick={() => {
            setBoardOrientation(
              boardOrientation === "white" ? "black" : "white"
            );
          }}
        >
          Flip Board
        </Button>
        <Button
          style={buttonStyle}
          onClick={() => {
            setShowFEN(!showFEN);
          }}
        >
          Load FEN
        </Button>
        <Button
          style={buttonStyle}
          onClick={() => {
            setShowPGN(!showPGN);
          }}
        >
          Load PGN
        </Button>
        {showFEN && (
          <div>
            <Input
              id="FEN"
              style={{
                margin: "10px 10px 0px 5px",
                width: "200px",
              }}
              placeholder="Enter FEN:"
            ></Input>
            <Button onClick={loadFEN} style={buttonStyle}>
              Submit
            </Button>
          </div>
        )}
        {showPGN && (
          <div>
            <Input
              id="PGN"
              style={{
                margin: "10px 10px 0px 5px",
                width: "200px",
              }}
              placeholder="Enter PGN:"
            ></Input>
            <Button onClick={loadPGN} style={buttonStyle}>
              Submit
            </Button>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          style={buttonStyle}
          onClick={() => {
            navigator.clipboard.writeText(PGN);
            notification.open({
              message: "PGN Copied",
              description: "PGN has been copied to your clipboard.",
              placement: "bottomRight",
            });
          }}
        >
          Copy PGN
        </Button>
        <Button
          type="primary"
          style={buttonStyle}
          onClick={() => {
            navigator.clipboard.writeText(FEN);
            notification.open({
              message: "FEN Copied",
              description: "FEN has been copied to your clipboard.",
              placement: "bottomRight",
            });
          }}
        >
          Copy FEN
        </Button>
      </div>

      <p>
        <strong>PGN:</strong> {PGN}
      </p>
      <p>
        <strong>FEN:</strong> {FEN}
      </p>
    </div>
  );
};

export default App;
