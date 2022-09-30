'use strict';
const axios = require('axios');
const cache = require('./cache.js');

async function getWeather(req, res) {
    const query = req.query.searchQuery;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.WEATHER_API_KEY}`;
    try {
        const key = query + 'weather'
        if (cache[key] && (Date.now() - cache[key].timeStamp < 860000000)) {
            console.log('Cache was hit, weather is present')
            res.status(200).send(cache[key].data)
        } else {
            const weatherResponse = await axios.get(url);
            const weatherArray = weatherResponse.data.data.map(weatherCity => new WeatherCity(weatherCity));
            cache[key] = {
                timeStamp: Date.now(),
                data: weatherArray,
            }
            console.log('Cache is', cache)
            res.status(200).send(weatherArray);
        }
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
