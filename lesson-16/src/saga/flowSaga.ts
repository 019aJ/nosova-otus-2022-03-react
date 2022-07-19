import { put, takeEvery, all, fork } from "redux-saga/effects"
import { init, mutate, nextState, updateFinished } from "../redux/flowSlice"
export function* saveFlowSaga() {
  yield put({ type: updateFinished.type })
}

function* watchOnFlow(type: string) {
  yield takeEvery(type, saveFlowSaga)
}

export default function* flowSaga() {
  yield all([
    fork(watchOnFlow, init.type),
    fork(watchOnFlow, mutate.type),
    fork(watchOnFlow, nextState.type),
  ])
}
