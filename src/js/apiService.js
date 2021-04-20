const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q';
const API_KEY = '21195458-19b2d8fc62244b43de198b4d0';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.numberPage = 1;
  }

  fetchApi() {
    return fetch(
      `${BASE_URL}=${this.searchQuery}&page=${this.numberPage}&per_page=12&key=${API_KEY}`,
    )
      .then(response => {
        if (!response.ok) {
          throw response;
        }

        return response.json();
      })
      .then(({ hits }) => {
        if (hits.length === 0) {
          return 'error';
        }
        this.incrementPage();
        return hits;
      });
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

// export default { fetchApi };
// const BASE_URL =
//   'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q';
// const API_KEY = '21195458-19b2d8fc62244b43de198b4d0';

// export default class NewApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.numberPage = 1;
//   }

//   fetchApi() {
//     console.log(this);
//     return fetch(
//       `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.numberPage}&per_page=12&key=21195458-19b2d8fc62244b43de198b4d0`,
//     ).then(response => {
//       if (!response.ok) {
//         throw response;
//       }

//       return response.json().then(data => {
//         this.incrementPage();
//         return data.hits;
//       });
//     });
//   }
//   //     .then(response => {
//   //       if (!response.ok) {
//   //         throw response;
//   //       }
//   //       return response.json();
//   //     })
//   //     .then(({ hits }) => {
//   //       this.incrementPage();
//   //       return hits;
//   //     });
//   // }
//   incrementPage() {
//     this.numberPage += 1;
//   }
//   resetPage() {
//     this.numberPage = 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
