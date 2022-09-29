'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
// load data
const data = require('./data/data.json')
const axios = require('axios');
// start our server
const app = express();
// Middleware
// The app.use() function is used to mount the speciefied middleware function  at the path which is being specified
app.use(cors());
//declare our port variable
const PORT = process.env.PORT || 3001;
//listening for connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));



//endpoints:

app.get('/', (req, res) => {
    res.send('Hello from the home route!')
});



app.get('/weather', getWeather);
async function getWeather(req, res) {
    const query = req.query.searchQuery;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherResponse = await axios.get(url);
        const weatherArray = weatherResponse.data.data.map(weatherCity => new WeatherCity(weatherCity));
        res.status(200).send(weatherArray);
    } catch (error) {
        console.log(`error message is: `, error);
        response.status(500).send(`server error ${error}`);
     }
}

app.get('/movies', getMovies);
async function getMovies(req, res) {
    const query = req.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.MOVIE_API_KEY}`;
    try {
        const movieResponse = await axios.get(url);
        const moviesArray = movieResponse.data.results.map(movieCity => new MovieCity(movieCity));
        res.status(200).send(moviesArray);
    } catch (error) {
        console.log(`error message is: `, error);
        response.status(500).send(`server error ${error}`);
    }

}

//catch all endpoints:
app.get('*', (req, res) => {
    res.status(404).send('Page Not Found')
})

class WeatherCity {
    constructor(day) {
        this.description = `Low of ${day.low_temp}, high of ${day.high_temp}} with ${day.weather.description}`;
        this.date = day.valid_date;
    }
}

class MovieCity {
    constructor(obj) {
        (this.title = obj.title),
        (this.overview = obj.overview),
        (this.average_votes = obj.vote_average),
        (this.total_votes = obj.vote_count),
        (this.image_url = 'https://image.tmdb.org/t/p/w500' + obj.poster_path),
        (this.popularity = obj.popularity),
        (this.released_on = obj.release_date);
    }
}
