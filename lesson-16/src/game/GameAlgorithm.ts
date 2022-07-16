import { generateRandom } from "../utils/utils"

export const initialize = (
  cellCount: number,
  percentage: number
): boolean[] => {
  if (!cellCount || cellCount < 0) {
    return []
  }

  let liveAmount = (cellCount * percentage) / 100
  const states: boolean[] = new Array(cellCount)
  if (liveAmount === cellCount) {
    states.fill(true, 0, cellCount)
    return states
  }
  states.fill(false, 0, cellCount)
  const freeCells: number[] = [...Array(cellCount).keys()]

  while (liveAmount > 0) {
    const random = generateRandom(freeCells.length)
    states[freeCells[random]] = true
    freeCells.splice(random, 1)
    liveAmount--
  }
  return states
}

export const mutateCell = (cellIndex: number, states: boolean[]) =>
  states.map((state, index) => (index === cellIndex ? !state : state))

export const nextStep = (states: boolean[], cellInRow: number) => {
  return states.map((state, index) => nextStepForCell(states, cellInRow, index))
}
/**Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead. */
export const nextStepForCell = (
  states: boolean[],
  cellInRow: number,
  cellIndex: number
) => {
  if (states.length === 1) {
    return states[0]
  }
  let aliveNeighbourCount = 0

  const remainder = cellIndex % cellInRow
  switch (remainder) {
    case 0:
      aliveNeighbourCount = sumNeighbours(states, [
        cellIndex + 1,
        cellIndex + cellInRow,
        cellIndex + cellInRow + 1,
        cellIndex - cellInRow,
        cellIndex - cellInRow + 1,
      ])
      break
    case cellInRow - 1:
      aliveNeighbourCount = sumNeighbours(states, [
        cellIndex - 1,
        cellIndex + cellInRow,
        cellIndex + cellInRow - 1,
        cellIndex - cellInRow,
        cellIndex - cellInRow - 1,
      ])
      break
    default:
      aliveNeighbourCount = sumNeighbours(states, [
        cellIndex - 1,
        cellIndex + 1,
        cellIndex + cellInRow,
        cellIndex + cellInRow - 1,
        cellIndex + cellInRow + 1,
        cellIndex - cellInRow,
        cellIndex - cellInRow - 1,
        cellIndex - cellInRow + 1,
      ])
      break
  }
  const currentState = states[cellIndex]

  return (
    (currentState &&
      (aliveNeighbourCount === 2 || aliveNeighbourCount === 3)) ||
    (!currentState && aliveNeighbourCount === 3)
  )
}

const sumNeighbours = (states: boolean[], cellIndexes: number[]) => {
  return cellIndexes
    .map((index) => getValue(states, index))
    .reduce((prev: number, cur: number) => prev + cur, 0)
}

const getValue = (states: boolean[], cellIndex: number) => {
  return states[cellIndex] ? 1 : 0
}
