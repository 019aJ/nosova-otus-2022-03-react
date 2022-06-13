import { Field } from "../field/Field"
import { PlayProp } from "../playprop/PlayProp"
import { FieldProp } from "../fieldprop/FieldProp"
import {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_CELL_COUNT,
  FILL_PERCENTAGE,
  SPEED,
} from "../../game/GameDefaults"
import { useReducer, useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createInitAction,
  createNextStepAction,
} from "../../redux/actionCreator"
import {
  GameState,
  gameControlsReducer,
  createSpeedState,
  createHeightState,
  createWidthState,
  createRestartState,
  createCellCountState,
  createPercentageState,
  createStartState,
  createStopState,
} from "../../redux/gameControlsReducer"

const initialState: GameState = {
  running: true,
  restart: false,
  speed: SPEED,
  width: FIELD_WIDTH,
  height: FIELD_HEIGHT,
  cellCount: FIELD_CELL_COUNT,
  percentage: FILL_PERCENTAGE,
}

export const GamePanel: React.FC = ({}) => {
  const dispatch = useDispatch()
  const gameState = useSelector<boolean[], boolean[]>((state) => state)
  const [gameControlState, dispatchGameState] = useReducer(
    gameControlsReducer,
    initialState
  )
  const { running, restart, cellCount, percentage } = gameControlState

  useEffect(() => {
    if (running && !gameState) {
      dispatch(createInitAction(cellCount, percentage))
    }
  }, [running, gameState])
  useEffect(() => {
    dispatch(createInitAction(cellCount, percentage))
  }, [restart, cellCount, percentage])

  useEffect(() => {
    if (running) {
      const timer = setTimeout(() => {
        const cellInRow = cellCount ? Math.ceil(Math.sqrt(cellCount)) : 0
        dispatch(createNextStepAction(cellInRow))
      }, 1000 / gameControlState.speed)
      return () => clearTimeout(timer)
    }
  })
  return (
    <div style={{ width: FIELD_WIDTH }}>
      <PlayProp
        onRestart={() => dispatchGameState(createRestartState(!restart))}
        onPlayChange={(val) =>
          dispatchGameState(val ? createStartState() : createStopState())
        }
        onSpeedChange={(s) => dispatchGameState(createSpeedState(s))}
      ></PlayProp>
      <FieldProp
        onCellCountChange={(c) => dispatchGameState(createCellCountState(c))}
        onHeightChange={(h) => dispatchGameState(createHeightState(h))}
        onPercentageChange={(p) => dispatchGameState(createPercentageState(p))}
        onWidthChange={(w) => dispatchGameState(createWidthState(w))}
      ></FieldProp>
      <Field
        width={gameControlState.width}
        height={gameControlState.height}
        cellCount={cellCount}
      />
    </div>
  )
}
