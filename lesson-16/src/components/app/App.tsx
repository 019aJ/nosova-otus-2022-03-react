import { GamePanel } from "../gamepanel/GamePanel"
import { useState } from "react"
import { NameForm } from "../nameform/NameForm"

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <div>
      {isLogin ? <GamePanel /> : <NameForm onSubmit={() => setIsLogin(true)} />}
    </div>
  )
}
