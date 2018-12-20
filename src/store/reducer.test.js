import { reducer } from "./reducer"

describe("reducer", () => {
  describe("setHighlightColor", () => {
    it("should change the highlight color", () => {
      const state = {
        highlightColor: "red",
      }
      const action = { type: "setHighlightColor", payload: "blue" }

      expect(reducer(state, action)).toEqual({ highlightColor: "blue" })
    })
  })
  describe("setViewColor", () => {
    it("should change the view color", () => {
      const state = {
        viewColor: "red",
      }
      const action = { type: "setViewColor", payload: "blue" }

      expect(reducer(state, action)).toEqual({ viewColor: "blue" })
    })
  })
  describe("addHighlight", () => {
    it("should add a highlight to the state", () => {
      const state = {
        nextId: 0,
        highlights: [],
      }
      const action = { type: "addHighlight", payload: {} }

      expect(reducer(state, action)).toEqual({
        highlights: [{ id: 0 }],
        nextId: 1,
      })
    })
    it("should sort highlights by start on ascending order", () => {
      const state = {
        nextId: 1,
        highlights: [{ range: { start: 10, end: 40 }, id: 0 }],
      }
      const action = {
        type: "addHighlight",
        payload: { range: { start: 5, end: 8 } },
      }

      expect(reducer(state, action)).toEqual({
        highlights: [
          { range: { start: 5, end: 8 }, id: 1 },
          { range: { start: 10, end: 40 }, id: 0 },
        ],
        nextId: 2,
      })
    })
  })
  describe("updateHighlights", () => {
    it("should update highlights positions when text changes", () => {
      const state = {
        highlights: [{ range: { start: 10, end: 40 }, id: 0 }],
      }
      const action = {
        type: "updateHighlights",
        payload: { changePosition: 0, diffLength: 5 },
      }

      expect(reducer(state, action)).toEqual({
        highlights: [{ range: { start: 15, end: 45 }, id: 0 }],
      })
    })
  })
  describe("removeHighlight", () => {
    it("should remove a highlight from the store", () => {
      const state = {
        highlights: [
          { range: { start: 5, end: 8 }, id: 1 },
          { range: { start: 10, end: 40 }, id: 0 },
        ],
      }
      const action = {
        type: "removeHighlight",
        payload: 1,
      }

      expect(reducer(state, action)).toEqual({
        highlights: [{ range: { start: 10, end: 40 }, id: 0 }],
      })
    })
  })
  describe("updateText", () => {
    it("should update the text on the store", () => {
      const state = {
        text: "this is a test",
      }
      const action = { type: "updateText", payload: "it works!" }

      expect(reducer(state, action)).toEqual({ text: "it works!" })
    })
  })
})
