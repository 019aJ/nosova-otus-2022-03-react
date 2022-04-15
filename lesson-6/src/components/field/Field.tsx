import React, { Component } from "react"
import Cell from "../cell/Cell"
import { extractNum, extractUnits } from "../../utils/unitUtils"
import { generateId } from "../../utils/idGenerator"
interface FieldProps {
  title: string
  width: string
  height: string
  cellCount: number
}

interface FieldState {
  selectedCell?: string | null
  id: string
}

export default class Field extends Component<FieldProps, FieldState> {
  static defaultProps = {
    title: "Field",
    width: "500px",
    height: "500px",
    cellCount: 0,
  }
  constructor(props: FieldProps) {
    super(props)
    this.state = {
      selectedCell: null,
      id: generateId(),
    }
    this.renderChildren = this.renderChildren.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let clickedElement = e.target as HTMLElement
    while (!clickedElement.id && clickedElement.parentElement) {
      clickedElement = clickedElement.parentElement
    }
    this.setState({ selectedCell: clickedElement.id })
  }

  render() {
    const width = this.props.width
    const height = this.props.height
    const title = this.props.title
    const cellCount = this.props.cellCount
    if (!cellCount) {
      return (
        <div key={this.state.id} style={this.ownStyle(width, height)}>
          {title}
        </div>
      )
    }
    const elemInRow = Math.ceil(Math.sqrt(cellCount))
    const elemWidth = extractNum(width) / elemInRow
    const elemHeight = extractNum(height) / elemInRow
    const unit = extractUnits(width)
    return (
      <div
        key={this.state.id}
        style={this.ownStyle(width, height)}
        onClick={this.onClick}
      >
        {this.renderChildren(elemWidth, elemHeight, unit, elemInRow)}
      </div>
    )
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
    const length = this.props.cellCount
    for (let i = startIndex; i < startIndex + elemInRow && i < length; i++) {
      rows.push(
        <div
          key={"row" + (startIndex + i)}
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
