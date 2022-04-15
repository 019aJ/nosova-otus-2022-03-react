import Field from "../field/Field"
import { Component } from "react"

interface AppProps {
  cellCount: number
}

export default class App extends Component<AppProps> {
  static defaultProps = {
    cellCount: 0,
  }
  render() {
    return (
      <div className="App">
        <Field cellCount={this.props.cellCount}></Field>
      </div>
    )
  }
}
