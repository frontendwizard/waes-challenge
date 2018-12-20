import React from "react"
import { render, fireEvent } from "react-testing-library"
import App from "./App"

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />)
    expect(container.firstChild).toBeTruthy()
  })
  it("highlights the selected text", () => {
    const { getByTestId } = render(<App />)
    const textarea = getByTestId("highlightable-textarea")

    textarea.focus()
    textarea.setSelectionRange(0, 5)
    fireEvent.mouseUp(textarea)

    expect(getByTestId("highlight").textContent).toBe("Lorem")
  })
  it("shows the highlight on the results", () => {
    const { getByTestId } = render(<App />)
    const textarea = getByTestId("highlightable-textarea")

    textarea.focus()
    textarea.setSelectionRange(0, 5)
    fireEvent.mouseUp(textarea)

    expect(getByTestId("highlight-result").textContent).toBe("Lorem")
  })
  it("highlights text with different colors", () => {
    const { getAllByTestId, getByTestId } = render(<App />)
    const textarea = getByTestId("highlightable-textarea")
    const greenButton = getAllByTestId("green-button")

    textarea.focus()
    textarea.setSelectionRange(0, 5)
    fireEvent.mouseUp(textarea)
    fireEvent.click(greenButton[0])
    textarea.focus()
    textarea.setSelectionRange(6, 11)
    fireEvent.mouseUp(textarea)

    // sees the red result
    expect(getByTestId("highlight-result").textContent).toBe("Lorem")
    // switches to green filter
    fireEvent.click(greenButton[1])
    // sees the green result
    expect(getByTestId("highlight-result").textContent).toBe("Ipsum")
  })
})
