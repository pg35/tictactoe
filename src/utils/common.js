export function getPlayerName(turn) {
  return turn ? "B" : "A";
}
export function getPlayerSymbol(turn) {
  return turn ? "\u2716" : "\u2714";
}
export function getStatusLabel(status) {
  switch (status) {
    case GameStatus.READY:
      return "Play";
    case GameStatus.STARTED:
      return "Pause";
    case GameStatus.PAUSED:
      return "Resume";
    case GameStatus.FINISHED:
      return "Replay";
    default:
      throw new Error("Invalid status");
  }
}
export const GameStatus = Object.freeze({
  READY: Symbol("READY"),
  STARTED: Symbol("STARTED"),
  PAUSED: Symbol("PAUSED"),
  FINISHED: Symbol("FINISHED")
});
