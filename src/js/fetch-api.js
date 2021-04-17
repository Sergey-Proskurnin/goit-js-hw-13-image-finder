// import debounce from 'lodash.debounce';
import { alert } from '@pnotify/core';

import countriesCards from '../templates/markup-card.hbs';

import {
  body,
  searchForm,
  input,
  listCard,
  btnSubmit,
  btnLoadMore,
  pnotify,
} from './refs';

import GalleryApiService from './apiService';
import LoadMoreBtn from './load-more-btn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const galleryApiService = new GalleryApiService();
searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onloadMore);

function onSearch(e) {
  e.preventDefault();
  galleryApiService.query = e.currentTarget.elements.query.value;
  if (galleryApiService.query === '') {
    onFetchAlert();
    return;
  }
  loadMoreBtn.show();
  galleryApiService.resetPage();
  onCleanerInnerHTML();
//   window.scrollTo(0,200);
  onFetchCard();
}

function onloadMore() {
    onFetchCard()
//   window.scrollTo({
    //   top: 1000,
    //   left: 0,
    // top: window.scrollY + window.innerHeight,
    // behavior: 'smooth'
//   });
}

function onFetchCard() {
    loadMoreBtn.disable();
  galleryApiService.fetchApi().then(appendListMarkup);
  loadMoreBtn.enable();
    
}

function appendListMarkup(hits) {
    
  listCard.insertAdjacentHTML('beforeend', countriesCards(hits));
}

function onCleanerInnerHTML() {
  listCard.innerHTML = '';
  //   deleteError();
}

function onFetchAlert() {
  alert({
    text: 'Enter something!',
  });
}

// function deleteError() {
//   const errorMessage = document.querySelector('.pnotify');
//   if (document.body.contains(errorMessage)) {
//     errorMessage.style.display = 'none';
//   }
// }
