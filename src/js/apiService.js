const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ'

//'https://restcountries.eu/rest/v2/';

function fetchApi(searchQuery) {
  return fetch(`${BASE_URL}name/${searchQuery}`).then(response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  });
}

export default { fetchApi };
