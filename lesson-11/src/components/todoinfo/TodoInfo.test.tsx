import { render, screen, act, waitFor } from "@testing-library/react"
import { Todo } from "../../dto/Todo"
import TodoInfo from "./TodoInfo"
describe("render tests", () => {
  it("task render works", () => {
    const todo:Todo = { id: 1, title: "Todo Name 1", completed: true, userId: 1 }
    render(<TodoInfo todo={todo} />)
    const checkbox: HTMLInputElement = screen.getByRole("checkbox")
    expect(checkbox.value).toBeTruthy()
    expect(screen.getAllByText(/todo name 1/i).length).toEqual(1)
  })
})
