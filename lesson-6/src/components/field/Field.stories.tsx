import Field from "./Field"
import { within, userEvent } from "@storybook/testing-library"
export default {
  title: "Field",
  component: Field,
}
export const Basic = () => <Field />
export const Second = () => <Field title="My second tag" />

export const WithTwoChild = () => (
  <Field cellCount={2}/>
)

export const WithFourChild = () => (
  <Field cellCount={4} height="300px"/>
)

export const With7Child = () => (
  <Field cellCount={7}/>
)

With7Child.play = async ({ canvasElement }: any) => {
  const canvas = within(canvasElement)
  const cells = canvas.getAllByText("click me")
  await userEvent.click(cells[0])
  await userEvent.click(cells[1])
  await userEvent.click(cells[5])
}