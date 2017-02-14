import * as actions from 'core/redux/actions/subscriptions'
import { expect } from 'chai'
import { mockStore } from 'fixtures/mock-store'
import actionTypes from 'core/redux/action-types'

describe('subscription actions', () => {
  let store

  beforeEach(() => {
    store = mockStore()
  })

  describe('addSubscription(subscription)', () => {
    it('dispatches an ADD_SUBSCRIPTION action', () => {
      store.dispatch(actions.addSubscription('foo'))

      expect(store.getActions()).to.include({
        payload: 'foo',
        type: actionTypes.ADD_SUBSCRIPTION,
      })
    })
  })

  describe('removeSubscription(subscription)', () => {
    it('dispatches a REMOVE_SUBSCRIPTION action', () => {
      store.dispatch(actions.removeSubscription('foo'))

      expect(store.getActions()).to.include({
        payload: 'foo',
        type: actionTypes.REMOVE_SUBSCRIPTION,
      })
    })
  })
})
