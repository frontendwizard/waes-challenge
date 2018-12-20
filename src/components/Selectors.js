import React from "react"
import "./Selectors.css"

const Selectors = ({ colors, onColorClick }) => (
  <div className="selectors">
    {colors.map(color => (
      <button
        key={color}
        className={color}
        onClick={() => onColorClick(color)}
        data-testid={`${color}-button`}
      />
    ))}
  </div>
)

export default Selectors
