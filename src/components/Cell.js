import React from "react";

const Cell = ({ r, c, symbol, onClick }) => (
  <button
    className="cell"
    onClick={() => onClick(r, c)}
    disabled={"" !== symbol}
  >
    {symbol}
  </button>
);

export default Cell;
