import React, { useReducer } from "react"
import { reducer, initialState } from "./reducer"
import Highlightable from "./Highlightable"
import Selectors from "./Selectors"
import Results from "./Results"
import "./reset.css"
import "./App.css"

const App = () => {
  // redux store
  const [state, dispatch] = useReducer(reducer, initialState)
  // find out where the change started
  const findChangePosition = value => {
    for (let i = 0; i < state.text.length; i++)
      if (state.text.charAt(i) !== value.charAt(i)) return i
    // happened at the end
    return null
  }
  // find out how much has changed
  const getDiffLength = value => value.length - state.text.length
  // if change is made in the middle of the text, update highlights to follow
  // up on the changes and update the text
  const onChange = text => {
    const diffLength = getDiffLength(text)
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
