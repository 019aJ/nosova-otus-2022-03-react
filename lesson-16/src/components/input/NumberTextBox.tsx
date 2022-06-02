import { DetailedHTMLProps } from "react"
import { useState } from "react"
import { memo } from "react"
import { isDigit } from "../../utils/utils"

interface TextBoxProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  defaultValue: number
  placeHolder: string
  onValueChange: (val: number) => void
}

export const NumberTextBox = memo<TextBoxProps>(
  ({ defaultValue, placeHolder, onValueChange, className }) => {
    const [value, setValue] = useState(defaultValue)
    return (
      <input
        type="text"
        value={value}
        placeholder={placeHolder}
        className={className}
        onChange={(e) => {
          const val =
            e.target.value && isDigit(e.target.value)
              ? parseInt(e.target.value)
              : 0
          setValue(val)
          onValueChange(val)
        }}
        onKeyPress={(event) => {
          if (!isDigit(event.key)) {
            event.preventDefault()
          }
        }}
      ></input>
    )
  }
)
