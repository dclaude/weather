import React from 'react'
import PropTypes from 'prop-types'

class FetchWeather extends React.Component {
  makeInitialState() {
    return {
      results: null,
      loading: true,
      error: null,
    }
  }
  state = this.makeInitialState()
  fetchData = props => {
    const { fetch: fetchFunc, results } = props
    // do not fetch from network if results is provided in the props
    if (results) {
      this.setState({
        loading: false,
        results,
      })
      return
    }
    fetchFunc()
      .then(results => {
        if (!results) {
          this.setState({
            error: 'Looks like there was an error with openweathermap api',
            loading: false,
          })
          return
        }
        if (results.cod !== '200') {
          this.setState({
            error: results.message,
            loading: false,
          })
          return
        }
        this.setState({
          results,
          loading: false,
        })
      })
  }
  componentDidMount() {
    this.fetchData(this.props)
  }
  /*
  - use of componentWillReceiveProps() to re-fetch the data from the network
  because a component is not unmount/mount when an url parameter changes
  - the value of the 'fetch' prop/callback provided by the parent must change when an url parameter changes
  (this will be the case if for instance the location/match props of the parent are captured by the 'fetch' callback)
  this way when an url parameter changes, componentWillReceiveProps() will trigger a new network fetch
  */
  componentWillReceiveProps(nextProps) {
    const { fetchOnWillReceiveProps } = nextProps
    this.setState(this.makeInitialState()) // in case this.state.error is not empty
    if (fetchOnWillReceiveProps) {
      this.fetchData(nextProps)
    }
  }
  render() {
    const { loading, error, results } = this.state
    const { render: renderFunc } = this.props
    if (loading) {
      return <div className='FetchWeather-msg'>Loading...</div>
    }
    if (error) {
      return (
        <div>
          <p className='FetchWeather-msg'>{error}</p>
        </div>
      )
    }
    if (!results)
      return null
    return renderFunc(results)
  }
}

FetchWeather.propTypes = {
  render: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  results: PropTypes.object,
  fetchOnWillReceiveProps: PropTypes.bool,
}

FetchWeather.defaultProps = {
  fetchOnWillReceiveProps: true,
}

export default FetchWeather

