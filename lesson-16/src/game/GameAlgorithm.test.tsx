import { initialize, mutateCell, nextStepForCell } from "./GameAlgorithm"
describe("init tests", () => {
  test.each([
    { cellCount: 100, percentage: 100, expected: 100 },
    { cellCount: 100, percentage: 0, expected: 0 },
    { cellCount: 100, percentage: 30, expected: 30 },
    { cellCount: 0, percentage: 30, expected: 0 },
    { cellCount: 100, percentage: -2, expected: 0 },
    { cellCount: -2, percentage: 0, expected: 0 },
  ])("$percentage % filled ", ({ cellCount, percentage, expected }) => {
    const result = initialize(cellCount, percentage)
    expect(result.filter((x) => x).length).toBe(expected)
    expect(result.length).toBe(cellCount >= 0 ? cellCount : 0)
  })
})
describe("mutate tests", () => {
  test.each([
    { index: 0, array: [true, false], expected: [false, false] },
    { index: 1, array: [true, false], expected: [true, true] },
    { index: 2, array: [true, false], expected: [true, false] },
  ])("$index mutated ", ({ index, array, expected }) => {
    const result = mutateCell(index, array)
    expect(result).toEqual(expected)
  })
})

describe("nextStepForCell tests", () => {
  test.each([
    {
      states: [true],
      cellInRow: 1,
      cellIndex: 0,
      expected: true,
    },
    {
      states: [true, true, false, true, true, false, false, false, false],
      cellInRow: 3,
      cellIndex: 0,
      expected: true,
    },
    {
      states: [true, false, false, true, true, false, false, false, false],
      cellInRow: 3,
      cellIndex: 0,
      expected: true,
    },
    {
      states: [true, false, false, false, true, false, false, false, false],
      cellInRow: 3,
      cellIndex: 0,
      expected: false,
    },
    {
      states: [false, true, false, true, true, false, false, false, false],
      cellInRow: 3,
      cellIndex: 0,
      expected: true,
    },
    {
      states: [false, true, false, true, false, false, false, false, false],
      cellInRow: 3,
      cellIndex: 0,
      expected: false,
    },
    {
      states: [false, false, true, true, true, false],
      cellInRow: 2,
      cellIndex: 4,
      expected: true,
    },
    {
      states: [false, true, false, true, true, false, false, false, false],
      cellInRow: 3,
      cellIndex: 1,
      expected: true,
    },
    {
      states: [false, true, false, true, false, false, false, false, false],
      cellInRow: 3,
      cellIndex: 1,
      expected: false,
    },
    {
      states: [true, true, false, true, false, false],
      cellInRow: 3,
      cellIndex: 1,
      expected: true,
    },
    {
      states: [true, true, true, true, true, true, false, false, false],
      cellInRow: 3,
      cellIndex: 1,
      expected: false,
    },
    {
      states: [false, true, true, true, false, false, false, false, false],
      cellInRow: 3,
      cellIndex: 2,
      expected: false,
    },
    {
      states: [false, true, true, false, false, true, false, false, false],
      cellInRow: 3,
      cellIndex: 2,
      expected: true,
    },
    {
      states: [false, true, true, false, false, true, false, false, false],
      cellInRow: 3,
      cellIndex: 2,
      expected: true,
    },
    {
      states: [false, true, true, false, false, true, true, false, false],
      cellInRow: 3,
      cellIndex: 2,
      expected: true,
    },
    {
      states: [false, true, true, false, false, true, false, true],
      cellInRow: 3,
      cellIndex: 5,
      expected: true,
    },
    {
      states: [false, false, true, true, true, false, false, true, false, true],
      cellInRow: 2,
      cellIndex: 3,
      expected: true,
    },
    {
      states: [
        true,
        false,
        true,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
      ],
      cellInRow: 2,
      cellIndex: 5,
      expected: true,
    },
    {
      states: [false, true, false, false, true, true, false, false, false],
      cellInRow: 3,
      cellIndex: 4,
      expected: true,
    },
    {
      states: [false, true, false, false, true, false, false, false, true],
      cellInRow: 3,
      cellIndex: 4,
      expected: true,
    },
    {
      states: [false, false, true, false, true, false, false, false, true],
      cellInRow: 3,
      cellIndex: 4,
      expected: true,
    },
    {
      states: [false, false, true, false, true, false, false, true, false],
      cellInRow: 3,
      cellIndex: 4,
      expected: true,
    },
    {
      states: [false, true, true, false, true, false, false, true, false],
      cellInRow: 3,
      cellIndex: 4,
      expected: true,
    },
  ])("$index mutated ", ({ states, cellInRow, cellIndex, expected }) => {
    const result = nextStepForCell(states, cellInRow, cellIndex)
    expect(result).toEqual(expected)
  })
})

/*describe("nextStepForCell tests", () => {
   const result = nextStepForCell(
     [false, false, true, false, true, false, false, true, false],
     3,
     4
   )
   expect(result).toEqual(true)
})*/
