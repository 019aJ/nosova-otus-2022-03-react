import { act, fireEvent, render, screen } from "@testing-library/react"
import { App } from "./App"
import "@testing-library/jest-dom"
import { createStore, Store } from "redux"
import { GameStateReducer } from "../../redux/store"
import { Provider } from "react-redux"
let store: Store

describe("App render tests", () => {
  beforeEach(() => {
    store = createStore(GameStateReducer)
  })
  it("render APP test", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    const nameInput = screen.getByRole("textbox")
    act(() => {
      fireEvent.change(nameInput, { target: { value: "yourname" } })
    })
    const button = screen.getByTestId("nameButton")
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(screen.getByTestId("run")).toBeInTheDocument()
  })
})
