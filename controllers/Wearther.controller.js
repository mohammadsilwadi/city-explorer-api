'use strict';
const axios = require('axios');
const Forecast = require('../models/Weather.modle');
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Cache=require('../helpers/Cache.helper')
const weatheCache= new Cache();
//http://localhost:8000/weather?key=81800f30dd4e4fc4801159eab53edc25&lat=31.95522&lon= 35.94503
const weatherController = (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  if (weatheCache.weathersData){
    res.json({message:'data from cache',data:weatheCache.weathersData})}
    else{
  const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  axios.get(weatherBitUrl).then((Response) => {
    console.log(Response)
    let weatherData = Response.data.data.map((element) => {
      return new Forecast(element.weather.description,
        element.datetime,
        element.app_min_temp,
        element.app_max_temp);
    });
    weatheCache.weathersData=weatherData;
    res.json(weatherData);
  })
    .catch((error) => {
      res.send(error.message);
    });
  }

};

module.exports = weatherController;