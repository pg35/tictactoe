import React from "react";

import { getPlayerName } from "../utils/common";

const Score = (props) => (
  <div className="score-wrap">
    {props.score.map((n, i) => (
      <div className="score" key={i}>
        Player {getPlayerName(i)} Wins: {n}
      </div>
    ))}
  </div>
);

export default Score;
