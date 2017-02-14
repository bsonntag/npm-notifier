import { forEach } from 'lodash'
import storage from 'electron-json-storage'

export const getInitialState = () => {
  return new Promise((resolve, reject) => {
    storage.getAll((error, data) => {
      if (error) reject(error)
      else resolve(data)
    })
  })
}

export default (keys = []) => store => next => action => {
  const result = next(action)

  const state = store.getState()

  forEach(state, (value, key) => {
    if (keys.includes(key)) {
      storage.set(key, value)
    }
  })

  return result
}
