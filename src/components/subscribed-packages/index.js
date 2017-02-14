import { map, noop } from 'lodash'
import React from 'react'

const handleClick = (subscribedPackage, unsubscribe) => event => {
  event.preventDefault()
  unsubscribe(subscribedPackage)
}

const renderSubscribedPackage = unsubscribe => subscribedPackage => (
  <li
    onClick={handleClick(subscribedPackage, unsubscribe)}
    key={subscribedPackage}
  >
    {subscribedPackage}
  </li>
)

const SubscribedPackages = ({ subscribedPackages = [], unsubscribe = noop }) => (
  <div>
    <h2>Subscribed packages</h2>

    <ul>
      {map(subscribedPackages, renderSubscribedPackage(unsubscribe))}
    </ul>
  </div>
)

export default SubscribedPackages
