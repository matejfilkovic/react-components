import React from 'react'
import PropTypes from 'prop-types'

export default function withHistoryStateParameterCheck(
  Component,
  parameterName,
  redirectionRoute
) {
  class WithHistoryStateParameterCheck extends React.Component {
    componentDidMount() {
      if (!this.getParameterFromHistoryState()) {
        this.props.history.push(redirectionRoute)
      }
    }

    getParameterFromHistoryState() {
      const { location } = this.props

      return location.state && location.state[parameterName]
    }

    render() {
      return (
        <Component
          {...this.props}
          {...{ [parameterName]: this.getParameterFromHistoryState() }}
        />
      )
    }
  }

  WithHistoryStateParameterCheck.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  return WithHistoryStateParameterCheck
}
