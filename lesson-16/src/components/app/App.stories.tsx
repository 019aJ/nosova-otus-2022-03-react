import { App } from "../app/App"
import { Provider } from "react-redux"
import { configureStore, createStore } from "@reduxjs/toolkit"
import { ProviderWrapper } from "../providerwrapper/ProviderWrapper"
import { GameStateReducer } from "../../redux/store"

export default {
  title: "App",
  component: App,
}
const store = createStore(GameStateReducer)

export const Basic = () => (
  <ProviderWrapper store={store}>
    <App />
  </ProviderWrapper>
)
