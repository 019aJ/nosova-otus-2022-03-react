import React, { useEffect } from "react"
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

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = isDigit(e.target.value) ? parseInt(e.target.value) : 0
    setValue(val)
  }
  return (
    <div className={styles.stepperContainer}>
      <div className={styles.stepperInput}>
        <input
          value={value}
          style={{ width: 30 }}
          onChange={updateValue}
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
            setValue((prev) => (prev ? prev + step : startValue))
          }}
        ></div>
        <div
          data-testid={`down-${id}`}
          className={styles.stepperDown}
          onClick={() => {
            /*Отрицательные числа не разрешаем*/
            setValue((prev) =>
              prev ? (prev - step > 0 ? prev - step : prev) : startValue
            )
          }}
        ></div>
      </div>
    </div>
  )
}
