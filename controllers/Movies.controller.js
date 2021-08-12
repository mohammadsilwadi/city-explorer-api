
'use strict';
const axios = require('axios');
const Movie = require('../models/Movies.modle');
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Cache=require('../helpers/Cache.helper')
const moviesCache= new Cache();
//http://localhost:3005/movies?api_key=ac87ff519ed5f6d1bd339aa22897c0f4&city=amman
const movieController = (req, res) => {
  let city_name = req.query.city;
  if (moviesCache.moviesDate){
  res.json({message:'data from cache',data:moviesCache.moviesDate})}
  else{
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city_name}`;
  axios.get(url).then((Response) => {
    let data = Response.data.results.map((movie) => {
      return new Movie(movie);
    });
    moviesCache.moviesDate=data;
    res.json(data);
  })
    .catch((error) => {
      res.send(error.message);
    });
  }
}
module.exports = movieController;