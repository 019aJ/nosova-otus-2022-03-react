import {  useEffect, useState } from "react"
import { AuthContext } from "../../context"
import { Navbar } from "./Navbar"
export default {
  title: "Navbar",
  component: Navbar,
}

export const Basic = () => {
  const [userName, setUserName] = useState<string | null>(null)
  useEffect(() => {
    setUserName("username")
  }, [])
  return (
    <AuthContext.Provider
      value={{
        name: userName,
        saveName: setUserName,
      }}
    >
      <Navbar />
    </AuthContext.Provider>
  )
}
