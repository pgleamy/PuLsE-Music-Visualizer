'use strict';

// The image links work without JavaScript; the dialog adds in-page enlargement.
const lightbox = document.querySelector('.lightbox');
let opener = null;

if (lightbox && typeof lightbox.showModal === 'function') {
  const picture = lightbox.querySelector('img');
  const fullSize = lightbox.querySelector('.lightbox-original');

  document.querySelectorAll('.capture-open').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      opener = link;
      const preview = link.querySelector('img');
      picture.src = link.href;
      picture.alt = preview.alt;
      fullSize.href = link.href;
      lightbox.showModal();
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
  });
  lightbox.addEventListener('close', () => opener?.focus());
}

const year = document.querySelector('#copyright-year');
if (year) year.textContent = new Date().getFullYear();
