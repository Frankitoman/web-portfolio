/* ==========================================================================
   AÑORANZA — interactions
   ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('is-hidden');
  }
  window.addEventListener('load', function () { setTimeout(hidePreloader, 600); });
  setTimeout(hidePreloader, 2500); // fallback safety net

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Photo fade-in on load ---------- */
  window.initPhotoFade = function (root) {
    (root || document).querySelectorAll('.photo img').forEach(function (img) {
      if (img.complete) img.classList.add('is-loaded');
      else img.addEventListener('load', function () { img.classList.add('is-loaded'); });
    });
  };
  window.initPhotoFade();

  /* ---------- Split hero title into spans for line-reveal ---------- */
  document.querySelectorAll('[data-reveal-text]').forEach(function (el) {
    var text = el.textContent;
    el.textContent = '';
    var inner = document.createElement('span');
    inner.className = 'split-inner';
    inner.textContent = text;
    el.appendChild(inner);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-text]');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = (el.dataset.revealDelay) ? parseFloat(el.dataset.revealDelay) : 0;
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el, idx) {
      // stagger elements that share a direct parent lightly
      el.style.transitionDelay = (idx % 4) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 30) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('navBurger');
  var navMobile = document.getElementById('navMobile');
  if (burger && navMobile) {
    burger.addEventListener('click', function () {
      var open = navMobile.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.classList.toggle('is-open', open);
    });
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navMobile.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-counter]');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-AR');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-AR');
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterIO.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-counter'); });
  }

  /* ---------- Custom cursor ---------- */
  var cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches && window.innerWidth > 900) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      var dot = cursor.querySelector('.cursor__dot');
      var ring = cursor.querySelector('.cursor__ring');
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('[data-cursor-hover]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('is-hover'); });
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ---------- Magnetic buttons ---------- */
  if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.35 + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------- Hero parallax tilt on image ---------- */
  var heroFrame = document.querySelector('.hero__image-frame');
  if (heroFrame && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelector('.hero').addEventListener('mousemove', function (e) {
      var rect = heroFrame.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) / rect.width;
      var dy = (e.clientY - cy) / rect.height;
      heroFrame.style.transform = 'rotateY(' + (dx * 6) + 'deg) rotateX(' + (dy * -6) + 'deg)';
    });
    document.querySelector('.hero').addEventListener('mouseleave', function () {
      heroFrame.style.transform = '';
    });
    heroFrame.style.transition = 'transform .4s ' + 'cubic-bezier(.22,.61,.36,1)';
    heroFrame.style.transformStyle = 'preserve-3d';
  }

  /* ---------- Testimonial slider ---------- */
  var track = document.getElementById('testiTrack');
  var prevBtn = document.getElementById('testiPrev');
  var nextBtn = document.getElementById('testiNext');
  if (track && prevBtn && nextBtn) {
    function cardWidth() {
      var card = track.querySelector('.testi-card');
      return card ? card.getBoundingClientRect().width + 26 : 400;
    }
    nextBtn.addEventListener('click', function () { track.scrollBy({ left: cardWidth(), behavior: 'smooth' }); });
    prevBtn.addEventListener('click', function () { track.scrollBy({ left: -cardWidth(), behavior: 'smooth' }); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  var successMsg = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['name', 'email', 'message'].forEach(function (id) {
        var input = document.getElementById(id);
        var field = input.closest('.form-field');
        var isEmpty = input.value.trim() === '';
        var isBadEmail = id === 'email' && input.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        if (isEmpty || isBadEmail) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });
      if (!valid) return;

      var submitBtn = form.querySelector('.form-submit');
      submitBtn.classList.add('is-loading');
      successMsg.classList.remove('is-visible');

      // TODO: reemplazar esta simulación por el envío real del formulario
      // (por ejemplo: fetch a Formspree, EmailJS, o un backend propio).
      setTimeout(function () {
        submitBtn.classList.remove('is-loading');
        successMsg.classList.add('is-visible');
        form.reset();
      }, 1100);
    });

    ['name', 'email', 'message'].forEach(function (id) {
      var input = document.getElementById(id);
      input.addEventListener('input', function () {
        input.closest('.form-field').classList.remove('is-invalid');
      });
    });
  }

})();
