import {getMovieSearch, getMovieDetail} from './api.js'
import {movieDetailClose, movieAppend, movieDetailAppend} from './ui.js'

const movieSearch = async() => {
    const keyword = document.getElementById('movie_search').value;
    const movieSearchData = await getMovieSearch(keyword);
    movieAppend(movieSearchData);
}

const movieDetail = async(id) => {
    const movieDetailData = await getMovieDetail(id);
    movieDetailAppend(movieDetailData);
}


document.querySelector('#search_btn').addEventListener('click', movieSearch);

document.querySelector('.cards').addEventListener('click', (e) => {
    if (e.target.matches('a')) {
        const card = e.target.closest('.card');
        if (card) {
            const cardId = card.id.split("_")[1];
            movieDetail(cardId);
        }
        else { console.log("에러 : Card EventListener")}
    }
});

document.querySelector('.movie_details').addEventListener('click', (e) => {
    if(e.target.matches('.modal_close')) {
        const modal = e.target.closest('.modal');
        if(modal) {
            movieDetailClose(modal.id);
        }
        else { console.log("에러 : Modal EventListener") };
    };
});