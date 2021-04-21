//----------------------------Imports-----------------------------
import debounce from 'lodash.debounce';
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
  scrollHeight,
} from './refs';

import GalleryApiService from './apiService';
import LoadMoreBtn from './load-more-btn';
// -----------------------------Global-variables------------------------------------------
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const galleryApiService = new GalleryApiService();
searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onloadMore);

//-----------------------Callback-submit-input-form-search---------------------------------  
function onSearch(e) {
  e.preventDefault();
  galleryApiService.query = e.currentTarget.elements.query.value;
  if (galleryApiService.query.trim() === '') {
    loadMoreBtn.hide()
    onFetchAlert();
    return;
  }
  galleryApiService.resetPage();
  onCleanerInnerHTML();
  onloadMore();
  loadMoreBtn.show();
}
// -----------------------------------------------------------------------------------------
// ------------------------------Callback-API-response-processing-function------------------
function onloadMore() {
  loadMoreBtn.disable();
  galleryApiService
    .fetchApi()
    .then(appendListMarkup)
    .then(windowsScrolling)
    .catch('error');
  loadMoreBtn.enable();
}
//---------------Adding-markup-to-code-index.html-------------------------------------------
function appendListMarkup(hits) {
  if (hits === 'error') {
    onFetchAlert();
    loadMoreBtn.hide();
  }
  const markup = countriesCards(hits);
  listCard.insertAdjacentHTML('beforeend', markup);
}
//-----------------------------------------------------------------------------------------
// --------------------------Function-cleaner-list-gallery-marcup-HTML----------------------
function onCleanerInnerHTML() {
  listCard.innerHTML = '';
}
// --------------------------Function-message-alert-pnotify----------------------------------
function onFetchAlert() {
  onCleanerInnerHTML();
  alert({
    text: 'Enter something!',
    delay: 3000,
  });
}
// -------------------------------------------------------------------------------------------
// ---------------------------------Window.scrollTo()-----------------------------------------
function windowsScrolling() {
  // const totalScrollHeight = listCard.clientHeight;
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  //  window.scrollTo({
  //   top: scrollHeight,
  //   // top: totalScrollHeight,
  //   left: 0,
  //   behavior: 'smooth',
  // });
}
// --------------------------Intersection-Observer----------------------------------------------------  
const onEntry = debounce(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && galleryApiService.query !== '') {
      onloadMore()
      loadMoreBtn.disable()
    }
  });
}, 500);
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(btnLoadMore);
// ------------------------------------------------------------------------------------------------------
// --------------------------Delete-message-pnotify------------------------------------------------------
// function deleteError() {
//   const errorMessage = document.querySelector('.pnotify');
//   if (document.body.contains(errorMessage)) {
//     errorMessage.style.display = 'none';
//   }
// }
// --------------------------------------------------------------------------------------------------------
// ---------------------Second-function-on-load-More-------------------------------------------------------
// function onloadMoreKate() {
//   loadMoreBtn.disable();
//   galleryApiService.fetchApi().then(hits => {
//     appendListMarkup(hits);
//     window.scrollTo({
//       top: listCard.scrollHeight,
//       behavior: 'smooth',
//     });
//   });
//   loadMoreBtn.enable()
// }
// ---------------------------------------------------------------------------------------------------------

