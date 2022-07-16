import { useContext } from "react"
import { AuthContext } from "../../context"
import styles from "./Navbar.module.css"
import { FIELD_WIDTH } from "../../game/GameDefaults"
export const Navbar = () => {
  const { name, saveName } = useContext(AuthContext)
  const logout = () => {
    saveName(null)
    localStorage.removeItem("auth")
  }
  return name ? (
    <div data-testid={"navbar"} style={{ width: FIELD_WIDTH }}>
      <div className={styles.navbar}>
        <div className={styles.navbarElements}>
          Текущий пользователь: {name}
        </div>
        <button className={styles.navbarElements} onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  )
}
