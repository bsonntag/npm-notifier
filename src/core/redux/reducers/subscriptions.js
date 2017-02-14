import { isEqual, negate } from 'lodash/fp'
import actionTypes from '../action-types'

export default function subscriptions(state = [], action = {}) {
  switch(action.type) {
    case actionTypes.ADD_SUBSCRIPTION:
      return [
        ...state,
        action.payload
      ]
    case actionTypes.REMOVE_SUBSCRIPTION:
      return state.filter(negate(isEqual(action.payload)))
    default:
      return state
  }
}
