'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
// load data
const data = require('./data/data.json')
// dont need this if you use modules because you're importing it in modules unless you still need to use axios on server.js
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
// put realtive file path with ./ in the beginning
const getWeather = require('./modules/getWeather.js');
const getMovies = require('./modules/getMovies.js')

//endpoints:

app.get('/', (req, res) => {
    res.send('Hello from the home route!')
});



app.get('/weather', getWeather);

app.get('/movies', getMovies);


//catch all endpoints:
app.get('*', (req, res) => {
    res.status(404).send('Page Not Found')
})

