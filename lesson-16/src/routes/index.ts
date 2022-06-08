import { GamePanel } from "../components/gamepanel/GamePanel"
import { NameForm } from "../components/nameform/NameForm"

export const privateRoutes = [
  {
    path: process.env.ROUTE_PATH ? process.env.ROUTE_PATH + "/game" : "/game",
    component: GamePanel,
  },
]

export const publicRoutes = [
  {
    path: process.env.ROUTE_PATH ? process.env.ROUTE_PATH + "/login" : "/login",
    component: NameForm,
  },
]
