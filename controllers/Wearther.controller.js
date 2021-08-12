'use strict';
const axios = require('axios');
const Forecast = require('../models/Weather.modle');
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

//http://localhost:3005/weather?key=f6bf7b2e2cd542a5b53fa227f54b0bde&lon= 35.94503
const weatherController = (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  axios.get(weatherBitUrl).then((Response) => {
    console.log(Response)
    let weatherData = Response.data.data.map((element) => {
      return new Forecast(element.weather.description,
        element.datetime,
        element.app_min_temp,
        element.app_max_temp);
    });
    res.json(weatherData);

  })
    .catch((error) => {
      res.send(error.message);
    });


};

module.exports = weatherController;