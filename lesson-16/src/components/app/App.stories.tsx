import { App } from "../app/App"
import { ProviderWrapper } from "../providerwrapper/ProviderWrapper"
import  appStore  from "../../redux/store"

export default {
  title: "App",
  component: App,
}

export const Basic = () => (
  <ProviderWrapper store={appStore}>
    <App />
  </ProviderWrapper>
)
