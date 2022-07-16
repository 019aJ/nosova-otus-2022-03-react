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
import { calcFieldAndCellSize } from "../../utils/utils"

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

  const { fieldWidth, filedHeight, cellWidth, cellHeight } =
    // @ts-expect-error: cant be undefined - Default value
    calcFieldAndCellSize(cellCount, width, height)
  return (
    <div key="fld2">
      <div className={styles.header}>{title}</div>
      <div
        data-testid={"fld"}
        key="fld"
        className={styles.field}
        style={{
          width: fieldWidth,
          height: filedHeight,
        }}
      >
        {cellCount ? renderChildren(cellWidth, cellHeight, cellCount) : ""}
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
