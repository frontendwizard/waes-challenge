import React from "react"
import { render, fireEvent } from "react-testing-library"
import Selectors from "./Selectors"

describe("Selectors", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Selectors colors={["red", "blue", "green"]} onColorClick={() => {}} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
