const express = require('express');
const app = express();
const cors = require('cors');
const weatherData = require('./data/weather.json')
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
const axios = require('axios');
app.get ('/',(req,res)=>{
    res.send('backend');
})
//localhost:8000/weather?searchQuery=Amman
app.get('/weather', (req, res) => {
   
    let city = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;
    try{
        
        let findCity = weatherData.find((element)=>{
            if (element.city_name === city){
                return element;
            }
        })    

        if(findCity!==undefined){
           
            let retObject= {
                city: findCity.city_name,
                lon:findCity.lon,
                lat:findCity.lat
            }
            res.status(200).send(retObject);
        }else if(findCity===undefined){
            res.send(`cant found ${city} use (Amman,Paris,Seattle)` );
        }
    }catch{
        let err = {
            error:`cant found ${city} use (Amman,Paris,Seattle)`
        }
            res.status(404).send(err)
    }
})
class forcast {
    constructor(object) {
        this.date=object.valid_date;
        this.description=object.weather.description;
    }
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}); // kick start the express server to work
