import React, { useRef } from "react"
import "./Highlightable.css"

const Highlightable = ({
  highlights,
  addHighlight,
  removeHighlight,
  color,
  text,
  onTextChange,
}) => {
  const textRef = useRef(null)
  const highlightsRef = useRef(null)

  const onScroll = e => {
    e.persist()
    highlightsRef.current.scrollTop = e.target.scrollTop
  }

  const onMouseUp = e => {
    e.persist()
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
    addHighlight({
      range: { start, end },
      color,
    })
  }

  const parseHighlights = () => {
    let extraMarkupChars = 0
    return highlights.reduce((acc, selection) => {
      const highlight =
        `${acc.slice(0, selection.range.start + extraMarkupChars)}` +
        `<span class="${selection.color}" data-testid="highlight">${acc.slice(
          selection.range.start + extraMarkupChars,
          selection.range.end + extraMarkupChars,
        )}</span>` +
        `${acc.slice(selection.range.end + extraMarkupChars)}`
      // `<span class="`. length
      // + color.length
      // + `" data-testid="highlight">`.lenth
      // + `</span>`.length
      extraMarkupChars += 13 + selection.color.length + 26 + 7
      return highlight
    }, text)
  }
  return (
    <div className="wrapper">
      <textarea
        data-testid="highlightable-textarea"
        className="text"
        ref={textRef}
        value={text}
        onChange={e => onTextChange(e.target.value)}
        onMouseUp={onMouseUp}
        onScroll={onScroll}
      />
      <div
        data-testid="highlightable-background"
        ref={highlightsRef}
        className="highlight text"
        dangerouslySetInnerHTML={{
          __html: parseHighlights(text),
        }}
      />
    </div>
  )
}

export default Highlightable
