import { expect } from 'chai'
import actionTypes from 'core/redux/action-types'
import subscriptions from 'core/redux/reducers/subscriptions'

describe('subscriptions reducer', () => {
  it('returns the initial state', () => {
    expect(subscriptions()).to.deep.equal([])
  })

  it('adds to the state the payload of a ADD_SUBSCRIPTION action', () => {
    const result = subscriptions([], {
      payload: 'foo',
      type: actionTypes.ADD_SUBSCRIPTION,
    })

    expect(result).to.include('foo')
  })

  it('removes from the state the payload of a  REMOVE_SUBSCRIPTION action', () => {
    const result = subscriptions(['foo'], {
      payload: 'foo',
      type: actionTypes.REMOVE_SUBSCRIPTION,
    })

    expect(result).not.to.include('foo')
  })

  it('handles any other actions by returning the current state', () => {
    expect(subscriptions('foo')).to.equal('foo')
  })
})
