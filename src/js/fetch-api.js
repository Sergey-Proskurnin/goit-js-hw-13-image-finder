//----------------------------Imports-----------------------------
import debounce from 'lodash.debounce';
import { alert, error } from '@pnotify/core';
import countriesCards from '../templates/markup-card.hbs';
import onOpenModal from './on-open-modal';
import { searchForm, listCard, btnLoadMore, input } from './refs';
import GalleryApiService from './apiService';
import LoadMoreBtn from './load-more-btn';
// -----------------------------Global-variables------------------------------------------
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const galleryApiService = new GalleryApiService();
searchForm.addEventListener('submit', onSearch);
input.addEventListener('input', onCleanerInput);
loadMoreBtn.refs.button.addEventListener('click', onloadMore);
listCard.addEventListener('click', onOpenModal);
//-----------------------Callback-submit-input-form-search---------------------------------
function onSearch(e) {
  e.preventDefault();
  galleryApiService.query = e.currentTarget.elements.query.value;
  if (galleryApiService.query.trim() === '') {
    loadMoreBtn.hide();
    onFetchAlert();
    onCleanerInnerHTML();
    return;
  }
  galleryApiService.resetPage();
  onCleanerInnerHTML();
  onloadMore();
  loadMoreBtn.show();
}
// ----------------------------------------------------------------------------------------------------------
// -----------------------------Option-callback-API-response-processing-function-on-Promise.then-------------
// function onloadMore() {
//   loadMoreBtn.disable();
//   galleryApiService.fetchApi().then(appendListMarkup)
//   .then(windowsScrolling)
//   loadMoreBtn.enable();
//   .catch(onFetchError())
// }
// -------------------------------------------------------------------------------------------------
// -----------------------------Callback-API-response-processing-function-on-async-await------------
async function onloadMore() {
  loadMoreBtn.disable();
  try {
    loadMoreBtn.disable();
    const galleryArrey = await galleryApiService.fetchApi();
    return appendListMarkup(galleryArrey);
  } catch {
    throw onFetchError();
  }
}
//---------------------------------------------------------------------------------------------------
//------------------------Adding-markup-to-code-index.html-------------------------------------------
function appendListMarkup(hits) {
  if (hits === 'error') {
    onFetchAlert();
    loadMoreBtn.hide();
  }
  if (hits.length < 1) {
    loadMoreBtn.hide();
  }
  const markup = countriesCards(hits);
  listCard.insertAdjacentHTML('beforeend', markup);
}
//--------------------------------------------------------------------------------------------------
// ---------------------------------Window.scrollTo()---------------------------------      --------
// function windowsScrolling() {
// const totalScrollHeight = listCard.clientHeight;
// const scrollHeight = Math.max(
//   document.body.scrollHeight,
//   document.documentElement.scrollHeight,
//   document.body.offsetHeight,
//   document.documentElement.offsetHeight,
//   document.body.clientHeight,
//   document.documentElement.clientHeight,
// );
//  window.scrollTo({
//   top: scrollHeight,
//   // top: totalScrollHeight,
//   left: 0,
//   behavior: 'smooth',
// });
// }
//--------------------------------------------------------------------------------------------------------
// ---------------------------------Intersection-Observer-------------------------------------------------
const onEntry = debounce(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && galleryApiService.query !== '') {
      onloadMore();
      loadMoreBtn.disable();
    }
  });
}, 500);
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(btnLoadMore);
// ------------------------------------------------------------------------------------------------------
//------------------------------------------Message-error-pnotify----------------------------------------
function onFetchError() {
  error({
    text: 'Error fetch!',
    delay: 3000,
  });
}
//--------------------------------------------------------------------------------------------------------
//-----------------------------------------------Delete-message-pnotify-----------------------------------
function deletePnotify() {
  const pnotifyMessage = document.querySelector('.pnotify');
  if (document.body.contains(pnotifyMessage)) {
    pnotifyMessage.style.display = 'none';
  }
}
//---------------------------------------------------------------------------------------------------------
// ------------------------------------Message-alert-pnotify-----------------------------------------------
function onFetchAlert() {
  alert({
    text: 'Enter something!',
    delay: 3000,
  });
}
// --------------------------------------------------------------------------------------------------
// -----------------------------------------Cleaner-list-gallery-marcup-HTML-------------------------
function onCleanerInnerHTML() {
  listCard.innerHTML = '';
}
// -----------------------------------Cleaner-input------------------------------------------------------
function onCleanerInput(e) {
  if (e.target.value.length === 0) {
    onCleanerInnerHTML();
    loadMoreBtn.hide();
    deletePnotify();
  }
}
//------------------------------------------------------------------------------------------------------
