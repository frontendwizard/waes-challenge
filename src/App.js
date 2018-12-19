import React, { useReducer } from "react"
import { reducer, initialState } from "./reducer"
// Components
import Highlightable from "./components/Highlightable"
import Selectors from "./components/Selectors"
import Results from "./components/Results"
// Global css
import "./App.css"
// Utils
import { getStringDiffLength, findChangePosition } from "./utils"

const App = () => {
  // redux store
  const [state, dispatch] = useReducer(reducer, initialState)
  // if change is made in the middle of the text, update highlights to follow
  // up on the changes and update the text
  const onChange = text => {
    // find out how a string has changed
    const diffLength = getStringDiffLength(text, state.text)
    // find out where the change started
    const changePosition = findChangePosition(text)
    if (changePosition !== null) {
      dispatch({
        type: "updateHighlights",
        payload: { changePosition, diffLength },
      })
    }
    dispatch({ type: "updateText", payload: text })
  }
  return (
    <>
      <Selectors
        colors={state.colors}
        onColorClick={payload =>
          dispatch({ type: "setHighlightColor", payload })
        }
      />
      <Highlightable
        highlights={state.highlights}
        addHighlight={payload => dispatch({ type: "addHighlight", payload })}
        removeHighlight={payload =>
          dispatch({ type: "removeHighlight", payload })
        }
        nextId={state.nextId}
        color={state.highlightColor}
        text={state.text}
        onTextChange={onChange}
      />
      <Selectors
        colors={state.colors}
        onColorClick={payload => dispatch({ type: "setViewColor", payload })}
      />
      <Results
        highlights={state.highlights}
        color={state.viewColor}
        text={state.text}
      />
    </>
  )
}

export default App
