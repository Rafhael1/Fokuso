import React, {useState} from 'react'

// styles
import './Weather.scss'

// weather icons
import Rain from '../../Images/Weather/rain.svg'
import Cloud from '../../Images/Weather/cloud.svg'
import Snow from '../../Images/Weather/snow.svg'
import Sun from '../../Images/Weather/sun.svg'
import Null from '../../Images/Weather/null.svg'

export default function Weather() {

  const [query,
    setQuery] = useState('')
  const [weather,
    setWeather] = useState({})

  const getWeather = async e => {
    e.preventDefault();
    try {
      const API_KEY = "0706c4346ca9edfcd261838ded79fd6c"
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`)

      const parseData = await res.json()
      console.log(parseData)
      setWeather(parseData)

    } catch (error) {
      console.log(error.message)
    }
  }

  const date = new Date()
  console.log(date.getHours())

  return (
    <div className="Weather">
      {
      weather.name === undefined
        ? 
         <form onSubmit={(e) => getWeather(e)}>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
            <button>Submit</button>
          </form>
        :
         <div className="WeatherBox" >
          <ul>
              <li><h4>{weather.name} - {weather.sys.country} </h4></li>
              <li> 
                  {
                    weather.weather[0].main === "Rain" ? <img src={Rain}/> : <img src={Null}/> && 
                    weather.weather[0].main === "Clouds" ? <img src={Cloud}/> : <img src={Null}/> && 
                    weather.weather[0].main === "Snow" ? <img src={Snow}/> : <img src={Null}/> && 
                    weather.weather[0].main === "Sun" ? <img src={Sun}/> : <img src={Null}/>               
                  } 
              </li>
              <li><h4>{Math.round(weather.main.temp)}°c |</h4></li>
              <li>
                  {
                      date.getHours() >= 12 ? <h4>{date.getHours()} pm</h4> : null &&
                      date.getHours() <= 12 ? <h4>{date.getHours()} am</h4> : null
                  }
              </li>
          </ul>
        </div>
}
    </div>
  )
}
