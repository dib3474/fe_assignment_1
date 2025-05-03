# FE Assignment 01

## Movie Search Website

TMDB API를 활용한 영화 검색 웹사이트입니다.

본인의 취향에 맞는 영화를 키워드를 통해 검색할 수 있습니다.

북마크 기능을 통해 취향에 맞는 영화를 북마크에 저장할 수 있습니다.
상세정보 > ⭐ (클릭)

북마크 탭에서 저장했던 영화들을 볼 수 있으며, 삭제할 수 있습니다.

## API Key 연결 방법

TMDB API를 사용하기 위해 개인 API 키를 연결해야 합니다.

### 1. `apikey.js` 파일 내용 작성

발급받은 TMDB API 키를 `your_api_key`에 작성합니다.

```js
// apikey.js
export const config = {
  API_KEY: 'Bearer your_api_key'
}
```

예시
```js
// apikey.js
export const config = {
  API_KEY: 'Bearer ABcDefGh1i...0'
}
```