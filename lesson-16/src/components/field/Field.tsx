import { Cell } from "../cell/Cell"
import styles from "./Field.module.css"
import {
  GAME_TITLE,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_CELL_COUNT,
} from "../../game/GameDefaults"
import { useDispatch, useSelector } from "react-redux"
import { FlowSliceState, mutate } from "../../redux/flowSlice"
import { AppStateType, flowState } from "../../redux/store"

interface FieldProps {
  title?: string
  width?: number
  height?: number
  cellCount?: number
}

export const Field: React.FC<FieldProps> = ({
  title,
  width,
  height,
  cellCount,
}) => {
  const renderChildren = (width: number, height: number, cellCount: number) => {
    const { value } = useSelector<AppStateType, FlowSliceState>(flowState)
    const dispatch = useDispatch()

    const cards = []
    for (let index = 0; value && index < cellCount; index++) {
      cards.push(
        <Cell
          key={index.toString()}
          id={index.toString()}
          alive={value[index]}
          width={width}
          height={height}
          onClick={() => {
            dispatch(mutate({ cellIndex: index }))
          }}
        ></Cell>
      )
    }
    return cards
  }

  const elemInRow = cellCount ? Math.ceil(Math.sqrt(cellCount)) : 0
  const elemWidth = cellCount && width ? width / elemInRow : 0
  const elemHeight = cellCount && height ? height / elemInRow : 0
  width = elemInRow > 0 ? elemInRow * elemWidth : width
  height =
    cellCount && elemInRow > 0
      ? Math.ceil(cellCount / elemInRow) * elemHeight
      : height
  return (
    <div key="fld2">
      <div className={styles.header}>{title}</div>
      <div
        key="fld"
        className={styles.field}
        style={{
          width,
          height,
        }}
      >
        {cellCount
          ? renderChildren(elemWidth - 2, elemHeight - 2, cellCount)
          : ""}
      </div>
    </div>
  )
}

Field.defaultProps = {
  title: GAME_TITLE,
  width: FIELD_WIDTH,
  height: FIELD_HEIGHT,
  cellCount: FIELD_CELL_COUNT,
}
