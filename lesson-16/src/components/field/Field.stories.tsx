import { Field } from "./Field"
import appStore from "../../redux/store"
import { ProviderWrapper } from "../providerwrapper/ProviderWrapper"
import { init } from "../../redux/flowSlice"
export default {
  title: "Field",
  component: Field,
}
const store = appStore
export const Basic = () => {
  store.dispatch(init({ cellCount: 100, percentage: 50 }))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
export const Second = () => {
  store.dispatch(init({ cellCount: 12, percentage: 50 }))

  return (
    <ProviderWrapper store={store}>
      <Field title="My second tag" cellCount={12} />
    </ProviderWrapper>
  )
}

export const WithTwoChild = () => {
  store.dispatch(init({ cellCount: 2, percentage: 50 }))

  return (
    <ProviderWrapper store={store}>
      <Field cellCount={2} />
    </ProviderWrapper>
  )
}

export const WithCustomSize = () => {
  store.dispatch(init({ cellCount: 100, percentage: 50 }))
  return (
    <ProviderWrapper store={store}>
      <Field cellCount={100} height={300} />
    </ProviderWrapper>
  )
}

export const With7Child = () => {
  store.dispatch(init({ cellCount: 7, percentage: 50 }))
  return (
    <ProviderWrapper store={store}>
      <Field cellCount={7} />
    </ProviderWrapper>
  )
}

export const With30Percentage = () => {
  store.dispatch(init({ cellCount: 100, percentage: 30 }))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
export const With0Percentage = () => {
  store.dispatch(init({ cellCount: 100, percentage: 0 }))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
export const With100Percentage = () => {
  store.dispatch(init({ cellCount: 100, percentage: 100 }))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
