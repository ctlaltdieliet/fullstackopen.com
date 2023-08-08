const initialState = {
}

const usernameReducer = (state = initialState, action) => {
  let newState = {
    good: state.good,
    ok: state.ok,
    bad: state.bad
  }
  switch (action.type) {

  case 'GOOD':
    newState.good++
    return newState

  case 'OK':
    newState.ok++
    return newState

  case 'BAD':
    newState.bad++
    return newState

  default:
    return initialState

  }

}

export default usernameReducer
