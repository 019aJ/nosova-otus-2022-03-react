import { Field } from "./Field"
import appStore from "../../redux/store"
import { ProviderWrapper } from "../providerwrapper/ProviderWrapper"
import { createInitAction } from "../../redux/actionCreator"
export default {
  title: "Field",
  component: Field,
}
const store = appStore
export const Basic = () => {
  store.dispatch(createInitAction(100, 50))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
export const Second = () => {
  store.dispatch(createInitAction(12, 50))

  return (
    <ProviderWrapper store={store}>
      <Field title="My second tag" cellCount={12} />
    </ProviderWrapper>
  )
}

export const WithTwoChild = () => {
  store.dispatch(createInitAction(2, 50))

  return (
    <ProviderWrapper store={store}>
      <Field cellCount={2} />
    </ProviderWrapper>
  )
}

export const WithCustomSize = () => {
  store.dispatch(createInitAction(100, 50))
  return (
    <ProviderWrapper store={store}>
      <Field cellCount={100} height={300} />
    </ProviderWrapper>
  )
}

export const With7Child = () => {
  store.dispatch(createInitAction(7, 50))
  return (
    <ProviderWrapper store={store}>
      <Field cellCount={7} />
    </ProviderWrapper>
  )
}

export const With30Percentage = () => {
  store.dispatch(createInitAction(100, 30))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
export const With0Percentage = () => {
  store.dispatch(createInitAction(100, 0))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
export const With100Percentage = () => {
  store.dispatch(createInitAction(100, 100))
  return (
    <ProviderWrapper store={store}>
      <Field />
    </ProviderWrapper>
  )
}
