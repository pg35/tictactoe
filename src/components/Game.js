import React from "react";

import PlayerTurn from "./PlayerTurn";
import Score from "./Score";
import Board from "./Board";
import Control from "./Control";
import { getPlayerSymbol, GameStatus } from "../utils/common";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      moves: {},
      score: [0, 0],
      status: GameStatus.READY
    };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  getNextTurn(turn) {
    return turn ? 0 : 1;
  }
  getNextStatus(status) {
    switch (status) {
      case GameStatus.READY:
        return GameStatus.STARTED;
      case GameStatus.STARTED:
        return GameStatus.PAUSED;
      case GameStatus.PAUSED:
        return GameStatus.STARTED;
      case GameStatus.FINISHED:
        return GameStatus.STARTED;
      default:
        throw new Error("Invalid status");
    }
  }
  handleStatusChange(status) {
    if (GameStatus.FINISHED === this.state.status) {
      this.setState({
        moves: {}
      });
    }
    this.setState((state) => ({
      status: this.getNextStatus(state.status)
    }));
  }
  isGameFinished(rows, cols, cells) {
    let i, j;
    for (i = 0; i < rows; ++i) {
      const v1 = cells[i][0];
      const v2 = cells[0][i];
      for (j = 1; j < cols && "" !== v1 && v1 === cells[i][j]; ++j);
      if (j === cols) return true;
      for (j = 1; j < rows && "" !== v2 && v2 === cells[j][i]; ++j);
      if (j === rows) return true;
    }
    const v1 = cells[0][0];
    for (i = 1; i < rows && "" !== v1 && v1 === cells[i][i]; ++i);
    if (i === rows) return true;
    const v2 = cells[0][cols - 1];
    for (
      i = 1, j = cols - 2;
      i < rows && "" !== v2 && v2 === cells[i][j];
      ++i, --j
    );
    if (i === rows) return true;
    return false;
  }
  handleCellClick(r, c) {
    const { size } = this.props;
    const { turn, moves, score, status } = this.state;
    if (GameStatus.STARTED !== status) return;

    const newMoves = { ...moves, [r * size + c]: [turn, r, c] };
    const cells = this.prepareCells(size, size, newMoves);
    const isDraw = size * size === Object.keys(newMoves).length;
    const isFinished = isDraw || this.isGameFinished(size, size, cells);

    const newState = {
      moves: newMoves,
      status: isFinished ? GameStatus.FINISHED : status
    };
    if (!isFinished) {
      newState.turn = this.getNextTurn(turn);
    } else if (!isDraw) {
      ++score[turn];
      newState.score = score;
    }
    this.setState(newState);
  }
  prepareCells(rows, cols, moves) {
    const arr = new Array(rows);
    for (let i = 0; i < rows; ++i) arr[i] = new Array(cols);
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        const k = i * rows + j;
        arr[i][j] = moves[k] ? moves[k][0] : "";
      }
    }
    return arr;
  }
  render() {
    const { size } = this.props;
    const { turn, moves, score, status } = this.state;
    const [rows, cols] = [size, size];

    const cells = this.prepareCells(rows, cols, moves).map((row, i) =>
      row.map((v, j) => {
        const k = i * rows + j;
        return moves[k] ? getPlayerSymbol(moves[k][0]) : v;
      })
    );

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
        <Control status={status} onStatusChange={this.handleStatusChange} />
      </div>
    );
  }
}

export default Game;
