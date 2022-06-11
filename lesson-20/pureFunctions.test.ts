test("dummy test", () => undefined)
import { getTopName, Team, QsObj, createQs, parseQs } from "./pureFunctions"

test("it works", () => expect(true).toBe(true))
test("getTopName", () => {
  const teams: Team[] = [
    { name: "Lions", score: 5 },
    { name: "Tigers", score: 4 },
    { name: "Bears", score: 6 },
    { name: "Monkeys", score: 2 },
  ]
  expect(getTopName(teams)).toBe("Bears")
})

test("empty team", () => {
  const teams: Team[] = []
  expect(getTopName(teams)).toBe("")
})

test("createQs", () => {
  const qsObj: QsObj = {
    page: "2",
    pageSize: "10",
    total: "205",
    somethingElse: "value",
  }
  expect(createQs(qsObj)).toBe(
    "?page=2&pageSize=10&total=205&somethingElse=value"
  )
})

test("createQsArray", () => {
  const qsObj: QsObj = {
    page: "2",
    pageSize: "10",
    total: [205,305,405],
    somethingElse: "value",
  }
  expect(createQs(qsObj)).toBe(
    "?page=2&pageSize=10&total=205,305,405&somethingElse=value"
  )
})

test("createQsEmpty", () => {
  const qsObj: QsObj = {
    page: "",
    pageSize: "10",
    total: [205, 305, 405],
    somethingElse: "value",
  }
  expect(createQs(qsObj)).toBe(
    "?pageSize=10&total=205,305,405&somethingElse=value"
  )
})

test("parseQs", () => {
  const qs = "?page=2&pageSize=10&total=205&somethingElse=value"
  expect(parseQs(qs)).toEqual({
    page: "2",
    pageSize: "10",
    total: "205",
    somethingElse: "value",
  })
})

test("parseQsArray", () => {
  const qs = "?page=2&pageSize=10&total=205,305,306&somethingElse=value"
  expect(parseQs(qs)).toEqual({
    page: "2",
    pageSize: "10",
    total: ["205", "305", "306"],
    somethingElse: "value",
  })
})

test("parseQsEmpty", () => {
  const qs = "?page=2&pageSize=10&total=&somethingElse=value"
  expect(parseQs(qs)).toEqual({
    page: "2",
    pageSize: "10",
    somethingElse: "value",
  })
})