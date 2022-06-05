import { useContext } from "react"
import { AuthContext } from "../../context"
import { privateRoutes, publicRoutes } from "../../routes"
import { Navigate, Route, Routes } from "react-router-dom"

interface AppProps {}

export const AppRouter: React.FC<AppProps> = ({}) => {
  const { name, saveName } = useContext(AuthContext)

  return name ? (
    <Routes>
      {privateRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={<r.component />}></Route>
      ))}
      <Route path="*" element={<Navigate to="/game" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={
            <r.component
              onSubmit={(value) => {
                saveName(value)
                localStorage.setItem("auth", value)
              }}
            />
          }
        ></Route>
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
