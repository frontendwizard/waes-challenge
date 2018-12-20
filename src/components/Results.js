import React from "react"
import "./Results.css"

const Results = ({ highlights, color, text }) => (
  <ul className="results">
    {highlights.filter(hg => hg.color === color).map(hg => (
      <li key={hg.id}>
        <span className={hg.color} data-testid="highlight-result">
          {text.slice(hg.range.start, hg.range.end)}
        </span>
      </li>
    ))}
  </ul>
)

export default Results
