/* El sendero — i18n. A small dictionary + apply(), not the whole site's
   i18n.js (that page no longer exists): this page's copy is different and
   lives inside fixed, scroll-windowed blocks, not a normal document flow. */
(function () {
  'use strict';

  var STORAGE_KEY = 'tierra_sendero_lang';

  var DICT = {
    es: {
      doc_title: 'Tierra — El sendero',
      doc_desc: 'Un hogar digital para tu negocio. Tierra, el estudio de Franco Mansilla.',
      skip_link: 'Ir al contacto',

      leg_cresta: 'Cresta',
      leg_valle: 'Valle',
      leg_ladera: 'Ladera',
      leg_bifurcacion: 'Bifurcación',
      leg_ventana: 'Ventana',

      hero_eyebrow: 'Disponible para nuevos negocios',
      hero_title: '<span class="mix-plain">Todo negocio merece</span><br><span class="mix-accent">un hogar digital.</span>',
      hero_lead: 'Diseño y desarrollo sitios a medida — no una plantilla con tu logo pegado encima. Un solo interlocutor, de punta a punta.',

      valle_eyebrow: 'Trabajos',
      valle_title: 'Negocios que ya<br>tienen su lugar.',
      valle_lead: 'Cada uno con su propia identidad — pensado desde cero para representar lo que ya construyeron, no para parecerse al del vecino.',
      valle_fact: 'Directo: hablás conmigo, no con un equipo de ventas.',

      ladera_eyebrow: 'Quién está del otro lado',
      ladera_title: '<span class="mix-plain">Construyo cada sitio</span><br><span class="mix-accent">como si fuera el mío.</span>',
      ladera_lead1: 'Soy Franco, y Tierra es mi estudio — trabajo solo, basado en Dinamarca. Me dedico a que pequeños negocios tengan, por fin, una identidad propia en internet.',
      ladera_lead2: 'Sin intermediarios ni procesos de agencia: cada decisión, chica o grande, la tomamos entre los dos.',
      ladera_lead_mobile: 'Soy Franco. Trabajo solo, desde Dinamarca.',

      plan_a_eyebrow: 'Cómo trabajamos',
      plan_a_name: 'Plan A',
      plan_a_price: '700 kr.',
      plan_a_unit: '/ mes',
      plan_a_lead: 'Yo diseño, publico y mantengo tu sitio — vos solo avisás qué cambiar. Incluye hosting, actualizaciones y ajustes chicos todo el tiempo que lo uses.',
      plan_a_lead_mobile: 'Yo mantengo todo. Vos solo avisás qué cambiar.',
      plan_a_fact: 'Ideal si querés arrancar rápido y no pensar en lo técnico nunca más.',

      plan_b_eyebrow: 'Control total',
      plan_b_name: 'Plan B',
      plan_b_price: '20.000 kr.',
      plan_b_unit: 'pago único',
      plan_b_lead: 'Te entrego el sitio terminado, con el código y el dominio a tu nombre. De ahí en más es enteramente tuyo — lo alojás donde quieras.',
      plan_b_lead_mobile: 'El sitio queda tuyo. Sin mensualidad.',
      plan_b_fact: 'Ideal si preferís pagar una vez y no depender de nadie después.',

      ventana_eyebrow: 'Contacto',
      ventana_title: '<span class="mix-plain">Démosle a tu negocio</span><br><span class="mix-accent">su lugar propio.</span>',
      ventana_lead: 'Contame de qué se trata y qué te gustaría lograr. Sin compromiso — solo para ver si encajamos.',
      ventana_lead_mobile: 'Contame tu idea.',

      form_name: 'Nombre',
      form_email: 'Email',
      form_message: 'Mensaje',
      form_submit: 'Enviar',
      form_error: 'Completá tu nombre, email y mensaje.',
    },

    en: {
      doc_title: 'Tierra — The trail',
      doc_desc: 'A digital home for your business. Tierra, Franco Mansilla’s studio.',
      skip_link: 'Go to contact',

      leg_cresta: 'Ridge',
      leg_valle: 'Valley',
      leg_ladera: 'Slope',
      leg_bifurcacion: 'Crossroads',
      leg_ventana: 'Window',

      hero_eyebrow: 'Available for new businesses',
      hero_title: '<span class="mix-plain">Every business deserves</span><br><span class="mix-accent">a digital home.</span>',
      hero_lead: 'I design and build custom sites — not a template with your logo pasted on top. One point of contact, start to finish.',

      valle_eyebrow: 'Work',
      valle_title: 'Businesses that already<br>have their place.',
      valle_lead: 'Each with its own identity — built from scratch to represent what they already built, not to look like the neighbour’s.',
      valle_fact: 'Direct: you talk to me, not a sales team.',

      ladera_eyebrow: 'Who’s on the other side',
      ladera_title: '<span class="mix-plain">I build every site</span><br><span class="mix-accent">as if it were my own.</span>',
      ladera_lead1: 'I’m Franco, and Tierra is my studio — I work alone, based in Denmark. I help small businesses finally have their own identity online.',
      ladera_lead2: 'No middlemen, no agency process: every decision, big or small, we make together.',
      ladera_lead_mobile: 'I’m Franco. I work alone, from Denmark.',

      plan_a_eyebrow: 'How we work',
      plan_a_name: 'Plan A',
      plan_a_price: '700 kr.',
      plan_a_unit: '/ month',
      plan_a_lead: 'I design, publish and maintain your site — you just tell me what to change. Includes hosting, updates and small tweaks for as long as you use it.',
      plan_a_lead_mobile: 'I maintain everything. You just say what to change.',
      plan_a_fact: 'Ideal if you want to start fast and never think about the technical side again.',

      plan_b_eyebrow: 'Full control',
      plan_b_name: 'Plan B',
      plan_b_price: '20,000 kr.',
      plan_b_unit: 'one-time',
      plan_b_lead: 'I hand over the finished site, with the code and domain in your name. From there it’s entirely yours — host it wherever you like.',
      plan_b_lead_mobile: 'The site is yours. No monthly fee.',
      plan_b_fact: 'Ideal if you’d rather pay once and not depend on anyone afterwards.',

      ventana_eyebrow: 'Contact',
      ventana_title: '<span class="mix-plain">Let’s give your business</span><br><span class="mix-accent">its own place.</span>',
      ventana_lead: 'Tell me what it’s about and what you’d like to achieve. No commitment — just to see if we’re a good fit.',
      ventana_lead_mobile: 'Tell me your idea.',

      form_name: 'Name',
      form_email: 'Email',
      form_message: 'Message',
      form_submit: 'Send',
      form_error: 'Fill in your name, email and message.',
    },

    da: {
      doc_title: 'Tierra — Stien',
      doc_desc: 'Et digitalt hjem til din virksomhed. Tierra, Franco Mansillas studie.',
      skip_link: 'Gå til kontakt',

      leg_cresta: 'Kammen',
      leg_valle: 'Dalen',
      leg_ladera: 'Skråningen',
      leg_bifurcacion: 'Skillevejen',
      leg_ventana: 'Vinduet',

      hero_eyebrow: 'Ledig for nye virksomheder',
      hero_title: '<span class="mix-plain">Enhver virksomhed fortjener</span><br><span class="mix-accent">et digitalt hjem.</span>',
      hero_lead: 'Jeg designer og bygger skræddersyede websites — ikke en skabelon med dit logo klistret på. Én kontaktperson, fra start til slut.',

      valle_eyebrow: 'Arbejde',
      valle_title: 'Virksomheder der allerede<br>har fundet deres plads.',
      valle_lead: 'Hver med sin egen identitet — bygget fra bunden til at repræsentere det, de allerede har opbygget, ikke for at ligne naboens.',
      valle_fact: 'Direkte: du taler med mig, ikke et salgsteam.',

      ladera_eyebrow: 'Hvem der er i den anden ende',
      ladera_title: '<span class="mix-plain">Jeg bygger hvert website,</span><br><span class="mix-accent">som var det mit eget.</span>',
      ladera_lead1: 'Jeg er Franco, og Tierra er mit studie — jeg arbejder alene, baseret i Danmark. Jeg hjælper små virksomheder med endelig at få deres egen identitet online.',
      ladera_lead2: 'Ingen mellemmænd, ingen bureauproces: hver beslutning, stor eller lille, tager vi sammen.',
      ladera_lead_mobile: 'Jeg er Franco. Jeg arbejder alene, fra Danmark.',

      plan_a_eyebrow: 'Sådan arbejder vi',
      plan_a_name: 'Plan A',
      plan_a_price: '700 kr.',
      plan_a_unit: '/ md.',
      plan_a_lead: 'Jeg designer, udgiver og vedligeholder dit website — du siger bare til, hvad der skal ændres. Inkluderer hosting, opdateringer og små justeringer, så længe du bruger det.',
      plan_a_lead_mobile: 'Jeg vedligeholder alt. Du siger bare til.',
      plan_a_fact: 'Ideelt hvis du vil i gang hurtigt og aldrig skal tænke på det tekniske igen.',

      plan_b_eyebrow: 'Fuld kontrol',
      plan_b_name: 'Plan B',
      plan_b_price: '20.000 kr.',
      plan_b_unit: 'engangsbeløb',
      plan_b_lead: 'Jeg afleverer det færdige website, med koden og domænet i dit navn. Derefter er det helt dit — host det, hvor du vil.',
      plan_b_lead_mobile: 'Websitet bliver dit. Ingen månedlig betaling.',
      plan_b_fact: 'Ideelt hvis du hellere vil betale én gang og ikke være afhængig af nogen bagefter.',

      ventana_eyebrow: 'Kontakt',
      ventana_title: '<span class="mix-plain">Lad os give din virksomhed</span><br><span class="mix-accent">sin egen plads.</span>',
      ventana_lead: 'Fortæl mig, hvad det handler om, og hvad du gerne vil opnå. Uforpligtende — bare for at se, om vi passer sammen.',
      ventana_lead_mobile: 'Fortæl mig din idé.',

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
