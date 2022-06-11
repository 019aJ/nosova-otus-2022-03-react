// // Задание 1 Лучшая команда (наибольшее кол-во очков), выводим имя
export type Team = { name: string; score: number }

export const getTopName = (teams: Team[]): string => {
  return teams.length > 0
    ? teams.reduce((prev, cur) => (prev.score >= cur.score ? prev : cur)).name
    : ""
}

// // Задание 2 Querystring из объекта
type ValueType = string | number | boolean | string[] | number[] | boolean[]

export type QsObj = Record<string, ValueType>

export const createQs = (qsObj: QsObj): string => {
  return (
    "?" +
    Object.keys(qsObj)
      .filter((key) => qsObj[key])
      .map((key) => key + "=" + valueToString(qsObj[key]))
      .join("&")
  )
}

const valueToString = (value: ValueType): string => {
  return Array.isArray(value) ? value.join(",") : value.toString()
}
const stringToValue = (str: string): ValueType => {
  return str.includes(",") ? str.split(",") : str
}
// // Задание 3 Объект из querystring

export const parseQs = (qs: string): QsObj => {
  const params = qs.startsWith("?") ? qs.substring(1) : qs
  return params
    .split("&")
    .filter((param) => param)
    .filter((param) => param.split("=").length > 1 && param.split("=")[1])
    .map((param) => {
      const paramArray = param.split("=")
      const key = paramArray[0]
      const value = stringToValue(paramArray[1])
      return { [key]: value }
    })
    .reduce((prev, cur) => {
      return { ...prev, ...cur }
    })
}
