import { all, fork } from "redux-saga/effects"
import flowSaga from "./flowSaga"
import gameplaySaga from "./gameplaySaga"
export default function* rootSaga() {
  yield all([fork(flowSaga), fork(gameplaySaga)])
}
