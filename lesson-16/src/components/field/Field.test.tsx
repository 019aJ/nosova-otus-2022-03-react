import { render, screen, act } from "@testing-library/react"
import { Field } from "./Field"
import {
  GAME_TITLE,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_CELL_COUNT,
} from "../../game/GameDefaults"
import { Provider } from "react-redux"
import { Store } from "redux"
import appStore from "../../redux/store"

import "@testing-library/jest-dom"
import { init } from "../../redux/flowSlice"

let store: Store

describe("render tests", () => {
  beforeEach(() => {
    store = appStore
    //configureStore({ reducer: GameStateReducer, preloadedState: [false] })
  })
  it("has title", () => {
    render(
      <Provider store={store}>
        <Field cellCount={1} />
      </Provider>
    )
    expect(screen.getByText(GAME_TITLE)).toBeInTheDocument()
  })
  it("has no cell", () => {
    render(
      <Provider store={store}>
        <Field cellCount={0} />
      </Provider>
    )
    expect(screen.queryByTestId("0")).toBeNull()
    expect(screen.getByTestId("fld").textContent).toBe("")
  })

  it("has no size", () => {
    render(
      <Provider store={store}>
        <Field cellCount={0} width={0} height={0} />
      </Provider>
    )
    expect(screen.getByTestId("fld").style.height).toMatch(new RegExp(`^0?`))
    expect(screen.getByTestId("fld").style.height).toMatch(new RegExp(`^0?`))
  })

  it("has no size but cell", () => {
    render(
      <Provider store={store}>
        <Field cellCount={10} width={0} height={0} />
      </Provider>
    )
    expect(screen.getByTestId("fld").style.height).toMatch(new RegExp(`^0?`))
    expect(screen.getByTestId("fld").style.height).toMatch(new RegExp(`^0?`))
    expect(screen.getByTestId("0").style.width).toMatch(new RegExp(`^0?`))
    expect(screen.getByTestId("0").style.height).toMatch(new RegExp(`^0?`))
  })
  it("has exactly one cell inside", () => {
    render(
      <Provider store={store}>
        <Field cellCount={1} />
      </Provider>
    )
    expect(screen.getByTestId("0")).toBeInTheDocument()
    expect(screen.queryByTestId("1")).toBeNull()
  })

  it("negative cell", () => {
    render(
      <Provider store={store}>
        <Field cellCount={-10} />
      </Provider>
    )
    expect(screen.queryByText("0")).toBeNull()
    expect(screen.getByTestId("fld").textContent).toBe("")

    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${FIELD_WIDTH}?`)
    )
    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${FIELD_HEIGHT}?`)
    )
  })

  it("simple size test", () => {
    render(
      <Provider store={store}>
        <Field cellCount={1} />
      </Provider>
    )
    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${FIELD_WIDTH}?`)
    )
    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${FIELD_HEIGHT}?`)
    )
    const width = FIELD_WIDTH - 2
    expect(screen.getByTestId("0").style.width).toMatch(
      new RegExp(`^${width}?`)
    )
    const height = FIELD_HEIGHT - 2
    expect(screen.getByTestId("0").style.height).toMatch(
      new RegExp(`^${height}?`)
    )
  })

  it("4cell size test", () => {
    const size = 100
    render(
      <Provider store={store}>
        <Field cellCount={4} height={size} width={size} />
      </Provider>
    )
    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${size}?`)
    )
    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${size}?`)
    )
    const width = size / 2 - 2
    expect(screen.getByTestId("0").style.width).toMatch(
      new RegExp(`^${width}?`)
    )
    const height = size / 2 - 2
    expect(screen.getByTestId("0").style.height).toMatch(
      new RegExp(`^${height}?`)
    )
  })

  it("not precise size test", () => {
    const size = 99
    render(
      <Provider store={store}>
        <Field cellCount={4} height={size} width={size} />
      </Provider>
    )
    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${size - 1}?`)
    )
    expect(screen.getByTestId("fld").style.height).toMatch(
      new RegExp(`^${size - 1}?`)
    )
    const width = size / 2 - 2
    expect(screen.getByTestId("0").style.width).toMatch(
      new RegExp(`^${width}?`)
    )
    const height = size / 2 - 2
    expect(screen.getByTestId("0").style.height).toMatch(
      new RegExp(`^${height}?`)
    )
  })
  it("click test", () => {
    render(
      <Provider store={store}>
        <Field cellCount={1} />
      </Provider>
    )
    const cell = screen.getByTestId("0")
    act(() => {
      store.dispatch(init({ cellCount: 1, percentage: 0 }))
    })
    expect(screen.getByTestId("0")).toHaveClass("cellDead")
    act(() => {
      cell.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(screen.getByTestId("0")).toHaveClass("cellAlive")
  })
})
