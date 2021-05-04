import React, { useState, useEffect } from 'react'
// styles
import './Weather.scss'

import { Input, Icon } from 'semantic-ui-react'

// weather icons
import Rain from '../../Images/Weather/rain.svg'
import Cloud from '../../Images/Weather/cloud.svg'
import Snow from '../../Images/Weather/snow.svg'
import Sun from '../../Images/Weather/sun.svg'
import Null from '../../Images/Weather/null.svg'

export default function Weather({setCookie, cookies}) {
  const [query, setQuery] = useState(cookies.location || '')
  const [weather, setWeather] = useState({})

  const getWeather = async e => {
    e.preventDefault();
    try {
      const API_KEY = process.env.REACT_APP_API_KEY
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`)
      const parseData = await res.json()
      setWeather(parseData)
      setCookie("location", query, {
        path: "/"
      })
      setQuery('')

    } catch (error) {
      console.log(error.message)
    }
  }

  const weatherFromCookies = async() => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cookies.location}&units=metric&appid=${API_KEY}`)
      const parseData = await res.json()
      setWeather(parseData)

    } catch (error) {
      console.log(error.message)
    }
  }

  const setWeatherEmpty = () => {
    setWeather({})
    setCookie("location", "", {
      path: "/"
    })
  }

  const date = new Date()

  useEffect(() => {
    weatherFromCookies()
  }, [])

    return (
      <div className="Weather">
        {
          weather.name === undefined
          ? 
           <form onSubmit={(e) => getWeather(e)}>
              <Input
                icon={{ name: 'cloud', circular: true, link: true }}
                placeholder='Enter Location For Weather Info'
                value={query} 
                onChange={e => setQuery(e.target.value)}
              />
            </form>
          :
           <div className="WeatherBox" >
            <ul>
                <li><h4>{weather.name} - {weather.sys.country} </h4></li>
                <li> 
                    {
                      weather.weather[0].main === "Rain" ? <img src={Rain} alt="" /> : <img src={Null} alt=""/> && 
                      weather.weather[0].main === "Clouds" ? <img src={Cloud}alt=""/> : <img src={Null} alt=""/> && 
                      weather.weather[0].main === "Snow" ? <img src={Snow} alt=""/> : <img src={Null} alt=""/> && 
                      weather.weather[0].main === "Clear" ? <img src={Sun} alt=""/> : <img src={Null} alt=""/>               
                    } 
                </li>
                <li><h4>{Math.round(weather.main.temp)}°c | </h4></li>
                <li>
                    {
                        date.getHours() >= 12 ? <h4>{date.getHours()} pm</h4> : null &&
                        date.getHours() <= 12 ? <h4>{date.getHours()} am</h4> : null
                    }
                </li>
                <li><i onClick={setWeatherEmpty} ><Icon name="close" /></i></li>
            </ul>
          </div>
        }
      </div>
    )

}

