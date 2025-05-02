# FE Assignment 01

## Movie Search Website

TMDB API를 활용한 영화 검색 웹사이트 프로젝트입니다.


## API Key 연결 방법

TMDB API를 사용하기 위해 개인 API 키를 연결해야 합니다.

### 1. `apikey.js` 파일 생성

프로젝트 `js` 폴더에 `apikey.js` 파일을 새로 만듭니다.

### 2. `apikey.js` 파일 내용 작성

다음과 같이 API 키를 설정합니다.

```js
// apikey.js
export const config = {
  API_KEY: 'your tmdb api key'
};