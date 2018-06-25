import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

class WeatherInput extends React.Component {
  state = {
    city: '',
    search: '',
  }
  handleSubmit = e => {
    e.preventDefault()
    const { city } = this.state
    const search = `?city=${city}`
    /*
    IMPORTANT
    do not call history.push() which is "imperative" programming
    instead use "declarative" programming by creating a state transition (using this.state.search)
    and then use <Redirect> in the render() method
    */
    this.setState({ search, city: '' })
  }
  render() {
    const { column } = this.props
    const { city, search } = this.state
    if (search) {
      // the 'push' prop is needed otherwise <Redirect> replaces the current entry in the history
      return <Redirect push to={{ pathname: '/forecast', search }} />
    }
    return (
      <div>
        <form className={column ? 'WeatherInput-column' : 'WeatherInput-row' } onSubmit={e => this.handleSubmit(e)}>
          <input
            className='WeatherInput-input'
            type='text'
            placeholder='St. George, Utah'
            value={city}
            onChange={e => this.setState({ city: e.target.value })}
          />
          <button className='btn'>Get Weather</button>
        </form>
      </div>
    )
  }
  componentDidUpdate() {
    const { search } = this.state
    if (search) {
      this.setState({ search: '' })
    }
  }
}

WeatherInput.propTypes = {
  column: PropTypes.bool,
}

WeatherInput.defaultProps = {
  column: false,
}

export default WeatherInput

