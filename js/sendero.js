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

  // The engine's scrim always mixes toward --sc-canvas (this theme's light
  // paper token), which is right for the day/dusk legs where copy stays
  // dark-ink, but works against the white copy on Ladera (peak) and Ventana
  // (close) — a light scrim over a warm/dark scene doesn't darken it at all.
  // Swap the scrim's mix source to --sc-ink locally on those two legs, driven
  // off the engine's own sc:waypoint event, no engine files touched. Ladera's
  // copy is centre-anchored (spans the vertical middle of the frame) so it
  // also needs a different scrim SHAPE than the stock bottom band, which only
  // covers the lower ~40% of the frame and leaves the eyebrow + first heading
  // line — sitting higher, over the brightest part of the alpenglow — bare.
  var scrim = document.querySelector('.sc-world__scrim');
  var SCRIM_CLASS = { 'Ladera': 'is-dark-center', 'Ventana': 'is-dark-band' };
  if (scrim) {
    mode.addEventListener('sc:waypoint', function (e) {
      var cls = SCRIM_CLASS[e.detail && e.detail.label];
      scrim.classList.toggle('is-dark-center', cls === 'is-dark-center');
      scrim.classList.toggle('is-dark-band', cls === 'is-dark-band');
    });
  }
})();
