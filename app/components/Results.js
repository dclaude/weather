import React from 'react'
import { Link } from 'react-router-dom'
import FetchWeather from './FetchWeather'
import { fetchWeather, makeResultsByDate } from '../utils/api'
import { parse as queryStringParse } from 'query-string'
import WeatherHeader from './WeatherHeader'

class Results extends React.Component {
  render() {
    const { location } = this.props
    return (
      <div>
        <FetchWeather
          fetch={() => {
            const query = queryStringParse(location.search)
            return fetchWeather(query.city)
          }}
          render={
            results => {
              return (
                <div>
                  <h1 className='Results-header'>{results.city.name}</h1>
                  <ul className='Results-container'>
                    {results.list.map(forecast => {
                      const { dt, weather } = forecast
                      const icon = weather[0].icon
                      return (
                        <Link key={dt} className='Results-link' to={{
                          pathname: `/details/${results.city.name}`,
                          search: `?dt=${dt}`,
                          state: { results: makeResultsByDate(results, dt) }, // will be null if the url is bookmarked
                        }}>
                          <li>
                            <WeatherHeader icon={icon} dt={dt} />
                          </li>
                        </Link>
                      )
                    })}
                  </ul>
                </div>
              )
            }
          }
        />
      </div>
    )
  }
}

export default Results

