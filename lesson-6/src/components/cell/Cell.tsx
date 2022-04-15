import { Component } from "react"
import { generateId } from "../../utils/idGenerator"
export interface CellProps {
  title: string
  width: string
  height: string
  id?: string
}
export default class Cell extends Component<CellProps> {
  static defaultProps = {
    title: "Click me",
    width: "50px",
    height: "50px",
    id: generateId(),
  }

  render() {
    return (
      <div
        id={this.props.id}
        style={{
          backgroundColor: "pink",
          width: this.props.width,
          height: this.props.height,
          border: "solid 1px black",
        }}
      >
        <div style={{ textAlign: "center", position: "relative", top: "30%" }}>
          {this.props.title}
        </div>
      </div>
    )
  }
}
