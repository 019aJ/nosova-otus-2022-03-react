import { Field } from "../field/Field"
import { PlayProp } from "../playprop/PlayProp"
import { FieldProp } from "../fieldprop/FieldProp"
import {
  FIELD_WIDTH
} from "../../game/GameDefaults"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FlowSliceState, init, nextState } from "../../redux/flowSlice"
import {
  startGame,
  stopGame,
  restartGame,
  gameSpeed,
  fieldWidth,
  fieldHeight,
  gameCellCount,
  fillPercentage,
  GameSliceState,
} from "../../redux/gameplaySlice"
import { AppStateType, flowState, gameplayState } from "../../redux/store"

export const GamePanel: React.FC = ({}) => {
  const dispatch = useDispatch()
  const gameState = useSelector<AppStateType, FlowSliceState>(flowState)

  const { running, restart, cellCount, percentage, speed, width, height } =
    useSelector<AppStateType, GameSliceState>(gameplayState)

  useEffect(() => {
    if (running && !gameState) {
      dispatch(init({ cellCount, percentage }))
    }
  }, [running, gameState])
  useEffect(() => {
    dispatch(init({ cellCount, percentage }))
  }, [restart, cellCount, percentage])

  useEffect(() => {
    if (running) {
      const timer = setTimeout(() => {
        const cellInRow = cellCount ? Math.ceil(Math.sqrt(cellCount)) : 0
        dispatch(nextState({ cellInRow }))
      }, 1000 / speed)
      return () => clearTimeout(timer)
    }
  })
  return (
    <div style={{ width: FIELD_WIDTH }}>
      <PlayProp
        onRestart={() => dispatch(restartGame())}
        onPlayChange={(val) => dispatch(val ? startGame() : stopGame())}
        onSpeedChange={(s) => dispatch(gameSpeed({ value: s }))}
      ></PlayProp>
      <FieldProp
        onCellCountChange={(c) => dispatch(gameCellCount({ value: c }))}
        onHeightChange={(h) => dispatch(fieldHeight({ value: h }))}
        onPercentageChange={(p) => dispatch(fillPercentage({ value: p }))}
        onWidthChange={(w) => dispatch(fieldWidth({ value: w }))}
      ></FieldProp>
      <Field width={width} height={height} cellCount={cellCount} />
    </div>
  )
}
