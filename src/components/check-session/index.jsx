import React from 'react'
import PropTypes from 'prop-types'

export default class CheckSession extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessionCheckingInProgress: true
    }
  }
  componentDidMount() {
    const {
      history,
      getSession
    } = this.props

    // Try to obtain a session.
    return (
      getSession()
        .then((redirectionRoute) => {
          history.push(redirectionRoute)
        })
        .catch(() => this.setState({ sessionCheckingInProgress: false }))
    )
  }
  render() {
    const {
      children,
      renderLoader
    } = this.props

    const { sessionCheckingInProgress } = this.state

    if (sessionCheckingInProgress) return renderLoader()

    return children
  }
}

CheckSession.propTypes = {
  getSession: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  renderLoader: PropTypes.func
}

CheckSession.defaultProps = {
  renderLoader: () => null
}
