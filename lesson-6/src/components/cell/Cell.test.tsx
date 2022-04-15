import Cell from "./Cell"
import { render } from "@testing-library/react"

describe("Cell snapshot tests", () => {
  it("base snapshot", () => {
    const { container } = render(<Cell id="197" />)
    expect(container).toMatchSnapshot()
  })

  it("some data snapshot", () => {
    const { container } = render(
      <Cell title="0" width="5px" height="5px" id="0" />
    )
    expect(container).toMatchSnapshot()
  })
})
