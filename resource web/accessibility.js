// Accessibility Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
  const accessibilityBtn = document.getElementById('accessibility-btn');
  const accessibilityMenu = document.getElementById('accessibility-menu');
  const closeMenuBtn = document.querySelector('.close-accessibility-menu');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const fontSizeValue = document.getElementById('font-size-value');
  const textSpacingBtn = document.getElementById('text-spacing-toggle');
  const darkModeBtn = document.getElementById('dark-mode-toggle');
  const highContrastBtn = document.getElementById('high-contrast-toggle');
  const textToSpeechBtn = document.getElementById('text-to-speech-toggle');
  const resetBtn = document.getElementById('reset-accessibility');

  // Load saved preferences from localStorage
  function loadAccessibilityPreferences() {
    const savedFontSize = localStorage.getItem('a11y-font-size');
    const savedSpacing = localStorage.getItem('a11y-text-spacing');
    const savedDarkMode = localStorage.getItem('a11y-dark-mode');
    const savedHighContrast = localStorage.getItem('a11y-high-contrast');
    const savedTextToSpeech = localStorage.getItem('a11y-text-to-speech');

    if (savedFontSize) {
      const fontSize = parseInt(savedFontSize);
      fontSizeSlider.value = fontSize;
      applyFontSizeMultiplier(fontSize);
    }

    if (savedSpacing === 'true') {
      document.body.classList.add('increased-spacing');
      textSpacingBtn.classList.add('active');
    }

    if (savedDarkMode === 'true') {
      document.body.classList.add('dark-mode');
      darkModeBtn.classList.add('active');
    }

    if (savedHighContrast === 'true') {
      document.body.classList.add('high-contrast');
      highContrastBtn.classList.add('active');
    }

    if (savedTextToSpeech === 'true') {
      textToSpeechBtn.classList.add('active');
      initializeTextToSpeech();
    }
  }

  // Toggle accessibility menu
  accessibilityBtn.addEventListener('click', function() {
    accessibilityMenu.classList.toggle('open');
  });

  closeMenuBtn.addEventListener('click', function() {
    accessibilityMenu.classList.remove('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.accessibility-btn') && !event.target.closest('.accessibility-menu')) {
      accessibilityMenu.classList.remove('open');
    }
  });

  // Font Size Adjustment
  fontSizeSlider.addEventListener('input', function() {
    const multiplier = parseInt(this.value);
    fontSizeValue.textContent = multiplier + '%';
    applyFontSizeMultiplier(multiplier);
    localStorage.setItem('a11y-font-size', multiplier);
  });

  function applyFontSizeMultiplier(multiplier) {
    const ratio = multiplier / 100;
    document.documentElement.style.fontSize = (16 * ratio) + 'px';
  }

  // Text Spacing Toggle
  textSpacingBtn.addEventListener('click', function() {
    document.body.classList.toggle('increased-spacing');
    this.classList.toggle('active');
    const isActive = document.body.classList.contains('increased-spacing');
    localStorage.setItem('a11y-text-spacing', isActive);
  });

  // Dark Mode Toggle
  darkModeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.classList.toggle('active');
    const isActive = document.body.classList.contains('dark-mode');
    localStorage.setItem('a11y-dark-mode', isActive);
  });

  // High Contrast Toggle
  highContrastBtn.addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
    this.classList.toggle('active');
    const isActive = document.body.classList.contains('high-contrast');
    localStorage.setItem('a11y-high-contrast', isActive);
  });

  // Text-to-Speech Toggle
  textToSpeechBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    const isActive = this.classList.contains('active');
    localStorage.setItem('a11y-text-to-speech', isActive);
    
    if (isActive) {
      initializeTextToSpeech();
    } else {
      stopTextToSpeech();
    }
  });

  // Text-to-Speech Implementation
  function initializeTextToSpeech() {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      textToSpeechBtn.classList.remove('active');
      return;
    }

    // Create a read button for the main content
    const mainContent = document.getElementById('main-content');
    if (mainContent && !document.getElementById('read-page-btn')) {
      const readBtn = document.createElement('button');
      readBtn.id = 'read-page-btn';
      readBtn.textContent = 'Read Page';
      readBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #D64D1B;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        z-index: 9999;
        font-weight: bold;
        transition: background-color 0.3s ease;
      `;

      readBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#B85C1F';
      });

      readBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#D64D1B';
      });

      readBtn.addEventListener('click', function() {
        speakContent();
      });

      document.body.appendChild(readBtn);
    }
  }

  function stopTextToSpeech() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    const readBtn = document.getElementById('read-page-btn');
    if (readBtn) {
      readBtn.remove();
    }
  }

  function speakContent() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Get all text content
    const text = mainContent.innerText;

    if (!text.trim()) {
      alert('No content to read.');
      return;
    }

    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      speechSynthesis.speak(utterance);
    }
  }

  // Reset all accessibility settings
  resetBtn.addEventListener('click', function() {
    // Reset font size
    fontSizeSlider.value = 100;
    applyFontSizeMultiplier(100);
    localStorage.removeItem('a11y-font-size');

    // Remove all classes
    document.body.classList.remove('increased-spacing', 'dark-mode', 'high-contrast');
    localStorage.removeItem('a11y-text-spacing');
    localStorage.removeItem('a11y-dark-mode');
    localStorage.removeItem('a11y-high-contrast');

    // Reset buttons
    textSpacingBtn.classList.remove('active');
    darkModeBtn.classList.remove('active');
    highContrastBtn.classList.remove('active');

    // Stop text-to-speech
    if (textToSpeechBtn.classList.contains('active')) {
      stopTextToSpeech();
      textToSpeechBtn.classList.remove('active');
      localStorage.removeItem('a11y-text-to-speech');
    }
    // Custom orange popup
    if (!document.getElementById('custom-alert-bg')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'custom-alert.css';
      document.head.appendChild(style);

      const bg = document.createElement('div');
      bg.className = 'custom-alert-bg';
      bg.id = 'custom-alert-bg';
      const popup = document.createElement('div');
      popup.className = 'custom-alert';
      popup.innerHTML = `Accessibility settings have been reset to default.<br><button id="custom-alert-ok">OK</button>`;
      bg.appendChild(popup);
      document.body.appendChild(bg);
      document.getElementById('custom-alert-ok').focus();
      document.getElementById('custom-alert-ok').onclick = function() {
        bg.remove();
      };
    }
  });

  // Load preferences on page load
  loadAccessibilityPreferences();
});
