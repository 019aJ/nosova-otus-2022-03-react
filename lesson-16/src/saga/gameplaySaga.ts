import { put, takeEvery, all, fork } from "redux-saga/effects"
import {
  startGame,
  stopGame,
  restartGame,
  gameSpeed,
  fieldWidth,
  fieldHeight,
  gameCellCount,
  fillPercentage,
  updateFinished,
} from "../redux/gameplaySlice"

function* saveGamplaySaga() {
  yield put({ type: updateFinished.type })
}

function* watchOnGameplay(type: string) {
  yield takeEvery(type, saveGamplaySaga)
}

export default function* gameplaySaga() {
  yield all([
    fork(watchOnGameplay, startGame.type),
    fork(watchOnGameplay, stopGame.type),
    fork(watchOnGameplay, restartGame.type),
    fork(watchOnGameplay, gameSpeed.type),
    fork(watchOnGameplay, fieldWidth.type),
    fork(watchOnGameplay, fieldHeight.type),
    fork(watchOnGameplay, gameCellCount.type),
    fork(watchOnGameplay, fillPercentage.type),
  ])
}
