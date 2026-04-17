// Simple modal zoom for side-by-side images (no Flickity)
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
    const images = Array.from(clickedImg.closest('.side-by-side-images').querySelectorAll('img'));
    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.innerHTML = `<img src='${clickedImg.src}' alt='${clickedImg.alt}'>`;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    // Close on click outside image or on Escape
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeZoomModal();
    });
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
