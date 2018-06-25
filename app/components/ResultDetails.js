import React from 'react'
import { parse as queryStringParse } from 'query-string'
import { fetchWeatherByDate } from '../utils/api'
import FetchWeather from './FetchWeather'
import WeatherHeader from './WeatherHeader'

const Temp = ({ label, kelvin }) => {
  const celsius = Math.round(kelvin - 273.15)
  return <p>{label}: {celsius} ℃</p>
}

class ResultDetails extends React.Component {
  render() {
    const { location, match } = this.props
    return (
      <FetchWeather
        results={location.state ? location.state.results : null}
        fetch={() => {
          const { city } = match.params
          const query = queryStringParse(location.search)
          return fetchWeatherByDate(city, query.dt)
        }}
        render={
          results => {
            const forecast = results.list[0]
            const weather = forecast.weather[0]
            const temp = forecast.temp
            return (
              <div className='ResultDetails'>
                <WeatherHeader icon={weather.icon} dt={forecast.dt} />
                <p>{results.city.name}</p>
                <p>{weather.description}</p>
                <Temp label='min temp' kelvin={temp.min} />
                <Temp label='max temp' kelvin={temp.max} />
                <p>humidity: {forecast.humidity}</p>
              </div>
            )
          }
        }
      />
    )
  }
}

export default ResultDetails

