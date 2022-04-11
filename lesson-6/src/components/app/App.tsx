import Field from "../field/Field"
import { Component } from "react"

interface AppProps {
  cellCount?: number
}

export default class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <Field cellCount={this.props.cellCount || 0}></Field>
      </div>
    )
  }
}
