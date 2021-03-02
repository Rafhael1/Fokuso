import React, { Component } from 'react'

// styles
import './Weather.scss'

import { Input, Icon } from 'semantic-ui-react'

// weather icons
import Rain from '../../Images/Weather/rain.svg'
import Cloud from '../../Images/Weather/cloud.svg'
import Snow from '../../Images/Weather/snow.svg'
import Sun from '../../Images/Weather/sun.svg'
import Null from '../../Images/Weather/null.svg'


export default class Weather extends Component {

  state = {
    query: '',
    weather: {},
  }

   getWeather = async e => {
    e.preventDefault();
    try {
      const API_KEY = process.env.REACT_APP_API_KEY
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&units=metric&appid=${API_KEY}`)

      const parseData = await res.json()
      this.setState({weather: parseData})

    } catch (error) {
      console.log(error.message)
    }
  }

  setWeatherEmpty = () => {
    this.setState({weather: {}})
  }


  render() {

    const date = new Date()

    return (
      <div className="Weather">
        {
        this.state.weather.name === undefined
          ? 
           <form onSubmit={(e) => this.getWeather(e)}>
              <Input
                icon={{ name: 'search', circular: true, link: true }}
                size="mini"
                placeholder='Enter Location For Weather Info'
                value={this.state.query} 
                onChange={e => this.setState({query: e.target.value})}
              />
            </form>
          :
           <div className="WeatherBox" >
            <ul>
                <li><h4>{this.state.weather.name} - {this.state.weather.sys.country} </h4></li>
                <li> 
                    {
                      this.state.weather.weather[0].main === "Rain" ? <img src={Rain} alt="" /> : <img src={Null} alt=""/> && 
                      this.state.weather.weather[0].main === "Clouds" ? <img src={Cloud}alt=""/> : <img src={Null} alt=""/> && 
                      this.state.weather.weather[0].main === "Snow" ? <img src={Snow} alt=""/> : <img src={Null} alt=""/> && 
                      this.state.weather.weather[0].main === "Sun" ? <img src={Sun} alt=""/> : <img src={Null} alt=""/>               
                    } 
                </li>
                <li><h4>{Math.round(this.state.weather.main.temp)}°c | </h4></li>
                <li>
                    {
                        date.getHours() >= 12 ? <h4>{date.getHours()} pm</h4> : null &&
                        date.getHours() <= 12 ? <h4>{date.getHours()} am</h4> : null
                    }
                </li>
                <li><i onClick={this.setWeatherEmpty} ><Icon name="close" size="small" /></i></li>
            </ul>
          </div>
        }
      </div>
    )
  }
}
