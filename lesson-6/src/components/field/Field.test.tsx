import { render, screen, act } from "@testing-library/react"
import Field from "../field/Field"

describe("Field snapshot tests", () => {
  it("base snapshot", () => {
    const { container } = render(<Field />)
    expect(container).toMatchSnapshot()
  })

  it("with cells snapshot", () => {
    const { container } = render(<Field cellCount={12} />)
    expect(container).toMatchSnapshot()
  })

  it("some data with sizes snapshot", () => {
    const { container } = render(
      <Field cellCount={12} height="500px" width="300px" />
    )
    expect(container).toMatchSnapshot()
  })
})

describe("render tests", () => {
  it("has title", () => {
    render(<Field />)
    expect(screen.getByText("Field")).toBeInTheDocument()
  })
  it("has cell inside", () => {
    render(<Field cellCount={12} height="500px" width="300px" />)
    expect(screen.getAllByText(/click me/i).length).toEqual(12)
  })
  it("click test", () => {
    render(<Field cellCount={12} height="500px" width="300px" />)
    const cells = screen.getAllByText(/click me/i)
    act(() => {
      cells[0].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(screen.getAllByText("1").length).toEqual(1)
    act(() => {
      cells[1].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(screen.findByText("1")).toMatchObject({})
    expect(screen.getAllByText("2").length).toEqual(1)
  })
})
