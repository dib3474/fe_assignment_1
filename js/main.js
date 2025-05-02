import {getMovieSearch, getMovieDetail} from './api.js'
import {movieDetailClose, movieAppend, movieDetailAppend, displayHome, displayBookmark, bookmarkAppend, loadBookMarks, deleteBookmark} from './ui.js'

// Bookmark Event
displayHome()
document.querySelector('#home').addEventListener('click', displayHome);
document.querySelector('#bookmark').addEventListener('click', displayBookmark);

loadBookMarks();

const saveBookmark = async(id) => {
    const movieDetailData = await getMovieDetail(id);
    bookmarkAppend(movieDetailData);
    loadBookMarks();
}

document.querySelector('.movie_details').addEventListener('click', (event) => {
    if(event.target.matches('.modal_bookmark')) {
        const modal = event.target.closest('.modal');
        if(modal) {
            saveBookmark(modal.id);
        }
        else { console.log("에러 : saveBookmark EventListener") };
    };
});

document.querySelector('.bookmarks').addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        const card = event.target.closest('.card');
        if (card) {
            const cardId = card.id.split("_")[1];
            deleteBookmark(cardId);
            alert("영화를 북마크에서 삭제했습니다!")
        }
        else { console.log("에러 : Card EventListener")}
    }
});

// Modal Event
const movieDetail = async(id) => {
    const movieDetailData = await getMovieDetail(id);
    movieDetailAppend(movieDetailData);
}

document.querySelector('.movie_details').addEventListener('click', (event) => {
    if(event.target.matches('.modal_close')) {
        const modal = event.target.closest('.modal');
        if(modal) {
            movieDetailClose(modal.id);
        }
        else { console.log("에러 : Modal EventListener") };
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
})

document.querySelector('.cards').addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        const card = event.target.closest('.card');
        if (card) {
            const cardId = card.id.split("_")[1];
            movieDetail(cardId);
        }
        else { console.log("에러 : Card EventListener")}
    }
});