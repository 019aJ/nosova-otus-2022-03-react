import { render, screen, act, waitFor } from "@testing-library/react"
import TodoCard from "./TodoCard"
import UserService from "../../api/UserService"
import { Todo } from "../../dto/Todo"
describe("render tests", () => {
  it("task render works", async () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo Name 1", completed: true, userId: 1 },
      { id: 2, title: "Todo Name 2", completed: false, userId: 1 },
    ]
    UserService.getUsersTasks = jest.fn(
      (userId: number, controller = new AbortController()) =>
        new Promise<Todo[]>((resolve, reject) => resolve(todos))
    )
    render(<TodoCard userId={1} />)
    expect(
      await screen.findByText(/Todo Name 1/i, {}, { timeout: 10 })
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/Todo Name 2/i, {}, { timeout: 10 })
    ).toBeInTheDocument()
  })
})

describe("click tests", () => {
  it("click works", async () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo Name 1", completed: true, userId: 1 },
    ]
    UserService.getUsersTasks = jest.fn(
      (userId: number, controller = new AbortController()) =>
        new Promise<Todo[]>((resolve, reject) => resolve(todos))
    )
    render(<TodoCard userId={1} />)

    await waitFor(() => {
      expect(screen.getByText("Todo Name 1")).toBeInTheDocument()
      
    })
  })
})
