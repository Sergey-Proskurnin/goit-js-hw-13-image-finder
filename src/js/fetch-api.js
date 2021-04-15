// import debounce from 'lodash.debounce';
// import { error } from '@pnotify/core';

// import countriesCards from '../templates/markup-card.hbs';
// import countrieslist from '../templates/markup-list.hbs';

// import API from './fetchCountries';
// import refs from './refs';

// let form = '';

// refs.input.addEventListener('input', debounce(onSearch, 500));

// function onSearch(e) {
//   onCleanerInnerHTML();
//   form = e.target.value;
//   render(form);
// }

// function onFetchError() {
//   error({
//     text: 'Not this country!',
//   });
// }

// function render(form) {
//   if (form !== '') {
//     API.fetchCountries(form).then(renderCountryCard).catch(onFetchError);
//   }
// }

// function renderCountryCard(country) {
//   if (country.length === 1) {
//     const markupCard = countriesCards(country);
//     refs.articleCards.innerHTML = markupCard;
//     deleteError();
//   }
//   if (country.length > 1 && country.length < 11) {
//     const markupList = countrieslist(country);
//     refs.list.innerHTML = markupList;
//     deleteError();
//   }
//   if (country.length > 10) {
//     error({
//       text: 'Too many matches found. Please enter a more specific query!',
//     });
//   }
// }

// function onCleanerInnerHTML() {
//   refs.list.innerHTML = '';
//   refs.articleCards.innerHTML = '';
//   deleteError();
// }
// function deleteError() {
//   const errorMessage = document.querySelector('.pnotify');
//   if (document.body.contains(errorMessage)) {
//     errorMessage.style.display = 'none';
//   }
// }
