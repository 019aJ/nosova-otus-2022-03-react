import gameplaySaga from "./gameplaySaga"
import { expectSaga } from "redux-saga-test-plan"
import * as gameplay from "../redux/gameplaySlice"

describe("onXXX->onUpdateFinished called", () => {
  test.each([
    {
      type: gameplay.startGame.type,
      payload: {},
    },
    {
      type: gameplay.stopGame.type,
      payload: {},
    },
    {
      type: gameplay.gameSpeed.type,
      payload: {},
    },
    {
      type: gameplay.fieldWidth.type,
      payload: {},
    },
    {
      type: gameplay.fieldHeight.type,
      payload: {},
    },
    {
      type: gameplay.gameCellCount.type,
      payload: {},
    },
    {
      type: gameplay.fillPercentage.type,
      payload: {},
    },
  ])("$index mutated ", (event) => {
    return expectSaga(gameplaySaga)
      .put({
        type: gameplay.updateFinished.type,
      })
      .withReducer(gameplay.default)
      .dispatch(event)
      .silentRun(50)
  })
})
