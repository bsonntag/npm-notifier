import { Provider } from 'react-redux'
import App from 'containers/app'
import React from 'react'
import ReactDom from 'react-dom'
import createStore from 'core/redux/store'

createStore()
  .then(store => {
    ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    )
  })
