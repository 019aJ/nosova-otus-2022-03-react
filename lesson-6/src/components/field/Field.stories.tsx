import Cell from "../cell/Cell"
import Field from "./Field"
import { within, userEvent } from "@storybook/testing-library"
export default {
  title: "Field",
  component: Field,
}
export const Basic = () => <Field />
export const Second = () => <Field title="My second tag" />

export const WithTwoChild = () => (
  <Field cellCount={2}>
  </Field>
)

export const WithFourChild = () => (
  <Field cellCount={4} height="300px">
  </Field>
)

export const With7Child = () => (
  <Field cellCount={7}>
  </Field>
)

With7Child.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const cells = canvas.getAllByText("click me")
  await userEvent.click(cells[0])
  await userEvent.click(cells[1])
  await userEvent.click(cells[5])
}