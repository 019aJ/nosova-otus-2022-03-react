import { useContext } from "react"
import { AuthContext } from "../../context"
import { privateRoutes, publicRoutes } from "../../routes"
import { Navigate, Route, Routes } from "react-router-dom"

export const AppRouter: React.FC = ({}) => {
  const { name, saveName } = useContext(AuthContext)
  let defaultPath = name ? "/game" : "/login"
  defaultPath = process.env.ROUTE_PATH
    ? process.env.ROUTE_PATH + defaultPath
    : defaultPath
  return name ? (
    <Routes>
      {privateRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={<r.component />}></Route>
      ))}
      <Route path="*" element={<Navigate to={defaultPath} replace />} />
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
      <Route path="*" element={<Navigate to={defaultPath} replace />} />
    </Routes>
  )
}
