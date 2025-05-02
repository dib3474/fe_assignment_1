import config from './apikey.js';
const API_KEY = config.TMDB_API_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: API_KEY,
    }
};

const movieSearch = async () => {
    const keyword = document.getElementById('movie_search').value;
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-kr&page=1`;

    try {
        const response = await fetch(url, options);
        const responseJson = await response.json();
        movieAppend(responseJson);
    }
    catch (err) {
        console.log("에러 : " + err);
    }
};

const movieAppend = (data) => {
    document.querySelector('.cards').innerHTML = '';
    const movies = data['results'];
    for (const movie of movies) {
        const movie_img_url = `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`;
        const temp_html = `
            <div class="card" id="detail_${movie.id}">
                <img src="${movie_img_url}" alt="${movie.title}">
                <div class="card_body">
                    <h3>${(movie.title.length < 20) ? movie.title : movie.title.slice(0, 20)}</h6>
                    <p>요약 : ${(movie.overview <= 48) ? movie.overview : movie.overview.slice(0,48)+"..." }
                    <p>평점 : ${movie.vote_average}</p>
                    <p>개봉일 : ${movie.release_date}</p>
                    <a>상세정보</a>
                </div>
            </div>`;
        document.querySelector('.cards').insertAdjacentHTML('beforeend', temp_html);
    }
};

const movieDetailClose = (id) => {
    document.getElementById(`${id}`).style.display = "none";
}

const getMovieDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-kr`;
    try {
        const response = await fetch(url, options);
        const responseJson = await response.json();
        movieDetails(responseJson);
    }
    catch (err) {
        console.log("에러 : " + err);
    }
};

const movieDetails = (data) => {
    const movie = data;
    console.log(movie);
    document.querySelector('.movie_details').innerHTML = '';
    const movie_img_url = `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`;
    const movie_genre = movie.genres.map((genre) => genre.name).join(" / ");
    const temp_html = `
        <div id="${movie.id}" class="modal">
            <div class="modal_body">
                <div class="modal_close">❌</div>
                <div class="modal_content">
                    <div class="modal_movie_img"><img src="${movie_img_url}"></div>
                    <div class="modal_movie_content">
                        <h3>${movie.title}</h3>
                        <p>언어 : ${movie.spoken_languages[0].name.toUpperCase()}</p>
                        <p>장르 : ${movie_genre}</p>
                        <p class="modal_movie_content_overview">${(movie.overview.length < 260) ? movie.overview : (movie.overview.slice(0, 260) + '...')}</p>
                        <p>평점 : ${movie.vote_average} / ${movie.vote_count}명 평가</p>
                        <p>개봉일 : ${movie.release_date}</p>
                    </div>
                </div>
            </div>
        </div>`;
    document.querySelector('.movie_details').insertAdjacentHTML('beforeend', temp_html);
};
    

const bookmark = () => {

};

document.querySelector('#search_btn').addEventListener('click', movieSearch);

document.querySelector('.cards').addEventListener('click', (e) => {
    if (e.target.matches('a')) {
        const card = e.target.closest('.card');
        if (card) {
            const cardId = card.id.split("_")[1];
            getMovieDetails(cardId);
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