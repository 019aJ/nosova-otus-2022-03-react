import { useEffect } from "react"
import { useState } from "react"
import styles from "./Stepper.module.css"

type StepperProps = {
  step: number
  startValue?: number
  onValueChange: (val: number) => void
}

export const Stepper = ({ step, startValue, onValueChange }: StepperProps) => {
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
            const val = e.target.value ? parseInt(e.target.value) : 0
            setValue(val)
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
        ></input>
      </div>
      <div className={styles.stepper}>
        <div
          className={styles.stepperUp}
          onClick={() => {
            setValue((prev) => {
              return prev ? prev + step : startValue
            })
          }}
        ></div>
        <div
          className={styles.stepperDown}
          onClick={() => {
            /*Отрицательные числа не разрешаем*/
            setValue((prev) => {
              return prev ? (prev > step ? prev - step : prev) : startValue
            })
          }}
        ></div>
      </div>
    </div>
  )
}
Stepper.defaultProps = {
  startValue: 1,
}
