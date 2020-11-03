import React from "react";
import Cell from "./Cell";

const Board = ({ cells, rows, cols, onCellClick }) => {
  let items = [];
  for (let i = 0; i < rows; ++i) {
    let arr = [];
    for (let j = 0; j < cols; ++j) {
      arr.push(
        <Cell
          r={i}
          c={j}
          symbol={cells[i][j]}
          key={i * rows + j}
          onClick={onCellClick}
        />
      );
    }
    items.push(
      <div key={i} className="cell-row">
        {arr}
      </div>
    );
  }
  return (
    <div className="board" style={{ borderCollapse: "collapsed" }}>
      {items}
    </div>
  );
};

export default Board;
