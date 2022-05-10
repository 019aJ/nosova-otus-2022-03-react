import { Component } from "react"
import image from "../../arrowTiny.png"
import styles from "./SwitchButton.module.css"

interface SwitchButtonProps {
  onClick: () => void
  todoVisible: boolean
}

export default class SwitchButton extends Component<SwitchButtonProps> {
  render() {
    const styleName = this.props.todoVisible
      ? styles.detailButtonTodo
      : styles.detailButton
    return (
      <button className={styleName} onClick={this.props.onClick}>
        <img src={image} className={styles.detailImage} />
      </button>
    )
  }
}
