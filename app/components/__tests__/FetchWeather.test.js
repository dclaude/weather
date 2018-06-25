import React from 'react'
import ReactDOM from 'react-dom'
import FetchWeather from '../FetchWeather'

const fetchTest = results => {
  const node = document.createElement('div');
  let fetchCalled = false
  ReactDOM.render(<FetchWeather
    render={() => null}
    fetch={() => {
      fetchCalled = true
      return Promise.resolve({})
    }}
    results={results}
    />, 
    node)
  return fetchCalled
}

test('FetchWeather does fetch() from network when there is no results prop', () => {
  expect(fetchTest(null)).toBe(true)
})

test('FetchWeather does not fetch() from network when there is a results prop', () => {
  expect(fetchTest({})).toBe(false)
})

