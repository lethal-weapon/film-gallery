import Axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api/v1/movies';
const BASE_URL = 'https://filmgallery.appspot.com/api/v1/movies';

export const loadData = () =>
  Axios.get(`${BASE_URL}/load`);

export const fetchFilms = (requestPayload) =>
  Axios.post(`${BASE_URL}/exact`, requestPayload);

export const fetchTerms = (searchText) =>
  Axios.post(`${BASE_URL}/terms`, searchText);

export const searchFilms = (queryParams) =>
  Axios.post(`${BASE_URL}/search`, queryParams);
