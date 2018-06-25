import React from 'react'
import WeatherInput from './WeatherInput'
import Pattern from '../images/pattern.svg'

const Main = () => {
  return (
    <div className='Main' style={{ backgroundImage: `url(${Pattern})` }}>
      <h1 className='Main-header'>Enter a City and State</h1>
      <WeatherInput column={true} />
    </div>
  )
}

export default Main

