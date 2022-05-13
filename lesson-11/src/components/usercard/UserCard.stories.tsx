import { User } from "../../dto/User"
import UserCard from "./UserCard"

export default {
  title: "Карточка пользователя",
  component: UserCard,
}

const user: User = {
  id: 1,
  name: "Leanne Graham",
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

export const StubCard = () => <UserCard width={200} height={200} user={user} />
export const StubTodoCard = () => <UserCard width={200} height={200} user={user} todoVisible={true} />
