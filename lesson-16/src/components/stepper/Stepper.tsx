import { useEffect } from "react"
import { useState } from "react"
import { isDigit } from "../../utils/utils"
import styles from "./Stepper.module.css"

type StepperProps = {
  step: number
  startValue: number
  onValueChange: (val: number) => void
  id?: string
}

export const Stepper = ({
  step,
  startValue,
  onValueChange,
  id,
}: StepperProps) => {
  const [value, setValue] = useState(startValue)
  useEffect(() => {
    if (value) {
      onValueChange(value)
    }
  }, [value])
  return (
    <div className={styles.stepperContainer}>
      <div className={styles.stepperInput}>
        <input
          value={value}
          style={{ width: 30 }}
          onChange={(e) => {
            const val =
              e.target.value && isDigit(e.target.value)
                ? parseInt(e.target.value)
                : 0
            setValue(val)
          }}
          onKeyPress={(event) => {
            if (!isDigit(event.key)) {
              event.preventDefault()
            }
          }}
        ></input>
      </div>
      <div className={styles.stepper}>
        <div
          data-testid={`up-${id}`}
          className={styles.stepperUp}
          onClick={() => {
            setValue((prev) => {
              return prev ? prev + step : startValue
            })
          }}
        ></div>
        <div
          data-testid={`down-${id}`}
          className={styles.stepperDown}
          onClick={() => {
            /*Отрицательные числа не разрешаем*/
            setValue((prev) => {
              return prev ? (prev - step > 0 ? prev - step : prev) : startValue
            })
          }}
        ></div>
      </div>
    </div>
  )
}
