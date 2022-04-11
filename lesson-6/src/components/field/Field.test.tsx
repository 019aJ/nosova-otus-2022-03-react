import { render } from "@testing-library/react"
import Cell, { CellProps } from "../cell/Cell"
import Field from "../field/Field"

describe("Field snapshot tests", () => {
  it("base snapshot", () => {
    const { container } = render(<Field />)
    expect(container).toMatchSnapshot()
  })

  it("with cells snapshot", () => {
    const { container } = render(<Field cellCount={12} />)
    expect(container).toMatchSnapshot()
  })

  it("some data with sizes snapshot", () => {
    const { container } = render(
      <Field cellCount={12} height="500px" width="300px" />
    )
    expect(container).toMatchSnapshot()
  })
})
