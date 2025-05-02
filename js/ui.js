const displayHome = () => {
    document.querySelector('.title').style.display = "";
    document.querySelector('.search').style.display = "";
    document.querySelector('.cards').style.display = "";
    document.querySelector('.bookmarks').style.display = "none";
    document.querySelector('#home').style.color = "#FAD59A";
    document.querySelector('#bookmark').style.color = "white";
}

const displayBookmark = () => {
    document.querySelector('.title').style.display = "none";
    document.querySelector('.search').style.display = "none";
    document.querySelector('.cards').style.display = "none";
    document.querySelector('.bookmarks').style.display = "flex";
    document.querySelector('#home').style.color = "white";
    document.querySelector('#bookmark').style.color = "#FAD59A";
};

const readBookMarks = () => {
    if (localStorage.length > 0) {
    document.querySelector('.bookmarks').innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const movie = JSON.parse(localStorage.getItem(key));
            const movie_img_url = `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`;
            const temp_html = `
                <div class="card" id="detail_${movie.id}">
                    <img src="${movie_img_url}" alt="${movie.title}">
                    <div class="card_body">
                        <h3>${(movie.title.length < 20) ? movie.title : movie.title.slice(0, 20)}</h6>
                        <p>요약 : ${(movie.overview <= 48) ? movie.overview : movie.overview.slice(0,48)+"..." }
                        <p>평점 : ${movie.vote_average}</p>
                        <p>개봉일 : ${movie.release_date}</p>
                        <a>삭제</a>
                    </div>
                </div>`;
            document.querySelector('.bookmarks').insertAdjacentHTML('beforeend', temp_html);
        }
    }
    else {
        document.querySelector('.bookmarks').innerHTML = '<div class="bookmarks_null">북마크가 없습니다.</div>';
    }
}

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

const movieDetailAppend = (data) => {
    const movie = data;
    document.querySelector('.movie_details').innerHTML = '';
    const movie_img_url = `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`;
    const movie_genre = movie.genres.map((genre) => genre.name).join(" / ");
    const temp_html = `
        <div id="${movie.id}" class="modal">
            <div class="modal_body">
                <div class=modal_header>
                    <p>상세정보</p>
                    <div class="modal_bookmark">⭐</div>
                    <div class="modal_close">❌</div>
                </div> 
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
    document.querySelector('.movie_details').innerHTML = temp_html;
};

export {movieDetailClose, movieAppend, movieDetailAppend, displayHome, displayBookmark, readBookMarks}