import React from "react"
import styles from "./NameForm.module.css"

type NameFormProps = {
  onSubmit: () => void
}

export const NameForm: React.FC<NameFormProps> = ({ onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault()
    }}
  >
    <div className={styles.centerScreen}>
      <input type="text" placeholder="Введите имя" />
      <button
        type="submit"
        className={styles.submitButton}
        onClick={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        Start
      </button>
    </div>
  </form>
)
