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

// let scrollHeight = Math.max(
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );

// console.log(scrollHeight);
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
  onloadMore();

}

function onloadMore() {
  loadMoreBtn.disable();
  galleryApiService.fetchApi().then(appendListMarkup)
  .then(windowsScrolling)
  // .catch(console.log('error'))
 
  
  
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
  onCleanerInnerHTML();
  alert({
    text: 'Enter something!',
  });
}

function windowsScrolling() {
  const totalScrollHeight = listCard.clientHeight;
  console.log(totalScrollHeight);
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  // console.log(scrollHeight);
  window.scrollTo({

  // top: scrollHeight,
  top: totalScrollHeight,
  left: 0,
  // behavior: 'smooth'
  });
}
// function windowsScrolling(e) {
//   window.scrollTo({
//     top: e.pageY,
//     left: 0,
//     behavior: 'smooth',
//   });
// }


// function deleteError() {
//   const errorMessage = document.querySelector('.pnotify');
//   if (document.body.contains(errorMessage)) {
//     errorMessage.style.display = 'none';
//   }
// }
