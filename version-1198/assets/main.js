(function() {
  var menuButton = document.querySelector('[data-menu-button]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', function() {
      mobileNav.classList.toggle('is-open');
    });
  }

  var sliders = document.querySelectorAll('[data-hero-slider]');
  sliders.forEach(function(slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('[data-hero-dot]'));
    var prev = slider.querySelector('[data-hero-prev]');
    var next = slider.querySelector('[data-hero-next]');
    var index = 0;
    var timer = null;

    function show(nextIndex) {
      if (!slides.length) {
        return;
      }
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach(function(slide, i) {
        slide.classList.toggle('is-active', i === index);
      });
      dots.forEach(function(dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
    }

    function start() {
      stop();
      timer = window.setInterval(function() {
        show(index + 1);
      }, 5200);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        show(Number(dot.getAttribute('data-hero-dot')) || 0);
        start();
      });
    });

    if (prev) {
      prev.addEventListener('click', function() {
        show(index - 1);
        start();
      });
    }

    if (next) {
      next.addEventListener('click', function() {
        show(index + 1);
        start();
      });
    }

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    show(0);
    start();
  });

  var searchInputs = document.querySelectorAll('.js-search');
  searchInputs.forEach(function(input) {
    var clearButton = input.closest('.search-panel') ? input.closest('.search-panel').querySelector('[data-clear-search]') : null;
    var scope = document.querySelector('.js-card-scope') || document;
    var cards = Array.prototype.slice.call(scope.querySelectorAll('.movie-card, .category-overview-card'));

    function filterCards() {
      var keyword = input.value.trim().toLowerCase();
      cards.forEach(function(card) {
        var haystack = [
          card.getAttribute('data-title') || '',
          card.getAttribute('data-tags') || '',
          card.getAttribute('data-year') || '',
          card.getAttribute('data-region') || '',
          card.textContent || ''
        ].join(' ').toLowerCase();
        card.classList.toggle('is-filtered-out', keyword && haystack.indexOf(keyword) === -1);
      });
    }

    input.addEventListener('input', filterCards);
    if (clearButton) {
      clearButton.addEventListener('click', function() {
        input.value = '';
        filterCards();
        input.focus();
      });
    }
  });
})();
