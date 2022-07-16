import { Navbar } from "./Navbar"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { AuthContext } from "../../context"
import { FIELD_WIDTH } from "../../game/GameDefaults"

const removeItem = jest.spyOn(Object.getPrototypeOf(localStorage), "removeItem")

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

  it("size", () => {
    render(
      <AuthContext.Provider
        value={{
          name: "test",
          saveName: () => {},
        }}
      >
        <Navbar />
      </AuthContext.Provider>
    )
    expect(screen.getByTestId("navbar").style.width).toMatch(
      new RegExp(`^${FIELD_WIDTH}?`)
    )
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
    expect(removeItem).toBeCalledWith("auth")
  })
})
