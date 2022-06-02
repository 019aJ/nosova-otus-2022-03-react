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
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
interface GamePanelProps {}

export const GamePanel: React.FC<GamePanelProps> = ({}) => {
  const dispatch = useDispatch()
  const gameState = useSelector<boolean[], boolean[]>((state) => state)

  const [running, setRunning] = useState(true)
  const [restart, setRestart] = useState(false)
  const [speed, setSpeed] = useState(SPEED)

  const [width, setWidth] = useState(FIELD_WIDTH)
  const [height, setHeight] = useState(FIELD_HEIGHT)
  const [cellCount, setCellCount] = useState(FIELD_CELL_COUNT)
  const [percentage, setPercentage] = useState(FILL_PERCENTAGE)
  useEffect(() => {
    if (running && !gameState) {
      dispatch({ type: "INIT", payload: { cellCount, percentage } })
    }
  }, [running, gameState])
  useEffect(() => {
    dispatch({ type: "INIT", payload: { cellCount, percentage } })
  }, [restart, cellCount, percentage])
  useEffect(() => {
    if (running) {
      const timer = setTimeout(() => {
        const cellInRow = cellCount ? Math.ceil(Math.sqrt(cellCount)) : 0
        dispatch({ type: "NEXT_STEP", payload: { cellInRow } })
      }, 1000 / speed)
      return () => clearTimeout(timer)
    }
  })
  return (
    <div style={{ width: FIELD_WIDTH }}>
      <PlayProp
        onRestart={() => {
          setRestart((prev) => !prev)
        }}
        onPlayChange={setRunning}
        onSpeedChange={setSpeed}
      ></PlayProp>
      <FieldProp
        onCellCountChange={setCellCount}
        onHeightChange={setHeight}
        onPercentageChange={setPercentage}
        onWidthChange={setWidth}
      ></FieldProp>
      <Field width={width} height={height} cellCount={cellCount} />
    </div>
  )
}
