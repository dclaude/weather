/*
my appid works with the /forecast end-point
my appid does not work with the /forecast/daily end-point
so I currently use tyler key
*/
// my key:
// const API_KEY = 'dd4014e40ddf98d5843ad5579b6f3474'
// tyler key:
const API_KEY = 'b714ec74bbab5650795063cb0fdf5fbe'
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast/daily?appid=${API_KEY}`

/*
- request
http://api.openweathermap.org/data/2.5/forecast/daily?q=san%20francisco&type=accurate&APPID=b714ec74bbab5650795063cb0fdf5fbe&cnt=5
- response
{
  "city": { "id": 5391959, "name": "San Francisco", "coord": { "lon": -122.4193, "lat": 37.7793 }, "country": "US", "population": 805235 }, "cod": "200", "message": 64.2372764, "cnt": 5, 
  "list": [
    { "dt": 1521748800, "temp": { "day": 277.88, "min": 277.88, "max": 277.88, "night": 277.88, "eve": 277.88, "morn": 277.88 }, "pressure": 1026.9, "humidity": 97, 
      "weather": [ { "id": 800, "main": "Clear", "description": "sky is clear", "icon": "01n" } ], "speed": 4.61, "deg": 293, "clouds": 0 }, 
    { "dt": 1521835200, "temp": { "day": 284.66, "min": 279.2, "max": 284.84, "night": 282.29, "eve": 284.11, "morn": 279.2 }, "pressure": 1027.86, "humidity": 84, 
      "weather": [ { "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" } ], "speed": 4.31, "deg": 227, "clouds": 24, "rain": 2.31 }, 
    { "dt": 1521921600, "temp": { "day": 284.45, "min": 281.04, "max": 284.45, "night": 282.03, "eve": 281.71, "morn": 281.04 }, "pressure": 1023.39, "humidity": 93, 
      "weather": [ { "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" } ], "speed": 3.31, "deg": 226, "clouds": 20, "rain": 2.07 }
    ...
  ]
}
*/
export const fetchWeather = city => {
  const nbDays = 5
  const url = `${ROOT_URL}&q=${city}&type=accurate&cnt=${nbDays}`
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.warn(err)
      return null // promise resolves to null in case of error
    })
}

export const makeResultsByDate = (res, dt) => {
  if (!res) return null
  const filteredList = res.list.filter(dayForecast => {
    return dayForecast.dt === dt
  })
  if (!filteredList || !filteredList.length) return null
  const newRes = { ...res }
  newRes.list = filteredList
  return newRes
}

export const fetchWeatherByDate = (city, dt) => {
  // fake an api end-point which returns the weater for a given date
  return fetchWeather(city).then(res => makeResultsByDate(res, dt))
}

