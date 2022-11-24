import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=29067faaee787a67dddbd617358b6fa0`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt=5&appid=29067faaee787a67dddbd617358b6fa0`
  const value = data.weather;
  const imgurl = `http://openweathermap.org/img/wn/${
    value ? value[0].icon : null
  }.png`;
  
  // function Forecast(unix) {
  //   var day = new Date(unix).getDay();

  //   var days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];

  //   return days[day];
  // }


  const getLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={getLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="weather-icon">
        {value ? <img src={imgurl} width="120" height="100"></img> : null}
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{Math.round(data.main.temp - 273.15)}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p>Feels Like: {Math.round(data.main.feels_like - 273.15)}°C</p>
            ) : null}
            <div className="humidity">
              {data.main ? <p>Humidity: {data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              {data.main ? (
                <p>Wind Speed: {Math.round(data.wind.speed * 1.60934)}KPH</p>
              ) : null}
            </div>
            <div className="temp-max">
              {data.main ? (
                <p>Max Temp:{Math.round(data.main.temp_max - 273.15)}°C</p>
              ) : null}
            </div>
            <div className="temp-min">
              {data.main ? (
                <p>Min Temp:{Math.round(data.main.temp_min - 273.15)}°C</p>
              ) : null}
            </div>
            <div className="pressure">
              {data.main ? <p>Pressure: {data.main.pressure}mbar</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
