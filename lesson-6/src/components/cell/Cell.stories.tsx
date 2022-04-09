import Cell from './Cell'

export default {
     title: 'Cell',
     component: Cell
}
export const Basic = () => <Cell key={Math.floor(Math.random() * 1000).toString()} />
export const Second = () => (
  <Cell
    width="60px"
    title="2"
    key={Math.floor(Math.random() * 1000).toString()}
  />
)