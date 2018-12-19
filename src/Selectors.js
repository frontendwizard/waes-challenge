import React from "react"
import "./Selectors.css"

const Selectors = ({ colors, onColorClick }) => (
  <div className="selectors">
    {colors.map(color => (
      <button
        key={color}
        className={color}
        onClick={() => onColorClick(color)}
      />
    ))}
  </div>
)

export default Selectors
