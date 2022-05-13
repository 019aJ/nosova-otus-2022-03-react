import { render, screen, act } from "@testing-library/react"
import SwitchButton from "./SwitchButton"
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
describe("click tests", () => {
  it("click callback works", () => {
    var clicked = false
    render(
      <SwitchButton
        todoVisible={true}
        onClick={() => {
          clicked = true
        }}
      />
    )
    const button = screen.getByRole("button")

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(clicked).toEqual(true)
  })
})
