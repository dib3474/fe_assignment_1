import config from './apikey';

const TMDB_API_KEY = config.TMDB_API_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: TMDB_API_KEY
    }
};

const movieSearch = async () => {
    const keyword = document.getElementById('movie_search').value;
    url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-kr&page=1`;
    try {
        const response = await fetch(url, options);
        const responseJson = await response.json();
        movieAppend(responseJson);
        movieDetails(responseJson);
    }
    catch (err) {
        console.log(err);
    }
};

const movieAppend = (data) => {
    document.querySelector('.cards').innerHTML = '';
    const movies = data['results'];
    for (const movie of movies) {
        const movie_img_url = `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`;
        const temp_html = `
            <div class="card">
                <img src="${movie_img_url}" alt="${movie.title}">
                <div class="card_body">
                    <h3>${(movie.title.length < 20) ? movie.title : movie.title.slice(0,20)}</h6>
                    <p>평점 : ${movie.vote_average}</p>
                    <p>개봉일 : ${movie.release_date}</p>
                    <a onclick="movieDetailOpen(${movie.id})" href="#">상세정보</a>
                </div>
            </div>`;
        document.querySelector('.cards').insertAdjacentHTML('beforeend', temp_html);
    }
};

const movieDetailOpen = (id) => {
    document.getElementById(`${id}`).style.display = "";
}

const movieDetailClose = (id) => {
    document.getElementById(`${id}`).style.display = "none";
}

const movieDetails = (data) => {
    document.querySelector('.movie_details').innerHTML = '';
    const movies = data['results'];
    for (const movie of movies) {
        const movie_img_url = `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`;
        const temp_html = `
            <div id="${movie.id}" class="modal">
                <div class="modal_body">
                    <div onclick="movieDetailClose(${movie.id})" class="modal_close">❌</div>
                    <div class="modal_content">
                        <div class="modal_movie_img"><img src="${movie_img_url}"></div>
                        <div class="modal_movie_content">
                            <h3>${movie.title}</h3>
                            <p>언어 : ${movie.original_language}</p>
                            <p class="modal_movie_content_overview">${movie.overview}</p>
                            <p>${movie.vote_average}, ${movie.vote_count}명 평가</p>
                            <p>개봉일 : ${movie.release_date}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        document.querySelector('.movie_details').insertAdjacentHTML('beforeend', temp_html);
        movieDetailClose(movie.id);
    }
}