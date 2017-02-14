import React, { Component } from 'react'

class SubscribeForm extends Component {
  state = {
    packageName: '',
  }

  onChange = event => {
    this.setState({ packageName: event.target.value })
  }

  onSubmit = event => {
    const { onSubmit } = this.props
    const { packageName } = this.state

    event.preventDefault()
    onSubmit(packageName)
    this.setState({ packageName: '' })
  }

  submitForm(event) {
    const { onSubmit } = this.props

    event.preventDefault()
  }

  render() {
    const { packageName } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h3>Add a package</h3>

        <label htmlFor='package-input'>
          Package name (or pattern)
        </label>

        <input
          id='package-input'
          name='package'
          onChange={this.onChange}
          type='text'
          value={packageName}
        />

        <button type='submit'>
          Add
        </button>
      </form>
    )
  }
}

export default SubscribeForm
