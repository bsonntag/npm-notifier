import { createAction } from 'redux-actions'
import actionTypes from 'core/redux/action-types'

export const addSubscription = createAction(actionTypes.ADD_SUBSCRIPTION)
export const removeSubscription = createAction(actionTypes.REMOVE_SUBSCRIPTION)
