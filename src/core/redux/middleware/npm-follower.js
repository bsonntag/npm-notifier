import { addActivity } from 'core/redux/actions'
import NpmFollower from 'core/npm-follower'
import actionTypes from 'core/redux/action-types'

function notifyPackageUpdate(update) {
  let body = update.name + '@' + update.version
  console.log(body)
  let notification = new Notification('NPM Notifier', { body })
}

export default store => next => {
  const npmFollower = NpmFollower()

  npmFollower.onUpdate(update => {
    console.log('npm update')
    notifyPackageUpdate(update)
    store.dispatch(addActivity(update))
  })

  return action => {
    if (action.type === actionTypes.ADD_SUBSCRIPTION) {
      npmFollower.follow(action.payload)
    }

    return next(action)
  }
}
