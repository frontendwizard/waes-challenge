export const initialState = {
  nextId: 0,
  colors: ["cff0000", "c00ff00", "c0000ff"],
  highlightColor: "cff0000",
  viewColor: "cff0000",
  highlights: [],
  text:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "setHighlightColor":
      return { ...state, highlightColor: action.payload }
    case "setViewColor":
      return { ...state, viewColor: action.payload }
    case "setColorFilter":
      return { ...state, viewColor: action.payload }
    case "addHighlight":
      return {
        ...state,
        nextId: state.nextId + 1,
        highlights: [...state.highlights, action.payload].sort(
          (a, b) => a.range.start - b.range.start,
        ),
      }
    case "updateHighlights":
      return {
        ...state,
        highlights: state.highlights
          .filter(
            hg =>
              !(
                hg.range.start >= action.payload.changePosition &&
                hg.range.end <
                  action.payload.changePosition +
                    Math.abs(action.payload.diffLength)
              ),
          )
          .map(highlight => {
            const hgStart = highlight.range.start
            const hgEnd = highlight.range.end
            if (
              hgStart === action.payload.changePosition &&
              hgEnd >
                action.payload.changePosition +
                  Math.abs(action.payload.diffLength)
            ) {
              highlight.range.start = action.payload.changePosition
            }
            if (hgStart > action.payload.changePosition)
              highlight.range.start += action.payload.diffLength
            if (hgEnd >= action.payload.changePosition)
              highlight.range.end += action.payload.diffLength
            return highlight
          }),
      }
    case "removeHighlight":
      return {
        ...state,
        highlights: state.highlights.filter(hg => hg.id !== action.payload),
      }
    case "updateText":
      return { ...state, text: action.payload }
    default:
      return state
  }
}
