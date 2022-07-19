import { Group } from "../group/Group"
import { NumberTextBox } from "../input/NumberTextBox"
import styles from "./FieldProp.module.css"
import {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_CELL_COUNT,
  FILL_PERCENTAGE,
} from "../../game/GameDefaults"
type FieldPropProps = {
  onWidthChange: (width: number) => void
  onHeightChange: (height: number) => void
  onCellCountChange: (cellCount: number) => void
  onPercentageChange: (percentage: number) => void
}

export const FieldProp = ({
  onWidthChange,
  onHeightChange,
  onCellCountChange,
  onPercentageChange,
}: FieldPropProps) => {
  const numberTextBoxClasses = `${styles.fieldPropElement} ${styles.fieldPropTextbox}`

  return (
    <Group title="Поле">
      <div>
        <div className={styles.fieldPropElement}>Ширина:</div>
        <NumberTextBox
          className={numberTextBoxClasses}
          placeHolder="Ширина"
          defaultValue={FIELD_WIDTH}
          onValueChange={onWidthChange}
        ></NumberTextBox>
        <div className={styles.fieldPropElement}>Высота:</div>
        <NumberTextBox
          className={numberTextBoxClasses}
          placeHolder="Высота"
          defaultValue={FIELD_HEIGHT}
          onValueChange={onHeightChange}
        ></NumberTextBox>
        <div className={styles.fieldPropElement}>Число ячеек:</div>
        <NumberTextBox
          className={numberTextBoxClasses}
          placeHolder="Число ячеек"
          defaultValue={FIELD_CELL_COUNT}
          onValueChange={onCellCountChange}
        ></NumberTextBox>
        <div className={styles.fieldPropElement}>Заполненность:</div>
        <NumberTextBox
          className={numberTextBoxClasses}
          placeHolder="Заполненность"
          defaultValue={FILL_PERCENTAGE}
          onValueChange={onPercentageChange}
        ></NumberTextBox>
      </div>
    </Group>
  )
}
