import { act, fireEvent, render, screen } from "@testing-library/react"
import { AppRouter } from "./AppRouter"
import "@testing-library/jest-dom"
import { Store } from "redux"
import appStore from "../../redux/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AuthContext } from "../../context"
let store: Store

describe("AppRoutes render tests", () => {
  it("render", () => {
    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText("Введите имя")).toBeInTheDocument()
  })
})
const setItem = jest.spyOn(Object.getPrototypeOf(localStorage), "setItem")

describe("local storage tests", () => {
  beforeEach(() => {
    store = appStore
  })
  it("submit called", () => {
    render(
      <Provider store={store}>
        <AuthContext.Provider
          value={{
            name: null,
            saveName: () => {},
          }}
        >
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthContext.Provider>
      </Provider>
    )
    const nameInput = screen.getByRole("textbox")
    act(() => {
      fireEvent.change(nameInput, { target: { value: "yourname" } })
    })

    const button = screen.getByTestId("nameButton")
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(setItem).toBeCalledWith("auth", "yourname")
  })
})
