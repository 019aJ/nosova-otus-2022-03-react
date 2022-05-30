import { render, screen } from "@testing-library/react"
import { App } from "./App"
import "@testing-library/jest-dom"
import { Store } from "redux"

describe("App snapshot tests", () => {
  it("has title", () => {
    render(<App />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})
