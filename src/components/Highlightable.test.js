import React from "react"
import { render } from "react-testing-library"
import Highlightable from "./Highlightable"

describe("Highlightable", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Highlightable
        highlights={[]}
        addHighlight={() => {}}
        removeHighlight={() => {}}
        nextId={0}
        color="red"
        text="this is a test"
        onTextChange={() => {}}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
  it("should highlight the provided ranges", () => {
    const { getAllByTestId } = render(
      <Highlightable
        highlights={[
          { range: { start: 0, end: 4 }, color: "red", id: 0 },
          { range: { start: 5, end: 7 }, color: "blue", id: 1 },
        ]}
        addHighlight={() => {}}
        removeHighlight={() => {}}
        nextId={2}
        color="red"
        text="this is a test"
        onTextChange={() => {}}
      />,
    )

    const highlights = getAllByTestId("highlight")
    expect(highlights).toBeTruthy()
    expect(highlights).toHaveLength(2)
    expect(highlights[0].textContent).toBe("this")
    expect(highlights[1].textContent).toBe("is")
  })
})
