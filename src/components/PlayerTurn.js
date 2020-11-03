import React from "react";

import { getPlayerName, getPlayerSymbol } from "../utils/common";

const PlayerTurn = (props) => (
  <div className="turn-wrap">
    Player Turn: {getPlayerName(props.turn)} ({getPlayerSymbol(props.turn)})
  </div>
);

export default PlayerTurn;
