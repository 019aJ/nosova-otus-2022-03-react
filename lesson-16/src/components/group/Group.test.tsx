import { Group } from "./Group"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
describe("render tests", () => {
  it("render title", () => {
    render(<Group title="Test" />)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
  it("render title", () => {
    render(
      <Group title="Test">
        <button></button>
      </Group>
    )
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
