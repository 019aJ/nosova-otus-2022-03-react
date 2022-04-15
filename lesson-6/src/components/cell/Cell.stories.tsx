import Cell from './Cell'

export default {
     title: 'Cell',
     component: Cell
}
export const Basic = () => <Cell />
export const Second = () => (
  <Cell
    width="60px"
    title="2"
  />
)