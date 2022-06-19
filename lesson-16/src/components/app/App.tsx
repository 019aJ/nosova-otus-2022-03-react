import { useEffect, useState } from "react"
import { AuthContext } from "../../context"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "../approutes/AppRouter"
import { Navbar } from "../navbar/Navbar"

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    setUserName(localStorage.getItem("auth"))
  }, [])
  return (
    <AuthContext.Provider
      value={{
        name: userName,
        saveName: setUserName,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
