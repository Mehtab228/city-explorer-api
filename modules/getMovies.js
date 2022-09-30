'use strict';
const axios = require('axios');
const cache = require('./cache.js');


async function getMovies(req, res) {
    const query = req.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.MOVIE_API_KEY}`;
    try {
        const key = query + 'movie'
        //If the key exists in cache AND is valid then send THAT data from cache
        if (cache[key] && (Date.now() - cache[key].timeStamp < 10000000000)) {
            console.log('Cache was hit, movies are present')
            res.status(200).send(cache[key].data)
        } else {
            const movieResponse = await axios.get(url);
            const moviesArray = movieResponse.data.results.map(movieCity => new MovieCity(movieCity));
            //save to cache
            cache[key] = {
                timeStamp: Date.now(),
                data: moviesArray,
            }
            console.log('Cache is', cache)
            res.status(200).send(moviesArray);

        }

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