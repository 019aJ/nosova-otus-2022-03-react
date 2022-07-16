import { useEffect } from "react"
import { useState } from "react"
import { Group } from "../group/Group"
import { Stepper } from "../stepper/Stepper"
import styles from "./PlayProp.module.css"
import { SPEED } from "../../game/GameDefaults"
type PlayPropProps = {
  onPlayChange: (val: boolean) => void
  onRestart: () => void
  onSpeedChange: (speed: number) => void
}

export const PlayProp = ({
  onPlayChange,
  onRestart,
  onSpeedChange,
}: PlayPropProps) => {
  const [isRunnung, setIsRunnung] = useState(true)
  const onClickRunButton = () => {
    setIsRunnung((prev) => !prev)
  }
  const onClickRestartButton = () => {
    onRestart()
    setIsRunnung(true)
  }
  useEffect(() => {
    onPlayChange(isRunnung)
  }, [isRunnung])
  const btnStyle = `${styles.playProp} ${styles.playPropButton}`
  return (
    <Group title="Управление">
      <div className={styles.playPropContainer}>
        <div
          data-testid="speedtitle"
          className={`${styles.playProp} ${styles.playPropLabel}`}
        >
          Скорость:
        </div>
        <div
          data-testid="speeddiv"
          className={`${styles.playProp} ${styles.speedStepper}`}
        >
          <Stepper
            step={1}
            startValue={SPEED}
            onValueChange={onSpeedChange}
          ></Stepper>
        </div>
        <div
          data-testid="run"
          className={
            isRunnung
              ? `${btnStyle} ${styles.play}`
              : `${btnStyle} ${styles.stop}`
          }
          onClick={onClickRunButton}
        ></div>
        <div
          data-testid="restart"
          className={`${btnStyle} ${styles.reload}`}
          onClick={onClickRestartButton}
        ></div>
      </div>
    </Group>
  )
}
