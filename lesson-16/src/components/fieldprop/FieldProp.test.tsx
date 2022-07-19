import { render, screen, act, fireEvent } from "@testing-library/react"
import { FieldProp } from "./FieldProp"

import "@testing-library/jest-dom"

describe("render tests", () => {
  it("render", () => {
    render(
      <FieldProp
        onCellCountChange={() => {}}
        onHeightChange={() => {}}
        onPercentageChange={() => {}}
        onWidthChange={() => {}}
      />
    )
    expect(screen.getByPlaceholderText("Ширина")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Высота")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Число ячеек")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Заполненность")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ширина").className).toMatch(
      "fieldPropElement fieldPropTextbox"
    )
  })
  it("input", () => {
    let x = 0
    render(
      <FieldProp
        onCellCountChange={() => {
          x = 1
        }}
        onHeightChange={() => {
          x = 2
        }}
        onPercentageChange={() => {
          x = 3
        }}
        onWidthChange={() => {
          x = 4
        }}
      />
    )
    const cellCount = screen.getByPlaceholderText("Число ячеек")
    act(() => {
      fireEvent.change(cellCount, { target: { value: "10" } })
    })
    expect(x).toBe(1)
    const height = screen.getByPlaceholderText("Высота")
    act(() => {
      fireEvent.change(height, { target: { value: "10" } })
    })
    expect(x).toBe(2)
    const percentage = screen.getByPlaceholderText("Заполненность")
    act(() => {
      fireEvent.change(percentage, { target: { value: "10" } })
    })
    expect(x).toBe(3)
    const width = screen.getByPlaceholderText("Ширина")
    act(() => {
      fireEvent.change(width, { target: { value: "10" } })
    })
    expect(x).toBe(4)
  })
})
