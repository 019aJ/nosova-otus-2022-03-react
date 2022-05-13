import React from "react"
import ReactDOM from "react-dom"
import ErrorBoundary from "./components/error/ErrorBoundry"
import Field from "./components/field/Field"
import "./index.css"
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Field />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
)
