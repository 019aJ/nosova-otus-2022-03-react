import { GamePanel } from "./GamePanel"
import appStore from "../../redux/store"
import { ProviderWrapper } from "../providerwrapper/ProviderWrapper"
export default {
  title: "GamePanel",
  component: GamePanel,
}
export const Basic = () => (
  <ProviderWrapper store={appStore}>
    <GamePanel />
  </ProviderWrapper>
)
