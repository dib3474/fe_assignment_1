import { getMovieSearch, getMovieDetail } from './api.js'
import { displayHome, displayBookmark, readBookMarks, movieAppend, movieDetailClose, movieDetailAppend } from './ui.js'
import {createBookmark, deleteBookmark} from './utility.js';

// Bookmark Event
displayHome()
readBookMarks();

document.querySelector('#home').addEventListener('click', displayHome);
document.querySelector('#bookmark').addEventListener('click', displayBookmark);

const saveBookmark = async(id) => {
    const movieDetailData = await getMovieDetail(id);
    createBookmark(movieDetailData);
}

document.querySelector('.movie_details').addEventListener('click', (event) => {
    if(event.target.matches('.modal_bookmark')) {
        const modal = event.target.closest('.modal');
        if(modal) {
            saveBookmark(modal.id);
            readBookMarks();
        }
        else { console.log("에러 : saveBookmark EventListener 없음") };
    };
});

document.querySelector('.bookmarks').addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        const card = event.target.closest('.card');
        if (card) {
            const cardId = card.id.split("_")[1];
            deleteBookmark(cardId);
            readBookMarks();
        }
        else { console.log("에러 : deleteBookmark EventListener 없음")}
    }
});

// Modal Event
const movieDetailOpen = async(id) => {
    const movieDetailData = await getMovieDetail(id);
    movieDetailAppend(movieDetailData);
}

document.querySelector('.cards').addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        const card = event.target.closest('.card');
        if (card) {
            const cardId = card.id.split("_")[1];
            movieDetailOpen(cardId);
        }
        else { console.log("에러 : movieDetailOpen EventListener 없음")}
    }
});

document.querySelector('.movie_details').addEventListener('click', (event) => {
    if(event.target.matches('.modal_close')) {
        const modal = event.target.closest('.modal');
        if(modal) {
            movieDetailClose(modal.id);
        }
        else { console.log("에러 : movieDetailClose EventListener 없음") };
    };
});

// Search Event
const movieSearch = async() => {
    const keyword = document.getElementById('movie_search').value;
    if (keyword === "") {
        alert("영화 제목을 입력해주세요!");
        return ;
    }
    const movieSearchData = await getMovieSearch(keyword);
    if (movieSearchData.total_results === 0) {
        alert("검색 결과가 없습니다. 다른 영화 제목을 검색해 주세요!")
        return ;
    }
    movieAppend(movieSearchData);
}

document.querySelector('#search_btn').addEventListener('click', movieSearch);
document.querySelector('#movie_search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        movieSearch();
    }
});