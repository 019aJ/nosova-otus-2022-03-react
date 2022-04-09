import React, { Children, Component } from "react"

interface FieldProps {
  title?: string
  width?: string
  height?: string
  children?: React.ReactNode
}

interface FieldState {
  title?: string
  width?: string
  height?: string
  selectedCell?: string | null
}

export default class Field extends Component<FieldProps, FieldState> {
  constructor(props: FieldProps) {
    super(props)
    this.state = {
      title: props.title || "Field",
      width: props.width || "500px",
      height: props.height || "500px",
      selectedCell: null,
    }
    this.renderChildren = this.renderChildren.bind(this)
    this.getRow = this.getRow.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  getRow(
    startIndex: number,
    elemInRow: number,
    width: number,
    height: number,
    unit: string
  ) {
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        {React.Children.map(this.props.children, (child, i) => {
          if (i >= startIndex && i < startIndex + elemInRow) {
            const newTitle =
              this.state.selectedCell === child.key ? i + 1 + "" : "click me"
            return (
              <div
                style={{
                  display: "inline-block",
                }}
              >
                {React.cloneElement(child, {
                  title: newTitle,
                  width: width - 2 + unit,
                  height: height - 2 + unit,
                  id: i + 1,
                })}
              </div>
            )
          } else {
            return null
          }
        })}
      </div>
    )
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
      rows.push(this.getRow(currentRow, elemInRow, width, height, unit))
      currentRow += elemInRow
    }
    return rows
  }

  onClick = (e: any) => {
    this.setState({ selectedCell: e.target.id })
  }

  render() {
    const arrayChildren = Children.toArray(this.props.children)
    const width = this.state.width || "500px"
    const height = this.state.height || "500px"
    const title = this.state.title || "Field"
    if (!arrayChildren.length) {
      return <div style={ownStyle(width, height)}>{title}</div>
    } else {
      const elemInRow = Math.ceil(Math.sqrt(arrayChildren.length))
      const elemWidth = extractNum(width) / elemInRow
      const elemHeight = extractNum(height) / elemInRow
      const unit = extractUnits(width)
      return (
        <div style={ownStyle(width, height)} onClick={this.onClick}>
          {this.renderChildren(elemWidth, elemHeight, unit, elemInRow)}
        </div>
      )
    }
  }
}

const ownStyle = (width: string, height: string) => {
  return {
    backgroundColor: "yellow",
    width: width,
    height: height,
  }
}

const numberPattern = /\d+/g
const extractNum = (s: string): number => {
  const matches = s.match(numberPattern)
  return matches ? parseInt(matches[0]) : 500
}

const extractUnits = (s: string): string => {
  const matches = extractNum(s)
  return matches ? s.substring(matches.toString().length) : "px"
}
