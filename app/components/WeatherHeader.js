import React from 'react'
import PropTypes from 'prop-types'

const iconNames = [ '01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n' ]
const icons = iconNames.reduce((acc, icon) => {
  acc[icon] = require(`../images/weather-icons/${icon}.svg`)
  return acc
}, {})

const WeatherHeader = ({ icon, dt }) => {
  const date = new Date(0)
  date.setUTCSeconds(dt)
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  return (
    <div className='WeatherHeader-container'>
      <img className='WeatherHeader-img' src={`${icons[icon]}`} alt='Weather icon' />
      <h2 className='WeatherHeader-header'>{date.toLocaleDateString(undefined, options)}</h2>
    </div>
  )
}

WeatherHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  dt: PropTypes.number.isRequired,
}

export default WeatherHeader

