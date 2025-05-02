const createBookmark = (data) => {
    if (localStorage.getItem(data.id) === null) {
        localStorage.setItem(data.id, JSON.stringify(data));
        alert("영화를 북마크에 저장했습니다!");
    }
    else {
        alert("이미 북마크에 있습니다!");
    }
}

const deleteBookmark = (id) => {
    localStorage.removeItem(id);
    alert("영화를 북마크에서 삭제했습니다!");
}

export { createBookmark ,deleteBookmark }