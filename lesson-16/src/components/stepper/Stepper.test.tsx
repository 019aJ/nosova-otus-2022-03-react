import { Stepper } from "./Stepper"
import { act, render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
describe("render tests Stepper", () => {
  it("render", () => {
    render(<Stepper startValue={1} onValueChange={() => {}} step={1} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()

    expect(screen.getByTestId("speed").style.width).toMatch("30")
  })
})

describe("change Stepper value tests", () => {
  it("enter number and char", () => {
    let x = 0
    render(
      <Stepper
        onValueChange={(value) => {
          x = value
        }}
        step={1}
        id="1"
        startValue={1}
      />
    )

    const input = screen.getByRole("textbox")

    act(() => {
      fireEvent.change(input, { target: { value: "a" } })
    })
    /*сброс на дефолтное*/
    expect(x).toBe(1)
    act(() => {
      fireEvent.change(input, { target: { value: "10" } })
    })
    expect(x).toBe(10)
    const btnUp = screen.getByTestId("up-1")
    const btnDown = screen.getByTestId("down-1")
    act(() => {
      btnUp.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(x).toBe(11)
    act(() => {
      btnDown.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(x).toBe(10)
  })
  it("test other step", () => {
    let x = 0
    render(
      <Stepper
        onValueChange={(value) => {
          x = value
        }}
        step={2}
        id="1"
        startValue={1}
      />
    )

    const btnUp = screen.getByTestId("up-1")
    act(() => {
      btnUp.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    /**дефолтное = 1 + step = 2 */
    expect(x).toBe(3)
  })

  it("test decrease to 0", () => {
    let x = 5
    render(
      <Stepper
        onValueChange={(value) => {
          x = value
        }}
        step={1}
        id="1"
        startValue={2}
      />
    )

    const btnDown = screen.getByTestId("down-1")
    act(() => {
      btnDown.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(() => {
      btnDown.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(x).toBe(1)
  })
})
