import React from 'react'
import PropTypes from 'prop-types'

export default class Protected extends React.Component {
  componentDidMount() {
    const {
      isAuthenticated,
      history,
      getSession
    } = this.props

    /**
     * If user isn't authenticated, try
     * to obtain a session. If this fails
     * redirect to login.
     */
    if (!isAuthenticated) {
      return (
        getSession()
          .catch(() => history.push('/'))
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    // If user signs out, redirect to login.
    if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render() {
    const {
      isAuthenticated,
      children
    } = this.props

    if (isAuthenticated) {
      return <div>{children}</div>
    }

    return null
  }
}

Protected.propTypes = {
  getSession: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}
