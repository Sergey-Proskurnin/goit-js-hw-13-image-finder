import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(event) {
  let escBtn = '';
  if (event.target.localName === 'img') {
    const imgListSrc = event.target.getAttribute('data-src');
    const instance = basicLightbox.create(
      `<img src=${imgListSrc} width="1280">`,
    );
    instance.show();
    escBtn = window.addEventListener('keyup', event => {
      if (event.key === 'Escape') {
        instance.close();
      }
    });
  }
  window.removeEventListener('keyup', escBtn);
}
