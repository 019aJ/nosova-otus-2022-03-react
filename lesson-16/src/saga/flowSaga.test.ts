import flowSaga from "./flowSaga"
import { expectSaga } from "redux-saga-test-plan"
import * as flow from "../redux/flowSlice"

it("onInit->onUpdateFinished called", () => {
  return expectSaga(flowSaga)
    .put({
      type: flow.updateFinished.type,
    })
    .withReducer(flow.default)
    .dispatch({
      type: flow.init.type,
      payload: {},
    })
    .silentRun(50)
})

it("onMutate->onUpdateFinished called", () => {
  return expectSaga(flowSaga)
    .put({
      type: flow.updateFinished.type,
    })
    .withReducer(flow.default)
    .dispatch({
      type: flow.mutate.type,
      payload: {},
    })
    .silentRun(50)
})
it("onInit->onNextState called", () => {
  return expectSaga(flowSaga)
    .put({
      type: flow.updateFinished.type,
    })
    .withReducer(flow.default)
    .dispatch({
      type: flow.nextState.type,
      payload: {},
    })
    .silentRun(50)
})
