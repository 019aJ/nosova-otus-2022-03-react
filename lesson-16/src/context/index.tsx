import { createContext } from "react"

interface ContextType {
  name: string | null
  saveName: (name: string | null) => void
}
export const AuthContext = createContext<ContextType>({} as ContextType)
