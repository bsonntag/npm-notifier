import actionTypes from '../action-types'

export default function activity(state = [], action = {}) {
  switch(action.type) {
    case actionTypes.ADD_ACTIVITY:
      return [
        action.payload,
        ...state.slice(0, 4)
      ]
    default:
      return state
  }
}
