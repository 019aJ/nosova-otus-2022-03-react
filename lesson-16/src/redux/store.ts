import { configureStore } from "@reduxjs/toolkit"
import FlowSliceReducer, { FlowSliceState } from "./flowSlice"
import GameplaySliceReducer, { GameSliceState } from "./gameplaySlice"
import rootSaga from "../saga/rootSaga"
import createSagaMiddleware from "redux-saga"
export type AppStateType = {
  gameplay: GameSliceState
  flow: FlowSliceState
}

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    flow: FlowSliceReducer,
    gameplay: GameplaySliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
export const gameplayState = (state: AppStateType) => state.gameplay

export const flowState = (state: AppStateType) => state.flow
