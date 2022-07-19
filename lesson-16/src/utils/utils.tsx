export const isDigit = (value: string) => {
  return value && /[0-9]/.test(value)
}

export const calcFieldAndCellSize = (
  cellCount: number | undefined,
  width: number,
  height: number
) => {
  const elemInRow =
    cellCount && cellCount > 0 ? Math.ceil(Math.sqrt(cellCount)) : 0
  const elemWidth = elemInRow ? Math.floor(width / elemInRow) : 0
  const elemHeight = elemInRow ? Math.floor(height / elemInRow) : 0
  width = elemInRow > 0 ? Math.floor(elemInRow * elemWidth) : width
  height =
    cellCount && elemInRow > 0
      ? Math.floor(cellCount / elemInRow) * elemHeight
      : height
  return {
    fieldWidth: width,
    filedHeight: height,
    cellWidth: elemWidth - 2,
    cellHeight: elemHeight - 2,
  }
}

export const generateRandom = (maxLimit: number): number => {
  return Math.floor(Math.random() * maxLimit)
}
