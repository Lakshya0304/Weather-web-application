import React, { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const [city, setcity] = useState("");
  const [search, setsearch] = useState("");
  const [country, setcountry] = useState("");

  const [weather, setweather] = useState([]);
  const [cheak, setcheak] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=3d7fe4a872ee4e5a5eac3662323abc31`
        );
      const data = await res.json();
      setcity(data.main);
      setweather(data.weather);
    };

    getdata();
  }, [search, cheak]);

  const handelonclick = () => {
    setcheak(true);
  };

  function weathersign() {
    if (city?.temp < 5) {
      return <i className="fas fa-snowflake"></i>;
    } else if (city?.temp <= 10) {
      return <i className="fas fa-mitten"></i>;
    } else if (city.temp > 10 && city?.temp < 30) {
      return <i className="fas fa-cloud"></i>;
    } else if (city?.temp >= 30 && city?.temp < 35) {
      return <i className="fas fa-cloud-sun"></i>;
    } else if (city?.temp > 35) {
      return <i className="fas fa-sun"></i>;
    }
  }

  return (
    <>
      <div className={"whole"}>
        <div className="container">
          <div className="upper_container">
            <input
              type="text"
              className="make_good"
              placeholder="City"
              value={search}
              onChange={(event) => {
                console.log(event.target.value);
                setsearch(event.target.value);

                if (cheak === true) {
                  setcheak(false);
                }
              }}
            />

            <input
              type="text"
              className="make_good"
              placeholder="Country"
              value={country}
              onChange={(event) => {
                setcountry(event.target.value);
                if (cheak === true) {
                  setcheak(false);
                }
              }}
            />

            <input
              type="button"
              value="Get WEATHER"
              className="btn"
              onClick={handelonclick}
            />
          </div>

          {cheak === false && city !== "Undefined" ? (
            ""
          ) : (
            <div className="lower_container">
              <h1 className="city">{search}</h1>

              <h1 className="country ">{country}</h1>
              <div className="logo">{weathersign()}</div>

              <div className="temperature">
                <div className="temperature_heading">
                  <span>Temp</span>

                  <i className="fas fa-thermometer-full"></i>
                </div>
                {city?.temp}°C
              </div>
              <div className="diff_temp">
                <div className="max_temp">
                  <span>
                    Max Temp<i className="fas fa-temperature-high"></i>
                  </span>

                  <span className="max_heading">{city?.temp_max}°C</span>
                </div>
                <div className="max_temp">
                  <span>
                    Min Temp<i className="fas fa-temperature-low"></i>
                  </span>
                  <span className="max_heading">{city?.temp_min}°C</span>
                </div>
              </div>
              <div className="pressure">
                <div className="max_temp">
                  <span>Pressure</span>
                  <span className="max_heading">{city?.pressure}</span>
                </div>
                <div className="max_temp">
                  <span>Humidity</span>
                  <span className="max_heading">{city?.humidity}</span>
                </div>
              </div>
              <div className="description">{weather[0]?.main}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
