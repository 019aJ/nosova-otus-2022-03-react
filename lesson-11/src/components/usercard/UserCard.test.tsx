import { render, screen, act, waitFor } from "@testing-library/react"
import UserCard from "./UserCard"
import UserService from "../../api/UserService"
import { Todo } from "../../dto/Todo"
import { User } from "../../dto/User"

const user: User = {
  id: 1,
  name: "Stub Name",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
}

describe("render tests", () => {
  it("task render works", async () => {
    render(<UserCard user={user} width={200} height={200} />)
    expect(
      await screen.findByText(/Stub Name/i, {}, { timeout: 10 })
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
    render(<UserCard user={user} width={200} height={200} />)

    await waitFor(() => {
      
      const button = screen.getByRole("button")

      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
      })
    })

    expect(UserService.getUsersTasks).toHaveBeenCalledTimes(1)
    expect(
      await screen.findByText(/Todo Name 1/i, {}, { timeout: 10 })
    ).toBeInTheDocument()
  })
})
