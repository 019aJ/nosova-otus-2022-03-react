import flowSlice, { init, mutate, nextState, updateFinished } from "./flowSlice"
/**Описывается состояние поля игры*/
const setItem = jest.spyOn(Object.getPrototypeOf(localStorage), "setItem")

describe("flowSlice states tests", () => {
  it("initial state test", () => {
    expect(flowSlice(undefined, { type: "" })).toEqual({
      value: [],
    })
  })
  it("'init' state test", () => {
    expect(
      flowSlice(undefined, init({ cellCount: 1, percentage: 100 }))
    ).toEqual({
      value: [true],
    })
  })
  it("'mutate' state test", () => {
    expect(
      flowSlice({ value: [true, true, true, true] }, mutate({ cellIndex: 0 }))
    ).toEqual({
      value: [false, true, true, true],
    })
  })

  it("'nextState' state test", () => {
    expect(
      flowSlice(
        { value: [true, true, true, true, true, true, true, true, true] },
        nextState({ cellInRow: 3 })
      )
    ).toEqual({
      value: [true, false, true, false, false, false, true, false, true],
    })
  })

  it("initial state test", () => {
    expect(flowSlice(undefined, { type: "" })).toEqual({
      value: [],
    })
  })
})

describe("wrong input tests", () => {
  it("'mutate' state test", () => {
    expect(flowSlice({ value: [true, true, true, true] }, mutate({}))).toEqual({
      value: [true, true, true, true],
    })
    expect(
      flowSlice({ value: [true, true, true, true] }, mutate({ cellCount: -1 }))
    ).toEqual({
      value: [true, true, true, true],
    })
  })

  it("'nextState' state test", () => {
    expect(
      flowSlice({ value: [true, true, true, true] }, nextState({}))
    ).toEqual({
      value: [true, true, true, true],
    })
  })

  it("'onUpdateFinished' state test", () => {
    flowSlice({ value: [] }, updateFinished())
    expect(setItem).toBeCalledWith("flowState", '{"value":[]}')
  })

  it("no state test", () => {
    expect(flowSlice({ value: undefined }, mutate({ cellIndex: 1 }))).toEqual({
      value: undefined,
    })
  })

  it("'onInit' state test", () => {
    expect(flowSlice({ value: undefined }, init({}))).toEqual({
      value: undefined,
    })
    expect(flowSlice({ value: [true] }, init({}))).toEqual({
      value: [true],
    })
    expect(flowSlice({ value: [true] }, init({ cellCount: 1 }))).toEqual({
      value: [true],
    })
  })
})
