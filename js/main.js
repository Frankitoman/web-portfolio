/* ==========================================================================
   TIERRA — interactions
   ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- i18n ---------- */
  if (window.i18n) {
    window.i18n.applyToDOM();
    document.querySelectorAll('[data-lang-option]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.i18n.setLang(btn.getAttribute('data-lang-option'));
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, idx) {
      el.style.transitionDelay = (idx % 3) * 70 + 'ms';
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
    });
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navMobile.classList.remove('is-open'); });
    });
  }

  /* ---------- Contact form ----------
     No custom domain yet, so there's no real mail-sending backend to call.
     Submitting composes a mailto: with everything pre-filled instead — the
     same thing a plain mailto link did before, just via a proper form.
     Once a domain + Cloudflare Email Routing are set up, swap this for a
     fetch() to a Worker endpoint (see duo-sonus's src/index.js for the
     pattern) without touching the form markup. */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var errorEl = document.getElementById('contactFormError');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.name.value.trim();
      var email = contactForm.email.value.trim();
      var business = contactForm.business.value.trim();
      var message = contactForm.message.value.trim();
      var honeypot = contactForm.company.value.trim();

      if (honeypot) return; // bot filled the hidden field — silently drop

      if (!name || !email || !message) {
        if (errorEl) errorEl.hidden = false;
        return;
      }
      if (errorEl) errorEl.hidden = true;

      var subject = 'Nuevo mensaje desde Tierra — ' + name;
      var bodyLines = [
        'Nombre: ' + name,
        'Email: ' + email,
        business ? 'Negocio: ' + business : null,
        '',
        message
      ].filter(function (l) { return l !== null; });

      var mailto = 'mailto:francojmansilla@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
    });
  }

})();
