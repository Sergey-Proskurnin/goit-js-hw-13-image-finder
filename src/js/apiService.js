const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21195458-19b2d8fc62244b43de198b4d0';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.numberPage = 1;
  }
  // -------------------------Option-Promise.then---------------------------------------------------
  // fetchApi() {
  //   const searchParams = new URLSearchParams({
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     q: this.searchQuery,
  //     page: this.numberPage,
  //     per_page: 12,
  //     key: API_KEY,
  //   });
  //   const url = `${BASE_URL}/?${searchParams}`;
  //   return fetch(url)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(console.log('Error'));
  //       }
  //       return response.json();
  //     })
  //     .then(({ hits }) => {
  //       if (hits.length === 0) {
  //         return 'error';
  //       }
  //       this.incrementPage();
  //       return hits;
  //     });
  // }
  //-----------------------------------------------------------------------------------------------
  // ------------------------Option-async-await----------------------------------------------------
  async fetchApi() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.searchQuery,
      page: this.numberPage,
      per_page: 12,
      key: API_KEY,
    });
    const url = `${BASE_URL}/?${searchParams}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(console.log('Error'));
    }
    const { hits } = await response.json();
    if (hits.length === 0 && this.numberPage === 1) {
      return 'error';
    }
    this.incrementPage();
    return await hits;
  }
  incrementPage() {
    this.numberPage += 1;
  }
  resetPage() {
    this.numberPage = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
