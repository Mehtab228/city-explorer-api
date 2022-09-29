'use strict';
const axios = require('axios');


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

module.exports = getMovies;