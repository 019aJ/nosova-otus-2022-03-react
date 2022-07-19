import { render, screen, act, fireEvent } from "@testing-library/react"
import { GamePanel } from "./GamePanel"

import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { Store } from "redux"
import appStore from "../../redux/store"
import { FIELD_WIDTH } from "../../game/GameDefaults"

let store: Store
describe("render tests", () => {
  beforeEach(() => {
    store = appStore
  })
  it("render", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    expect(screen.getByText("Скорость:")).toBeInTheDocument()
    expect(screen.getByTestId("speed")).toBeInTheDocument()
    expect(screen.getByTestId("run")).toBeInTheDocument()
    expect(screen.getByTestId("restart")).toBeInTheDocument()
  })

  it("size test", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    expect(screen.getByTestId("gamePanel").style.width).toMatch(
      new RegExp(`^${FIELD_WIDTH}?`)
    )
  })
})

describe("condition after actions tests", () => {
  it("state test cells count", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const cellCount = screen.getByPlaceholderText("Число ячеек")
    act(() => {
      fireEvent.change(cellCount, { target: { value: "5" } })
    })
    const values = store.getState().flow.value
    expect(values.length).toBe(5)
  })
  it("state test percentage", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const percentage = screen.getByPlaceholderText("Заполненность")
    const startButton = screen.getByTestId("run")

    act(() => {
      fireEvent.change(percentage, { target: { value: "100" } })
      startButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    let values: boolean[] = store.getState().flow.value
    expect(values.reduce((x, y) => x && y)).toBe(true)

    act(() => {
      fireEvent.change(percentage, { target: { value: "0" } })
      startButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    values = store.getState().flow.value
    expect(values.reduce((x, y) => x || y)).toBeFalsy()
  })
})

describe("gameplay state tests", () => {
  beforeEach(() => {
    store = appStore
  })

  it("change FieldProp", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const height = screen.getByPlaceholderText("Высота")
    act(() => {
      fireEvent.change(height, { target: { value: "10" } })
    })
    const width = screen.getByPlaceholderText("Ширина")
    act(() => {
      fireEvent.change(width, { target: { value: "10" } })
    })
    const percentage = screen.getByPlaceholderText("Заполненность")
    act(() => {
      fireEvent.change(percentage, { target: { value: "10" } })
    })
    const cellCount = screen.getByPlaceholderText("Число ячеек")
    act(() => {
      fireEvent.change(cellCount, { target: { value: "10" } })
    })
    expect(store.getState().gameplay.width).toBe(10)
    expect(store.getState().gameplay.height).toBe(10)
    expect(store.getState().gameplay.percentage).toBe(10)
    expect(store.getState().gameplay.cellCount).toBe(10)
  })

  it("change PlayProp", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const speed = screen.getByTestId("speed")
    act(() => {
      fireEvent.change(speed, { target: { value: 2 } })
    })
    const restart = screen.getByTestId("restart")
    const oldRestartVal = store.getState().gameplay.restart
    act(() => {
      restart.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(store.getState().gameplay.speed).toBe(2)
    expect(store.getState().gameplay.restart).toBe(!oldRestartVal)
    expect(store.getState().gameplay.running).toBeTruthy()
  })
})

describe("game run tests", () => {
  beforeEach(() => {
    store = appStore
  })
  it("after stop state the same", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const runButton = screen.getByTestId("run")
    act(() => {
      runButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(store.getState().gameplay.running).toBe(false)
  })

  it("life starts on load", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    expect(store.getState().gameplay.running).toBe(true)
  })

  it("after restart state changed", () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const restartButton = screen.getByTestId("restart")
    const values: boolean[] = store.getState().flow.value
    const restartState: boolean = store.getState().gameplay.restart
    store.subscribe(() => {
      const restartState2: boolean = store.getState().gameplay.restart
      if (restartState2 === restartState) {
        const values2: boolean[] = store.getState().flow.value
        expect(
          values2.filter((x, index) => x !== values[index]).length
        ).toBeGreaterThan(0)
      }
    })
    act(() => {
      restartButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
  })

  it("next stage called after n seconds", async () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const speed = screen.getByTestId("speed")

    act(() => {
      fireEvent.change(speed, { target: { value: 10 } })
    })
    const values: boolean[] = store.getState().flow.value
    await new Promise((r) => setTimeout(r, 200))
    const newValues: boolean[] = store.getState().flow.value
    expect(
      newValues.filter((x, index) => x !== values[index]).length
    ).toBeGreaterThan(0)
  })
  it("next stage not called if game was stoped", async () => {
    render(
      <Provider store={store}>
        <GamePanel />
      </Provider>
    )
    const speed = screen.getByTestId("speed")
    act(() => {
      fireEvent.change(speed, { target: { value: 10 } })
    })
    const runButton = screen.getByTestId("run")
    act(() => {
      runButton.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    const values: boolean[] = store.getState().flow.value
    await new Promise((r) => setTimeout(r, 200))
    const newValues: boolean[] = store.getState().flow.value
    expect(newValues.filter((x, index) => x !== values[index]).length).toBe(0)
  })
})
