import React, { useRef } from "react"
import "./Highlightable.css"

const Highlightable = ({
  highlights,
  addHighlight,
  removeHighlight,
  nextId,
  color,
  text,
  onTextChange,
}) => {
  // ref to text and to highlight div to control scrolling
  const textRef = useRef(null)
  const highlightsRef = useRef(null)
  // sync scroll from textarea and highlights div
  const onScroll = e => {
    e.persist()
    highlightsRef.current.scrollTop = e.target.scrollTop
  }
  // listen to mouse up to get selections made with mouse
  const onMouseUp = _e => {
    const start = textRef.current.selectionStart
    const end = textRef.current.selectionEnd
    // no selection made
    if (start === end) return false
    // check if overlaps any existing hightlight
    if (highlights.find(hg => hg.range.start === start && hg.range.end === end))
      return false
    highlights.forEach(highlight => {
      if (
        // ends in the middle of a selection
        (end > highlight.range.start && end <= highlight.range.end) ||
        // starts in the middle of a selection
        (start >= highlight.range.start && start < highlight.range.end) ||
        // selection is in the middle of the new selection
        (start <= highlight.range.start && end > highlight.range.end)
      )
        removeHighlight(highlight.id)
    })
    // create new highlight
    addHighlight({
      range: { start, end },
      color,
      id: nextId,
    })
  }
  // parse highlights to add span tags between highlights for the
  // background div
  const getHighlights = () =>
    highlights.reduce((acc, selection, index) => {
      const EXTRA_MARKUP_CHARS = 29 * index
      return (
        `${acc.slice(0, selection.range.start + EXTRA_MARKUP_CHARS)}` +
        `<span class="${selection.color}">${acc.slice(
          selection.range.start + EXTRA_MARKUP_CHARS,
          selection.range.end + EXTRA_MARKUP_CHARS,
        )}</span>` +
        `${acc.slice(selection.range.end + EXTRA_MARKUP_CHARS)}`
      )
    }, text)
  return (
    <div className="wrapper">
      <textarea
        className="text"
        ref={textRef}
        value={text}
        onChange={e => onTextChange(e.target.value)}
        onMouseUp={onMouseUp}
        onDoubleClick={() => {}}
        onScroll={onScroll}
      />
      <div
        ref={highlightsRef}
        className="highlight text"
        dangerouslySetInnerHTML={{
          __html: getHighlights(text),
        }}
      />
    </div>
  )
}

export default Highlightable
