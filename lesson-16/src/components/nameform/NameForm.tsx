import React, { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react"
import styles from "./NameForm.module.css"

type NameFormProps = {
  onSubmit: (name: string) => void
}

export const NameForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const nameInput = useRef<HTMLInputElement>(null)

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        onSubmit(
          e.currentTarget.username
            ? e.currentTarget.username.value
            : nameInput?.current?.value
        )
        e.preventDefault()
      }}
    >
      <div className={styles.centerScreen}>
        <input
          ref={nameInput}
          name="username"
          type="text"
          placeholder="Введите имя"
        />
        <button
          type="submit"
          data-testid="nameButton"
          className={styles.submitButton}
        >
          Start
        </button>
      </div>
    </form>
  )
}
