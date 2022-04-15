const numberPattern = /\d+/g
const DEFAULT_SIZE = 500
const DEFAULT_UNIT = "px"
export const extractNum = (s: string, defaultVal: number = DEFAULT_SIZE): number => {
  const matches = s.match(numberPattern)
  return matches ? parseInt(matches[0]) : defaultVal
}

export const extractUnits = (s: string, defaultVal: string = DEFAULT_UNIT): string => {
  const matches = extractNum(s)
  return matches ? s.substring(matches.toString().length) : defaultVal
}
