import { render, screen, act } from "@testing-library/react"
import { Field } from "./Field"
import {
  GAME_TITLE,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_CELL_COUNT,
} from "../../game/GameDefaults"
import { Provider } from "react-redux"
import { createStore, Store } from "redux"
import { GameStateReducer } from "../../redux/store"
import "@testing-library/jest-dom"
import { configureStore } from "@reduxjs/toolkit"

let store: Store

describe("render tests", () => {
  beforeEach(() => {
    store = createStore(GameStateReducer)
    configureStore({ reducer: GameStateReducer, preloadedState: [false] })
  })
  it("has title", () => {
    render(
      <Provider store={store}>
        <Field cellCount={1} />
      </Provider>
    )
    expect(screen.getByText(GAME_TITLE)).toBeInTheDocument()
  })
  it("has cell inside", () => {
    render(
      <Provider store={store}>
        <Field cellCount={1} />
      </Provider>
    )
    expect(screen.getByTestId("0")).toBeInTheDocument()
  })
  it("click test", () => {
    render(
      <Provider store={store}>
        <Field cellCount={1} />
      </Provider>
    )
    const cell = screen.getByTestId("0")
    act(() => {
      cell.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(screen.getByTestId("0")).toHaveClass("cellDead")
  })
})
