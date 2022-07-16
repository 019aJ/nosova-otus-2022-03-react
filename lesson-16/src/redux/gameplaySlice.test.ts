import gameplaySlice, {
  startGame,
  stopGame,
  restartGame,
  gameSpeed,
  fieldWidth,
  fieldHeight,
  gameCellCount,
  fillPercentage,
  updateFinished,
} from "./gameplaySlice"
import {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_CELL_COUNT,
  FILL_PERCENTAGE,
  SPEED,
} from "../game/GameDefaults"

const setItem = jest.spyOn(Object.getPrototypeOf(localStorage), "setItem")

/**Описывается состояние поля игры*/
describe("flowSlice states tests", () => {
  it("initial state test", () => {
    expect(gameplaySlice(undefined, { type: "" })).toEqual({
      running: true,
      restart: false,
      speed: SPEED,
      width: FIELD_WIDTH,
      height: FIELD_HEIGHT,
      cellCount: FIELD_CELL_COUNT,
      percentage: FILL_PERCENTAGE,
    })
  })
  it("'startGame' state test", () => {
    expect(gameplaySlice(undefined, startGame()).running).toBeTruthy()
  })
  it("'stopGame' state test", () => {
    expect(gameplaySlice(undefined, stopGame()).running).toBeFalsy()
  })

  it("'restartGame' state test", () => {
    expect(gameplaySlice(undefined, restartGame()).restart).toBeTruthy()
  })
  it("'gameSpeed' state test", () => {
    expect(gameplaySlice(undefined, gameSpeed({ value: 10 })).speed).toEqual(10)
  })
  it("'fieldWidth' state test", () => {
    expect(gameplaySlice(undefined, fieldWidth({ value: 10 })).width).toEqual(
      10
    )
  })
  it("'fieldHeight' state test", () => {
    expect(gameplaySlice(undefined, fieldHeight({ value: 10 })).height).toEqual(
      10
    )
  })
  it("'gameCellCount' state test", () => {
    expect(
      gameplaySlice(undefined, gameCellCount({ value: 10 })).cellCount
    ).toEqual(10)
  })
  it("'fillPercentage' state test", () => {
    expect(
      gameplaySlice(undefined, fillPercentage({ value: 10 })).percentage
    ).toEqual(10)
  })

  it("'updateFinished' state test", () => {
    gameplaySlice(undefined, updateFinished())
    expect(setItem).toBeCalledWith(
      "gameplayState",
      '{"running":true,"restart":false,"speed":1,"width":570,"height":570,"cellCount":1024,"percentage":50}'
    )
  })
})
