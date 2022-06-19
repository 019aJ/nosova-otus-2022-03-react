import { Navbar } from "./Navbar"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { AuthContext } from "../../context"
describe("render tests", () => {
  it("render username", () => {
    render(
      <AuthContext.Provider
        value={{
          name: "userName",
          saveName: () => {},
        }}
      >
        <Navbar />
      </AuthContext.Provider>
    )
    expect(screen.getByText("Выйти")).toBeInTheDocument()
  })
  it("render no username", () => {
    render(
      <AuthContext.Provider
        value={{
          name: null,
          saveName: () => {},
        }}
      >
        <Navbar />
      </AuthContext.Provider>
    )
    expect(screen.queryByText("Выйти")).toBeNull()
  })
})

describe("click tests", () => {
  it("exit called", () => {
    render(
      <AuthContext.Provider
        value={{
          name: "userName",
          saveName: (name) => {
            expect(name).toBeNull()
          },
        }}
      >
        <Navbar />
      </AuthContext.Provider>
    )

    const button = screen.getByText("Выйти")
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
  })
})
