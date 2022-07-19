import { act, fireEvent, render, screen } from "@testing-library/react"
import { App } from "./App"
import "@testing-library/jest-dom"
import { Store } from "redux"
import appStore from "../../redux/store"
import { Provider } from "react-redux"
let store: Store
const getItem = jest.spyOn(Object.getPrototypeOf(localStorage), "getItem")

describe("App render tests", () => {
  beforeEach(() => {
    store = appStore
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
    expect(getItem).toBeCalledWith("auth")
  })
})
