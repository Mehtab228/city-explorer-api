'use strict';
const axios = require('axios');

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

// this is kept private, not shared with server.js
class WeatherCity {
    constructor(day) {
        this.description = `Low of ${day.low_temp}, high of ${day.high_temp}} with ${day.weather.description}`;
        this.date = day.valid_date;
    }
}

// node export syntax;
module.exports = getWeather;
