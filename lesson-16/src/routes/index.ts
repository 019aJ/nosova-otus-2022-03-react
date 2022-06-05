import { GamePanel } from "../components/gamepanel/GamePanel"
import { NameForm } from "../components/nameform/NameForm"

export const privateRoutes = [{ path: "/game", component: GamePanel }]

export const publicRoutes = [{ path: "/login", component: NameForm }]
