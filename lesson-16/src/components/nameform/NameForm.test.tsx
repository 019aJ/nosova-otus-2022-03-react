import { NameForm } from "./NameForm"
import { act, render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
describe("render tests", () => {
  it("render", () => {
    render(<NameForm onSubmit={() => {}} />)
    expect(screen.getByPlaceholderText("Введите имя")).toBeInTheDocument()
  })
})

describe("click tests", () => {
  it("submit called", () => {
    let x = false
    render(<NameForm onSubmit={() => (x = true)} />)

    const button = screen.getByRole("button")
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(x).toBe(true)
  })
})
