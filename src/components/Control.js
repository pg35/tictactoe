import React from "react";
import Dialog from "./Dialog";
import { GameStatus, getStatusLabel } from "../utils/common";

const Control = ({ status, onStatusChange }) => {
  const button = (
    <button className="game-control" onClick={onStatusChange}>
      {getStatusLabel(status)}
    </button>
  );
  return GameStatus.STARTED === status ? button : <Dialog>{button}</Dialog>;
};

export default Control;
