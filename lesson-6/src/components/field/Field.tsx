import React, { Component } from "react"
import Cell from "../cell/Cell"
import { extractNum, extractUnits } from "../../utils/unitUtils"
interface FieldProps {
  title?: string
  width?: string
  height?: string
  cellCount?: number
}

interface FieldState {
  title: string
  width: string
  height: string
  selectedCell?: string | null
  cellCount: number
}

export default class Field extends Component<FieldProps, FieldState> {
  constructor(props: FieldProps) {
    super(props)
    this.state = {
      title: props.title || "Field",
      width: props.width || "500px",
      height: props.height || "500px",
      selectedCell: null,
      cellCount: props.cellCount || 0,
    }
    this.renderChildren = this.renderChildren.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let clickedElement = e.target as HTMLElement
    while (!clickedElement.id && clickedElement.parentElement) {
      clickedElement = clickedElement.parentElement
    }
    this.setState({ selectedCell: clickedElement.id })
  }

  render() {
    const width = this.state.width
    const height = this.state.height
    const title = this.state.title
    const cellCount = this.state.cellCount
    if (!cellCount) {
      return <div style={this.ownStyle(width, height)}>{title}</div>
    } else {
      const elemInRow = Math.ceil(Math.sqrt(cellCount))
      const elemWidth = extractNum(width) / elemInRow
      const elemHeight = extractNum(height) / elemInRow
      const unit = extractUnits(width)
      return (
        <div style={this.ownStyle(width, height)} onClick={this.onClick}>
          {this.renderChildren(elemWidth, elemHeight, unit, elemInRow)}
        </div>
      )
    }
  }
  renderCell(id: string, width: number, height: number, unit: string) {
    return (
      <Cell
        key={id}
        title={this.state.selectedCell === id ? id : "click me"}
        width={width - 2 + unit}
        height={height - 2 + unit}
        id={id}
      ></Cell>
    )
  }

  renderRow(
    startIndex: number,
    elemInRow: number,
    width: number,
    height: number,
    unit: string
  ) {
    const rows = []
    const length = this.state.cellCount
    for (let i = startIndex; i < startIndex + elemInRow && i < length; i++) {
      rows.push(
        <div
          style={{
            display: "inline-block",
          }}
        >
          {this.renderCell((i + 1).toString(), width, height, unit)}
        </div>
      )
    }
    return <div style={{ whiteSpace: "nowrap" }}>{rows}</div>
  }

  renderChildren(
    width: number,
    height: number,
    unit: string,
    elemInRow: number
  ) {
    let currentRow = 0
    const rows = []
    for (let index = 0; index < elemInRow; index++) {
      rows.push(this.renderRow(currentRow, elemInRow, width, height, unit))
      currentRow += elemInRow
    }
    return rows
  }

  ownStyle = (width: string, height: string) => {
    return {
      backgroundColor: "yellow",
      width: width,
      height: height,
    }
  }
}


