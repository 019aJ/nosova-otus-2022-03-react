import { GamePanel } from "./GamePanel"
import { createStore } from "redux"
import { GameStateReducer } from "../../redux/store"
import { ProviderWrapper } from "../providerwrapper/ProviderWrapper"
export default {
  title: "GamePanel",
  component: GamePanel,
}
const store = createStore(GameStateReducer)

export const Basic = () => (
  <ProviderWrapper store={store}>
    <GamePanel />
  </ProviderWrapper>
)

