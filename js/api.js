import { config } from './apikey.js';
const API_KEY = config.API_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: API_KEY,
    }
};

const getMovieSearch = async (keyword) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-kr&page=1`;

    try {
        const response = await fetch(url, options);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (err) {
        console.log("에러 : getMovie API요청 실패 | " + err);
    }
};

const getMovieDetail = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-kr`;
    try {
        const response = await fetch(url, options);
        const responseJson = await response.json();
        return responseJson;
    }
    catch (err) {
        console.log("에러 : getMovieDetail API요청 실패 | " + err);
    }
};

export {getMovieSearch, getMovieDetail}