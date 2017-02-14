import * as actions from 'core/redux/actions'
import * as selectors from 'core/redux/selectors'
import { connect } from 'react-redux'
import React from 'react'
import SubscribeForm from 'components/subscribe-form'
import SubscribedPackages from 'components/subscribed-packages'

const App = props => (
  <div>
    <h1>NPM Notifier</h1>

    <SubscribedPackages
      subscribedPackages={props.subscribedPackages}
      unsubscribe={props.unsubscribe}
    />

    <SubscribeForm
      onSubmit={props.subscribe}
    />
  </div>
)

const mapStateToProps = state => ({
  subscribedPackages: selectors.getSubscriptions(state),
})

const mapDispatchToProps = {
  subscribe: actions.addSubscription,
  unsubscribe: actions.removeSubscription,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
