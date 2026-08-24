/* El sendero — signature move.
   A fixed low-poly trail matching the actual shape the five scenes trace.
   The walked portion lights up in ember and stays lit (a real record of
   where the visitor has been), and every waypoint is a clickable jump —
   this rail doubles as the "map" nav the continuous-world grammar requires. */
(function () {
  'use strict';

  // worldflight.md §7b: one resize once layout/fonts have settled, or the
  // spacer can be measured against a pre-font-swap height (or, in some
  // embedded preview panes, against innerHeight=0 at the moment mount() ran,
  // which leaves the track at 0px and the page looking un-scrollable while
  // reporting no error at all). Several independent triggers, all cheap and
  // idempotent, so whichever one lands in a valid layout wins.
  function relayout() { dispatchEvent(new Event('resize')); }
  addEventListener('DOMContentLoaded', relayout);
  addEventListener('load', relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  setTimeout(relayout, 300);

  var mode = document.querySelector('[data-sc-mode="worldflight"]');
  var segEls = Array.prototype.slice.call(document.querySelectorAll('[data-sc-segment]'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.sendero__dot'));
  var litPath = document.querySelector('.sendero__lit');
  if (!mode || !segEls.length || !litPath) return;

  var weights = segEls.map(function (el) { return parseFloat(el.getAttribute('data-sc-w')) || 1; });
  var bounds = []; // c_i, start of each leg in vh-units
  var acc = 0;
  weights.forEach(function (w) { bounds.push(acc); acc += w; });
  var total = acc;

  var len = litPath.getTotalLength();
  litPath.style.strokeDasharray = String(len);
  litPath.style.strokeDashoffset = String(len);

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = null;

  function currentLeg(pr) {
    var t = pr * total;
    var k = 0;
    for (var i = 0; i < bounds.length; i++) if (t >= bounds[i]) k = i;
    return k;
  }

  function tick() {
    raf = null;
    var top = mode.getBoundingClientRect().top + window.scrollY;
    var vh = window.innerHeight || 1;
    var t = Math.max(0, (window.scrollY - top) / vh);
    var pr = Math.min(1, t / Math.max(total, 0.001));

    if (!reduce) litPath.style.strokeDashoffset = String(len * (1 - pr));

    var k = currentLeg(pr);
    dots.forEach(function (d, i) {
      var visited = i <= k;
      d.classList.toggle('is-visited', visited);
      d.setAttribute('aria-current', i === k ? 'true' : 'false');
    });
  }

  function requestTick() { if (raf === null) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', requestTick, { passive: true });
  addEventListener('resize', requestTick);
  tick();

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () {
      var top = mode.getBoundingClientRect().top + window.scrollY;
      var vh = window.innerHeight || 1;
      var targetT = bounds[i] + Math.min(0.15, weights[i] * 0.2);
      window.scrollTo({ top: top + targetT * vh, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  // Cresta and Valle are pale scenes with only a thin ground band, so the
  // engine's own light-mixing scrim + dark ink copy (the theme default) is
  // right there. Ladera, Bifurcación and Ventana each have real dark art
  // where their copy sits — Ladera's is centre-anchored so it needs a
  // different SHAPE too, not just a colour — so .sc-scrim-dark carries
  // whichever one applies and fades on its own opacity transition (theme.css)
  // keyed off the engine's own waypoint event, so entering/leaving never snaps.
  // Two separate elements, not one shared one with a swapped class: Ladera
  // and Bifurcación are adjacent legs, and if both used the same element a
  // leg-to-leg change between two "dark" legs would still leave opacity at 1
  // throughout, so the background-image swap (ellipse -> band) would pop
  // instantly instead of cross-fading with the rest of the transition.
  var peakScrim = document.querySelector('.sc-scrim-dark--peak');
  var bandScrim = document.querySelector('.sc-scrim-dark--band');
  var DARK_BAND_LEGS = { 'Bifurcación': 1, 'Ventana': 1 };
  if (peakScrim && bandScrim) {
    mode.addEventListener('sc:waypoint', function (e) {
      var label = e.detail && e.detail.label;
      peakScrim.classList.toggle('is-active', label === 'Ladera');
      bandScrim.classList.toggle('is-active', !!DARK_BAND_LEGS[label]);
    });
  }
})();
