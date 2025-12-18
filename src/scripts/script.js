$(document).ready(function () {
  // Mobile Menu Toggle
  const $menuBtn = $('#menu-mobile');
  const $navLista = $('#nav-lista');

  $menuBtn.on('click', function () {
    $navLista.toggleClass('active');
    // Change icon
    const $icon = $menuBtn.find('i');
    if ($navLista.hasClass('active')) {
      $icon.removeClass('bi-list').addClass('bi-x-lg');
    } else {
      $icon.removeClass('bi-x-lg').addClass('bi-list');
    }
  });

  // Close menu when clicking a link
  $('.nav-item a').on('click', function () {
    if ($(window).width() < 968) {
      $navLista.removeClass('active');
      $menuBtn.find('i').removeClass('fa-xmark').addClass('fa-bars');
    }
  });

  // Carousel Logic
  const $track = $('#track');
  const $leftBtn = $('.prev-btn');
  const $rightBtn = $('.next-btn');

  // Card dimensions
  const cardWidth = 280; // width from css
  const gap = 32; // 2rem gap from css (approx 32px)
  const itemWidth = cardWidth + gap;

  // Scroll function
  $rightBtn.on('click', function () {
    $track[0].scrollBy({
      left: itemWidth,
      behavior: 'smooth'
    });
  });

  $leftBtn.on('click', function () {
    $track[0].scrollBy({
      left: -itemWidth,
      behavior: 'smooth'
    });
  });

  // Note: Since I used css 'transform' variable in the plan but chose native scroll in JS for simplicity:
  // Let's switch to native overflow scrolling for better touch support,
  // but for the buttons trigger scroll content.
  // I need to ensure .carousel-track-container uses overflow-x: auto (hidden scrollbar) for this to work well.
  // Actually, let's inject a style to hiding scrollbars for cleaner look but allow scroll.

  $track.css({
    'overflow-x': 'auto',
    'scroll-behavior': 'smooth',
    'padding-bottom': '10px', /* hide scrollbar slightly */
    'scrollbar-width': 'none', /* Firefox */
  });

  // Scroll Reveal Animation (Intersection Observer)
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initial style for animated elements (can do this in CSS but doing here to not break if JS disabled)
  // Actually, better to do in CSS with a class '.reveal'.
  // Let's add the class and style via JS just to be safe or add to CSS.
  // I will add a style block for .hidden-reveal

  $('section').each(function () {
    $(this).css({
      'opacity': '0',
      'transform': 'translateY(50px)',
      'transition': 'all 0.8s ease'
    });
    observer.observe(this);
  });

});
