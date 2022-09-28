'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
// load data
const data = require('./data/data.json')
// start our server
const app = express();
// Middleware
// The app.use() function is used to mount the speciefied middleware function  at the path which is being specified
app.use(cors());
//declare our port variable
const PORT = process.env.PORT || 3001;
//listening for connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

class WeatherForecast {
    constructor(date, h, l) {
        this.description = `Low of ${l}, high of ${h} with broken clouds`
        this.date = date;
    }
}

//endpoints:

app.get('/', (req, res) => {
    res.send('Hello from the home route!')
});

app.get('/weather', (req, res) => {
    const query = req.query.searchQuery;
    const weatherData = data.find(v => v.city_name === query);
    res.send(weatherData.data.map(v => new WeatherForecast(v.datetime, v.high_temp, v.low_temp)))
});


//catch all endpoints:
app.get('*', (req, res) => {
    res.status(404).send('Page Not Found')
})
