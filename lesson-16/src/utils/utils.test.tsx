import { calcFieldAndCellSize, generateRandom } from "./utils"

describe("input tests", () => {
  it("test no cell", () => {
    expect(calcFieldAndCellSize(0, 10, 10)).toStrictEqual({
      fieldWidth: 10,
      filedHeight: 10,
      cellWidth: -2,
      cellHeight: -2,
    })
    expect(calcFieldAndCellSize(undefined, 10, 10)).toStrictEqual({
      fieldWidth: 10,
      filedHeight: 10,
      cellWidth: -2,
      cellHeight: -2,
    })
    expect(calcFieldAndCellSize(-2, 10, 10)).toStrictEqual({
      fieldWidth: 10,
      filedHeight: 10,
      cellWidth: -2,
      cellHeight: -2,
    })
  })

  it("test size calc", () => {
    expect(calcFieldAndCellSize(4, 10, 10)).toStrictEqual({
      fieldWidth: 10,
      filedHeight: 10,
      cellWidth: 3,
      cellHeight: 3,
    })
  })

  it("test size calc", () => {
    expect(calcFieldAndCellSize(4, 9, 9)).toStrictEqual({
      fieldWidth: 8,
      filedHeight: 8,
      cellWidth: 2,
      cellHeight: 2,
    })
  })
})

describe("random tests", () => {
  it("generate", () => {
    const val1 = generateRandom(1000)
    const val2 = generateRandom(1000)
    const val3 = generateRandom(1000)

    expect(val1 !== val2 || val1 !== val3 || val2 !== val3).toBeTruthy()
    expect(val1 >= 0 && val1 <= 1000).toBeTruthy()
    expect(val2 >= 0 && val2 <= 1000).toBeTruthy()
    expect(val3 >= 0 && val3 <= 1000).toBeTruthy()
  })
})
