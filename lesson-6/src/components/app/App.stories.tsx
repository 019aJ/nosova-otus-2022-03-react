import App from "../app/App"
export default {
  title: "App",
  component: App,
}

export const Basic = () => <App />

export const SomeCells = () => <App cellCount={12} />
