import React from "react"
import styles from "./NameForm.module.css"

type NameFormProps = {
  onSubmit: () => void
}

export const NameForm: React.FC<NameFormProps> = ({ onSubmit }) => (
  <form >
    <div className={styles.centerScreen}>
      <input type="text" placeholder="Введите имя" />
      <input
        type="submit"
        value="Start"
        className={styles.submitButton}
        onClick={(e) => {
          onSubmit()
          e.preventDefault()
        }}
      />
    </div>
  </form>
)
