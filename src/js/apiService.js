const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q';
const API_KEY = '21195458-19b2d8fc62244b43de198b4d0';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.numberPage = 1;
  }
  // -------------------------option-Promise.then---------------------------------------------------
  // fetchApi() {
  //   return fetch(
  //     `${BASE_URL}=${this.searchQuery}&page=${this.numberPage}&per_page=12&key=${API_KEY}`,
  //   )
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error (console.log('Error'));
  //       }
  //       return response.json();
  //     })
  //     .then(({ hits }) => {
  //       if (hits.length === 0) {
  //         return 'error';
  //       }
  //       this.incrementPage();
  //       return hits;
  //     })
  // }
  //-----------------------------------------------------------------------------------------------
  // ------------------------option-async-await----------------------------------------------------
  async fetchApi() {
    const response = await fetch(
      `${BASE_URL}=${this.searchQuery}&page=${this.numberPage}&per_page=12&key=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(console.log('Error'));
    }
    const { hits } = await response.json();
    if (hits.length === 0) {
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
