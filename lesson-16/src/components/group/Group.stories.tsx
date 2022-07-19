/** @format */

import { Group } from "./Group"
export default {
  title: "Group",
  component: Group,
}

export const Empty = () => <Group title="Группа" />

export const WithClid = () => (
  <Group title="Группа">
    <div>Inner Div</div>
  </Group>
)
