// Modal zoom for side-by-side images using Flickity carousel
(function() {
  function closeZoomModal() {
    const modal = document.querySelector('.zoom-modal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  }
  function openZoomModal(clickedImg) {
    closeZoomModal();
    let images = Array.from(clickedImg.closest('.side-by-side-images').querySelectorAll('img'));
    let startIndex = images.indexOf(clickedImg);
    // If only two images, duplicate them for Flickity wrapAround
    if (images.length === 2) {
      images = images.concat(images.map(img => img.cloneNode()));
      if (startIndex === 1) startIndex = 3; // ensure correct initial index
    }
    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.innerHTML = `
      <div class="flickity-zoom-carousel">
        <div class="carousel">
          ${images.map(img => `<div class='carousel-cell'><img src='${img.src}' alt='${img.alt}'></div>`).join('')}
        </div>
      </div>
      <button class="zoom-close" aria-label="Close zoom">&times;</button>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    // Init Flickity
    if (window.Flickity) {
      var flkty = new Flickity(modal.querySelector('.carousel'), {
        cellAlign: 'center',
        contain: true,
        wrapAround: true,
        pageDots: true,
        prevNextButtons: true,
        initialIndex: startIndex,
        imagesLoaded: true
      });
    }
    // Close on click outside carousel or on Escape
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeZoomModal();
    });
    modal.querySelector('.zoom-close').addEventListener('click', closeZoomModal);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') {
        closeZoomModal();
        document.removeEventListener('keydown', esc);
      }
    });
  }
  function setupZoom() {
    document.querySelectorAll('.side-by-side-images img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(e) {
        console.log('Zoom image clicked:', img.src);
        openZoomModal(img);
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupZoom);
  } else {
    setupZoom();
  }
  window.setupSideBySideZoom = setupZoom;
})();
