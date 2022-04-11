import { render, screen } from '@testing-library/react';
import App from './App';

describe("App snapshot tests", () => {
  it("base snapshot", () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })

  it("some data snapshot", () => {
    const { container } = render(
      <App cellCount={12} />
    )
    expect(container).toMatchSnapshot()
  })
})
