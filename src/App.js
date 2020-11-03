import React from "react";
import "./styles.css";
import Game from "./components/Game";

export default function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Game size={3} />
    </div>
  );
}
