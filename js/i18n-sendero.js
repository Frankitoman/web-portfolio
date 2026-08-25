/* El sendero — i18n. A small dictionary + apply(), not the whole site's
   i18n.js (that page no longer exists): this page's copy is different and
   lives inside fixed, scroll-windowed blocks, not a normal document flow. */
(function () {
  'use strict';

  var STORAGE_KEY = 'tierra_sendero_lang';

  var DICT = {
    es: {
      doc_title: 'Tierra — El sendero',
      doc_desc: 'Un hogar digital para tu negocio. Tierra, estudio de diseño web en Copenhague.',
      skip_link: 'Ir al contacto',

      leg_cresta: 'Cresta',
      leg_valle: 'Valle',
      leg_ladera: 'Ladera',
      leg_bifurcacion: 'Bifurcación',
      leg_ventana: 'Ventana',

      hero_title: '<span class="mix-plain">Todo negocio merece</span><br><span class="mix-accent">un hogar digital.</span>',
      hero_lead: 'Diseño a medida y desarrollo digital: la imagen de tu negocio hecha realidad.',

      valle_eyebrow: 'Trabajos',
      valle_title: '<span class="mix-plain">Negocios con su nuevo</span><br><span class="mix-accent">Hogar</span>',
      valle_lead: 'Cada uno con su propia identidad, pensada desde cero para representar lo que ya construyeron.',

      ladera_eyebrow: 'Quién está del otro lado',
      ladera_title: '<span class="mix-plain">Construimos cada sitio</span><br><span class="mix-accent">como si fuera el nuestro.</span>',
      ladera_lead1: 'Somos Tierra, asentados en Copenhague. Nos dedicamos a que pequeños negocios tengan, por fin, una identidad propia en internet.',
      ladera_lead2: 'Sin intermediarios ni procesos de agencia: cada decisión, chica o grande, la tomamos junto a vos.',
      ladera_lead_mobile: 'Somos Tierra, desde Copenhague.',

      plan_a_name: 'Plan A',
      plan_a_price: '700 kr.',
      plan_a_unit: '/ mes',
      plan_a_lead: 'Nosotros diseñamos, publicamos y mantenemos tu sitio: vos solo avisás qué cambiar. Incluye hosting, actualizaciones y ajustes todo el tiempo que lo uses.',
      plan_a_lead_mobile: 'Nosotros mantenemos todo. Vos solo avisás qué cambiar.',
      plan_a_fact: 'Ideal si querés arrancar rápido y no pensar en lo técnico nunca más.',

      plan_b_name: 'Plan B',
      plan_b_price: '20.000 kr.',
      plan_b_unit: 'pago único',
      plan_b_lead: 'Te entregamos el sitio terminado, con el código y el dominio a tu nombre. De ahí en más es enteramente tuyo: lo hosteás donde quieras.',
      plan_b_lead_mobile: 'El sitio queda tuyo. Sin mensualidad.',
      plan_b_fact: 'Ideal si preferís pagar una vez y no depender de nadie después.',

      ventana_eyebrow: 'Contacto',
      ventana_title: '<span class="mix-plain">Démosle a tu negocio</span><br><span class="mix-accent">su propio hogar.</span>',
      ventana_lead: 'Contanos de qué se trata tu negocio y qué te gustaría lograr. Creemos tu hogar juntos.',
      ventana_lead_mobile: 'Contanos tu idea.',

      form_name: 'Nombre',
      form_email: 'Email',
      form_message: 'Mensaje',
      form_submit: 'Enviar',
      form_error: 'Completá tu nombre, email y mensaje.',
    },

    en: {
      doc_title: 'Tierra — The trail',
      doc_desc: 'A digital home for your business. Tierra, a web design studio in Copenhagen.',
      skip_link: 'Go to contact',

      leg_cresta: 'Ridge',
      leg_valle: 'Valley',
      leg_ladera: 'Slope',
      leg_bifurcacion: 'Crossroads',
      leg_ventana: 'Window',

      hero_title: '<span class="mix-plain">Every business deserves</span><br><span class="mix-accent">a digital home.</span>',
      hero_lead: 'Custom design and digital development: your business, made real online.',

      valle_eyebrow: 'Work',
      valle_title: '<span class="mix-plain">Businesses with their new</span><br><span class="mix-accent">Home</span>',
      valle_lead: 'Each with its own identity, built from scratch to represent what they already built.',

      ladera_eyebrow: 'Who’s on the other side',
      ladera_title: '<span class="mix-plain">We build every site</span><br><span class="mix-accent">as if it were our own.</span>',
      ladera_lead1: 'We are Tierra, based in Copenhagen. We help small businesses finally have their own identity online.',
      ladera_lead2: 'No middlemen, no agency process: every decision, big or small, we make together with you.',
      ladera_lead_mobile: 'We are Tierra, from Copenhagen.',

      plan_a_name: 'Plan A',
      plan_a_price: '700 kr.',
      plan_a_unit: '/ month',
      plan_a_lead: 'We design, publish and maintain your site: you just tell us what to change. Includes hosting, updates and tweaks for as long as you use it.',
      plan_a_lead_mobile: 'We maintain everything. You just say what to change.',
      plan_a_fact: 'Ideal if you want to start fast and never think about the technical side again.',

      plan_b_name: 'Plan B',
      plan_b_price: '20,000 kr.',
      plan_b_unit: 'one-time',
      plan_b_lead: 'We hand over the finished site, with the code and domain in your name. From there it’s entirely yours: you host it wherever you like.',
      plan_b_lead_mobile: 'The site is yours. No monthly fee.',
      plan_b_fact: 'Ideal if you’d rather pay once and not depend on anyone afterwards.',

      ventana_eyebrow: 'Contact',
      ventana_title: '<span class="mix-plain">Let’s give your business</span><br><span class="mix-accent">its own home.</span>',
      ventana_lead: 'Tell us what your business is about and what you’d like to achieve. Let’s build your home together.',
      ventana_lead_mobile: 'Tell us your idea.',

      form_name: 'Name',
      form_email: 'Email',
      form_message: 'Message',
      form_submit: 'Send',
      form_error: 'Fill in your name, email and message.',
    },

    da: {
      doc_title: 'Tierra — Stien',
      doc_desc: 'Et digitalt hjem til din virksomhed. Tierra, et webdesignstudie i København.',
      skip_link: 'Gå til kontakt',

      leg_cresta: 'Kammen',
      leg_valle: 'Dalen',
      leg_ladera: 'Skråningen',
      leg_bifurcacion: 'Skillevejen',
      leg_ventana: 'Vinduet',

      hero_title: '<span class="mix-plain">Enhver virksomhed fortjener</span><br><span class="mix-accent">et digitalt hjem.</span>',
      hero_lead: 'Skræddersyet design og digital udvikling: din virksomhed, gjort til virkelighed online.',

      valle_eyebrow: 'Arbejde',
      valle_title: '<span class="mix-plain">Virksomheder med deres nye</span><br><span class="mix-accent">Hjem</span>',
      valle_lead: 'Hver med sin egen identitet, bygget fra bunden til at repræsentere det, de allerede har opbygget.',

      ladera_eyebrow: 'Hvem der er i den anden ende',
      ladera_title: '<span class="mix-plain">Vi bygger hvert website,</span><br><span class="mix-accent">som var det vores eget.</span>',
      ladera_lead1: 'Vi er Tierra, baseret i København. Vi hjælper små virksomheder med endelig at få deres egen identitet online.',
      ladera_lead2: 'Ingen mellemmænd, ingen bureauproces: hver beslutning, stor eller lille, tager vi sammen med dig.',
      ladera_lead_mobile: 'Vi er Tierra, fra København.',

      plan_a_name: 'Plan A',
      plan_a_price: '700 kr.',
      plan_a_unit: '/ md.',
      plan_a_lead: 'Vi designer, udgiver og vedligeholder dit website: du siger bare til, hvad der skal ændres. Inkluderer hosting, opdateringer og justeringer, så længe du bruger det.',
      plan_a_lead_mobile: 'Vi vedligeholder alt. Du siger bare til.',
      plan_a_fact: 'Ideelt hvis du vil i gang hurtigt og aldrig skal tænke på det tekniske igen.',

      plan_b_name: 'Plan B',
      plan_b_price: '20.000 kr.',
      plan_b_unit: 'engangsbeløb',
      plan_b_lead: 'Vi afleverer det færdige website, med koden og domænet i dit navn. Derefter er det helt dit: du hoster det, hvor du vil.',
      plan_b_lead_mobile: 'Websitet bliver dit. Ingen månedlig betaling.',
      plan_b_fact: 'Ideelt hvis du hellere vil betale én gang og ikke være afhængig af nogen bagefter.',

      ventana_eyebrow: 'Kontakt',
      ventana_title: '<span class="mix-plain">Lad os give din virksomhed</span><br><span class="mix-accent">sit eget hjem.</span>',
      ventana_lead: 'Fortæl os, hvad din virksomhed handler om, og hvad du gerne vil opnå. Lad os skabe dit hjem sammen.',
      ventana_lead_mobile: 'Fortæl os din idé.',

      form_name: 'Navn',
      form_email: 'Email',
      form_message: 'Besked',
      form_submit: 'Send',
      form_error: 'Udfyld navn, email og besked.',
    },
  };

  var LANGS = ['es', 'en', 'da'];

  function apply(lang) {
    var dict = DICT[lang] || DICT.es;
    document.documentElement.setAttribute('lang', lang);
    if (dict.doc_title) document.title = dict.doc_title;
    var descEl = document.querySelector('meta[name="description"]');
    if (descEl && dict.doc_desc) descEl.setAttribute('content', dict.doc_desc);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    document.querySelectorAll('.lang-switch__btn').forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'es';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  var saved = 'es';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'es'; } catch (e) {}
  if (LANGS.indexOf(saved) === -1) saved = 'es';
  apply(saved);

  document.querySelectorAll('.lang-switch__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
})();
