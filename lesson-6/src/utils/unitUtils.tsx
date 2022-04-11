const numberPattern = /\d+/g
export const extractNum = (s: string): number => {
  const matches = s.match(numberPattern)
  return matches ? parseInt(matches[0]) : 500
}

export const extractUnits = (s: string): string => {
  const matches = extractNum(s)
  return matches ? s.substring(matches.toString().length) : "px"
}
