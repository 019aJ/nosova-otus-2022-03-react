import React from "react"
import Cell from "../cell/Cell"
import Field from "./Field"

export default {
  title: "Field title",
  component: Field,
}
export const Basic = () => <Field />
export const Second = () => <Field title="My second tag" />

export const WithTwoChild = () => (
  <Field>
    <Cell key={"1"} id={"1"} />
    <Cell key={"2"} id={"2"} />
  </Field>
)

export const WithFourChild = () => (
  <Field>
    <Cell key={"1"} id={"1"} />
    <Cell key={"2"} id={"2"} />
    <Cell key={"3"} id={"3"} />
    <Cell key={"4"} id={"4"} />
  </Field>
)
