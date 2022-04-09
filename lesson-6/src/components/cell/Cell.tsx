import { Component } from "react"

interface CellProps {
  title?: string
  width?: string
  height?: string
  id?: string
}

interface CellState {
  title?: string
  width?: string
  height?: string
  id: string
}
export default class Cell extends Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props)
    this.state = {
      title: props.title || "0",
      width: props.width || "50px",
      height: props.height || "50px",
      id: props.id || Math.floor(Math.random() * 1000).toString(),
    }
  }
  render() {
    return (
      <div
        id={this.state.id}
        style={{
          backgroundColor: "pink",
          width: this.state.width,
          height: this.state.height,
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
