import React from "react"
import { render } from "react-testing-library"
import Results from "./Results"

describe("Results", () => {
  it("should match snapshot", () => {
    const { asFragment, unmount } = render(
      <Results
        highlights={[
          { range: { start: 0, end: 4 }, color: "red", id: 0 },
          { range: { start: 5, end: 7 }, color: "red", id: 1 },
        ]}
        color="red"
        text="this is a test"
      />,
    )

    expect(asFragment()).toMatchSnapshot()
    unmount()
  })
  it("should show only highlights that matches color", () => {
    const highlights = [
      { range: { start: 0, end: 4 }, color: "red", id: 0 },
      { range: { start: 5, end: 7 }, color: "blue", id: 1 },
    ]
    const { getByTestId, rerender, unmount } = render(
      <Results highlights={highlights} color="red" text="this is a test" />,
    )

    expect(getByTestId("highlight-result").textContent).toBe("this")
    rerender(
      <Results highlights={highlights} color="blue" text="this is a test" />,
    )
    expect(getByTestId("highlight-result").textContent).toBe("is")
    unmount()
  })
})
