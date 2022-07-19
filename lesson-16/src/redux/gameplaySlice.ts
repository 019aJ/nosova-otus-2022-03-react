import { createSlice, PayloadAction } from "@reduxjs/toolkit"
/**Описывается влияние контролов на игровое поле*/
import {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_CELL_COUNT,
  FILL_PERCENTAGE,
  SPEED,
} from "../game/GameDefaults"
export type GameSliceState = {
  running: boolean
  restart: boolean
  speed: number
  width: number
  height: number
  cellCount: number
  percentage: number
}

export type GameStateAction = PayloadAction<{
  value: number
}>

const initialState = {
  running: true,
  restart: false,
  speed: SPEED,
  width: FIELD_WIDTH,
  height: FIELD_HEIGHT,
  cellCount: FIELD_CELL_COUNT,
  percentage: FILL_PERCENTAGE,
} as GameSliceState

const stateToString = (state: GameSliceState) => {
  return JSON.stringify(state)
}

/**Описывается состояние поля игры*/
export const gameplaySlice = createSlice({
  name: "gameplay",
  initialState: initialState,
  reducers: {
    startGame: (state) => {
      state.running = true
    },
    stopGame: (state) => {
      state.running = false
    },
    restartGame: (state) => {
      state.restart = !state.restart
    },
    gameSpeed: (state, action: GameStateAction) => {
      state.speed = action.payload.value
    },
    fieldWidth: (state, action: GameStateAction) => {
      state.width = action.payload.value
    },
    fieldHeight: (state, action: GameStateAction) => {
      state.height = action.payload.value
    },
    gameCellCount: (state, action: GameStateAction) => {
      state.cellCount = action.payload.value
    },
    fillPercentage: (state, action: GameStateAction) => {
      state.percentage = action.payload.value
    },
    updateFinished: (state) => {
      localStorage.setItem("gameplayState", stateToString(state))
    },
  },
})
export const {
  startGame,
  stopGame,
  restartGame,
  gameSpeed,
  fieldWidth,
  fieldHeight,
  gameCellCount,
  fillPercentage,
  updateFinished,
} = gameplaySlice.actions

export default gameplaySlice.reducer
