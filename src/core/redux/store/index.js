import * as reducers from 'core/redux/reducers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import npmFollower from 'core/redux/middleware/npm-follower'
import storage, { getInitialState } from 'core/redux/middleware/storage'
import thunk from 'redux-thunk'

export default () => (
  getInitialState()
    .then(initialState => (
      createStore(
        combineReducers(reducers),
        initialState,
        applyMiddleware(
          thunk,
          storage(['subscriptions']),
          npmFollower
        )
      )
    ))
)
