import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(event) {
  let escBtn = '';
  if (event.target.localName === 'img') {
    const imgListSrc = event.target.getAttribute('data-src');
    const altImg = event.target.getAttribute('alt');
    const instance = basicLightbox.create(
      `<img src=${imgListSrc} alt="${altImg}" width="1280">`,
      {
        onClose: () => {
          document.body.classList.remove('is-open');
        },
      },
    );
    instance.show(document.body.classList.add('is-open'));
    escBtn = window.addEventListener('keyup', event => {
      if (event.key === 'Escape') {
        instance.close();
      }
    });
  }
  window.removeEventListener('keyup', escBtn);
}
