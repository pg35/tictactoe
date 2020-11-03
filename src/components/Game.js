import React from "react";

import PlayerTurn from "./PlayerTurn";
import Score from "./Score";
import Board from "./Board";

import { getPlayerSymbol } from "../utils/common";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      moves: {},
      score: [0, 0]
    };
    this.handleCellClick = this.handleCellClick.bind(this);
  }
  componentDidMount() {}

  getNextTurn(turn) {
    return !turn;
  }
  handleCellClick(r, c) {
    const { size } = this.props;
    const { turn } = this.state;
    this.setState((state) => ({
      turn: this.getNextTurn(state.turn),
      moves: { ...state.moves, [r * size + c]: [turn, r, c] }
    }));
  }
  prepareCells(rows, cols, cells) {
    const arr = new Array(rows);
    for (let i = 0; i < rows; ++i) arr[i] = new Array(cols);
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        const k = i * rows + j;
        arr[i][j] = cells[k] ? getPlayerSymbol(cells[k][0]) : "";
      }
    }
    return arr;
  }
  render() {
    const { size } = this.props;
    const { turn, moves, score } = this.state;
    const [rows, cols] = [size, size];

    const cells = this.prepareCells(rows, cols, moves);
    return (
      <div className="game">
        <Score score={score} />
        <PlayerTurn turn={turn} />
        <Board
          rows={size}
          cols={size}
          cells={cells}
          onCellClick={this.handleCellClick}
        />
      </div>
    );
  }
}

export default Game;
