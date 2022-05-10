import { render, screen} from "@testing-library/react"
import UserInfo from "./UserInfo"
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
  it("user render works", () => {
    render(<UserInfo user={user} />)
    expect(screen.getAllByText(/Sincere@april.biz/i).length).toEqual(1)
  })
})
