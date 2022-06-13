export type GameState = {
  running: boolean
  restart: boolean
  speed: number
  width: number
  height: number
  cellCount: number
  percentage: number
}

type GameStateActionType =
  | "restart"
  | "start"
  | "stop"
  | "speed"
  | "width"
  | "height"
  | "cellCount"
  | "percentage"

export type GameStateAction = {
  type: GameStateActionType
  payload: {
    value: number
    switcherValue: boolean
  }
}
export const gameControlsReducer = (
  state: GameState,
  action: GameStateAction
) => {
  switch (action.type) {
    case "start":
      return { ...state, running: true }
    case "stop":
      return { ...state, running: false }
    case "restart":
      return { ...state, restart: !state.restart }
    case "speed":
      return { ...state, speed: action.payload.value }
    case "width":
      return { ...state, width: action.payload.value }
    case "height":
      return { ...state, height: action.payload.value }
    case "cellCount":
      return { ...state, cellCount: action.payload.value }
    case "percentage":
      return { ...state, percentage: action.payload.value }
    default:
      return state
  }
}
export const createStartState = () => createSwitcherState("start", true)
export const createStopState = () => createSwitcherState("stop", false)
export const createRestartState = (value: boolean) =>
  createSwitcherState("restart", value)

export const createSpeedState = (value: number) => createState("speed", value)
export const createWidthState = (value: number) => createState("width", value)
export const createHeightState = (value: number) => createState("height", value)
export const createCellCountState = (value: number) =>
  createState("cellCount", value)
export const createPercentageState = (value: number) =>
  createState("percentage", value)
const createState = (
  type: GameStateActionType,
  value: number
): GameStateAction => {
  return {
    type,
    payload: { value, switcherValue: false },
  }
}

const createSwitcherState = (
  type: GameStateActionType,
  switcherValue: boolean
): GameStateAction => {
  return {
    type,
    payload: { switcherValue, value: 0 },
  }
}
