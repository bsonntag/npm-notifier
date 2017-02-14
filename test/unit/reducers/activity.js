import { expect } from 'chai'
import actionTypes from 'core/redux/action-types'
import activity from 'core/redux/reducers/activity'

describe('activity reducer', () => {
  it('returns the initial state', () => {
    expect(activity()).to.deep.equal([])
  })

  it('adds to the state the payload of a ADD_ACTIVITY action', () => {
    const result = activity([], {
      payload: 'foo',
      type: actionTypes.ADD_ACTIVITY,
    })

    expect(result).to.include('foo')
  })

  it('keeps the length of state at 5', () => {
    const result = activity(['bar', 'ber', 'bir', 'bor', 'bur'], {
      payload: 'foo',
      type: actionTypes.ADD_ACTIVITY,
    })

    expect(result).not.to.include('bur')
  })

  it('handles any other actions by returning the current state', () => {
    expect(activity('foo')).to.equal('foo')
  })
})
