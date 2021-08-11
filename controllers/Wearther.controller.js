'use strict';
const Forecast=require('../models/Weather.modle');
const weather = require("../data/weather.json");

const weatherController= (req, res) => {
    let lon = Number(req.query['lon']);
    let lat = Number(req.query['lat']);
    let searchQuery = '';
    if (req.query['q']) {
        searchQuery = req.query['q'];
    }
    const searchResult = weather.find((item) => {
        return (item.city_name.toLowerCase() === searchQuery.toLowerCase() ||
            item.lat === lat ||
            item.lon === lon)
    })
    console.log(typeof lon);
    const cleanedData = []
    searchResult.data.forEach(item => {
        let cityData = new Forecast(item);
        cleanedData.push(cityData);
    })
    res.send(cleanedData);
};
module.exports=weatherController;