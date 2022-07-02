import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialize, mutateCell, nextStep } from "../game/GameAlgorithm"
export type FlowSliceState = { value: boolean[] | undefined }
export type ActionType = PayloadAction<{
  cellCount?: number
  percentage?: number
  cellIndex?: number
  cellInRow?: number
}>

const stateToString = (state: FlowSliceState) => {
  return JSON.stringify(state)
}
export const onInit = (state: FlowSliceState, action: ActionType) => {
  state.value =
    action.payload.cellCount &&
    (action.payload.percentage || action.payload.percentage === 0)
      ? initialize(action.payload.cellCount, action.payload.percentage)
      : state.value
}
export const onMutate = (state: FlowSliceState, action: ActionType) => {
  state.value =
    state.value && (action.payload.cellIndex || action.payload.cellIndex === 0)
      ? mutateCell(action.payload.cellIndex, state.value)
      : state.value
}
export const onNextState = (state: FlowSliceState, action: ActionType) => {
  state.value =
    state.value && action.payload.cellInRow
      ? nextStep(state.value, action.payload.cellInRow)
      : state.value
}

export const onUpdateFinished = (state: FlowSliceState) => {
  localStorage.setItem("flowState", stateToString(state))
}
/**Описывается состояние поля игры*/
export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    value: [],
  } as FlowSliceState,
  reducers: {
    init: onInit,
    mutate: onMutate,
    nextState: onNextState,
    updateFinished: onUpdateFinished,
  },
})

export const { init, mutate, nextState, updateFinished } = flowSlice.actions

export default flowSlice.reducer
