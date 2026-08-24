// Tierra — i18n engine (ES default, EN, DA)
(function (global) {
  'use strict';

  var STORAGE_KEY = 'tierra_lang';
  var SUPPORTED = ['es', 'en', 'da'];
  var DEFAULT_LANG = 'es';

  var DICT = {
    es: {
      nav_trabajos: 'Trabajos',
      nav_servicios: 'Servicios',
      nav_planes: 'Planes',
      nav_contacto: 'Contacto',
      nav_cta: 'Escribime',

      hero_badge: 'Disponible para nuevos negocios',
      hero_title_plain: 'Todo negocio merece',
      hero_title_accent: 'un hogar digital.',
      hero_subtitle: 'Diseño y desarrollo sitios a medida para que tu negocio tenga, por fin, un lugar propio en internet — con cara, con identidad, con nombre.',
      hero_cta_primary: 'Ver trabajos',
      hero_cta_ghost: 'Contame tu idea',
      hero_stat1_num: 'Único',
      hero_stat1_label: 'cada sitio pensado para un solo negocio',
      hero_stat2_num: 'Directo',
      hero_stat2_label: 'hablás conmigo, no con un equipo de ventas',
      hero_stat3_num: 'DK',
      hero_stat3_label: 'trabajo hecho desde Dinamarca',

      marquee_1: 'Diseño a medida',
      marquee_2: 'Identidad de marca',
      marquee_3: 'E-commerce',
      marquee_4: 'Asistentes con IA',
      marquee_5: 'Animaciones',
      marquee_6: 'Hosting y mantenimiento',

      proyectos_eyebrow: 'Trabajos',
      proyectos_title: 'Negocios que ya<br>tienen su lugar.',
      proyectos_lead: 'Cada uno con su propia identidad — pensado desde cero para representar lo que ya construyeron.',
      status_live: 'En vivo',
      status_soon: 'Próximamente',

      project_anoranza_desc: 'Panadería argentina en Dinamarca. Su propia casa en internet, con catálogo, carrito de compras y un asistente que responde como lo haría alguien del local.',
      project_duosonus_desc: 'Dúo de acordeón en Copenhague. Una identidad editorial propia, con mapa de escenarios y formulario de booking.',
      project_froken_desc: 'Marca de moda femenina minimalista y selectiva. Catálogo con carrito, stock visible y asistente de soporte con IA.',
      project_wanderingdie_desc: 'Herramienta para la comunidad de D&D: quiz de 10 preguntas para elegir tu clase y un "Destiny Dice" digital para decisiones del día a día.',
      tag_ecommerce: 'E-commerce',
      tag_ai: 'Asistente IA',
      tag_food: 'Gastronomía',
      tag_music: 'Música',
      tag_landing: 'Landing premium',
      tag_booking: 'Booking',
      tag_fashion: 'Moda',
      tag_quiz: 'Quiz interactivo',
      tag_trilingual: 'Trilingüe',
      tag_gaming: 'Gaming',
      project_link: 'Ver sitio en vivo',
      project5_title: 'Próximo negocio',
      project5_desc: 'Todavía sin definir. Cada negocio nuevo se suma acá apenas encuentra su lugar.',

      servicios_eyebrow: 'Quién está del otro lado',
      servicios_title: 'Construyo cada sitio<br>como si fuera el mío.',
      servicios_text1: 'Soy Franco, y Tierra es mi estudio — trabajo solo, basado en Dinamarca. Me dedico a que pequeños negocios tengan, por fin, una identidad propia en internet: no un perfil más en una red social ajena.',
      servicios_text2: 'Combino diseño cuidado con tecnología práctica: e-commerce simple de usar, asistentes con inteligencia artificial cuando realmente suman, y sitios rápidos que no necesitan diez complementos para andar bien.',
      servicios_badge: 'Diseño + código,<br>de punta a punta',
      servicios_item1_title: 'Diseño a medida',
      servicios_item1_desc: 'Cada sitio parte de cero, pensado para la identidad del negocio que representa.',
      servicios_item2_title: 'E-commerce simple',
      servicios_item2_desc: 'Carritos y catálogos que tus clientes usan sin fricción.',
      servicios_item3_title: 'Asistentes con IA',
      servicios_item3_desc: 'Chat de soporte entrenado con la info real de tu negocio.',

      planes_eyebrow: 'Cómo trabajamos',
      planes_title: 'Dos formas de<br>empezar tu sitio.',
      planes_lead: 'Estructura general de precios — los detalles finales de tu proyecto los definimos juntos según lo que necesites.',
      plan_a_name: 'Plan A',
      plan_a_tag: 'Suscripción mensual',
      plan_a_period: 'kr. / mes',
      plan_a_desc: 'Yo me ocupo de todo el lado técnico — vos solo tenés que atender tu negocio.',
      plan_a_f1: 'Diseño y desarrollo del sitio a medida',
      plan_a_f2: 'Hosting incluido',
      plan_a_f3: 'Mantenimiento y actualizaciones continuas',
      plan_a_f4: 'Vos tenés acceso al dominio; yo administro los archivos y el hosting',
      plan_cta: 'Consultar por este plan',
      plan_b_name: 'Plan B',
      plan_b_tag: 'Pago único',
      plan_b_badge: 'Sin ataduras',
      plan_b_period: 'kr. único pago',
      plan_b_desc: 'Te entrego el sitio terminado y el control total queda en tus manos.',
      plan_b_f1: 'Diseño y desarrollo del sitio a medida',
      plan_b_f2: 'Dominio, hosting, mantenimiento y actualizaciones a tu cargo',
      plan_b_f3: 'Sin mensualidades ni dependencia de mí después de la entrega',
      plan_b_f4: 'Ideal si ya tenés (o vas a tener) tu propio soporte técnico',

      contacto_eyebrow: 'Contacto',
      contacto_title: 'Démosle a tu negocio<br>su lugar propio.',
      contacto_lead: 'Contame de qué se trata y qué te gustaría lograr. Te respondo por email.',
      form_name: 'Nombre',
      form_email: 'Email',
      form_business: 'Tu negocio',
      form_business_placeholder: 'Ej: "Panadería, tienda de ropa, estudio de yoga..."',
      form_message: 'Mensaje',
      form_message_placeholder: 'Contame un poco de tu negocio y qué te gustaría lograr con tu sitio.',
      form_submit: 'Enviar mensaje',
      form_note: 'Se abre tu programa de email con todo precargado — no se envía nada automáticamente todavía.',
      form_error: 'Completá tu nombre, email y mensaje antes de enviar.',

      footer_tagline: 'Un hogar digital para cada negocio, hecho desde Dinamarca.',
      footer_nav_label: 'Navegación',
      footer_contact_label: 'Contacto',
      footer_made: 'Hecho por Franco Mansilla',
      footer_copyright: 'Todos los derechos reservados.'
    },
    en: {
      nav_trabajos: 'Work',
      nav_servicios: 'Services',
      nav_planes: 'Plans',
      nav_contacto: 'Contact',
      nav_cta: 'Get in touch',

      hero_badge: 'Open to new businesses',
      hero_title_plain: 'Every business deserves',
      hero_title_accent: 'a digital home.',
      hero_subtitle: "I design and build sites made to measure, so your business finally has a place of its own on the internet — with a face, an identity, a name.",
      hero_cta_primary: 'See the work',
      hero_cta_ghost: 'Tell me your idea',
      hero_stat1_num: 'One-of-one',
      hero_stat1_label: 'every site built for a single business',
      hero_stat2_num: 'Direct',
      hero_stat2_label: "you talk to me, not a sales team",
      hero_stat3_num: 'DK',
      hero_stat3_label: 'work done from Denmark',

      marquee_1: 'Custom design',
      marquee_2: 'Brand identity',
      marquee_3: 'E-commerce',
      marquee_4: 'AI assistants',
      marquee_5: 'Animation',
      marquee_6: 'Hosting & maintenance',

      proyectos_eyebrow: 'Work',
      proyectos_title: 'Businesses that already<br>have a place.',
      proyectos_lead: 'Each with its own identity — built from scratch to represent what they already built.',
      status_live: 'Live',
      status_soon: 'Coming soon',

      project_anoranza_desc: 'Argentine bakery in Denmark. Its own home on the internet, with a catalog, shopping cart, and a support assistant that answers like someone from the shop would.',
      project_duosonus_desc: 'Accordion duo in Copenhagen. Its own editorial identity, with a tour map and a booking form.',
      project_froken_desc: 'Minimalist, selective womenswear brand. Catalog with cart, visible stock, and an AI support assistant.',
      project_wanderingdie_desc: 'A tool for the D&D community: a 10-question quiz to find your class, and a digital "Destiny Dice" for everyday decisions.',
      tag_ecommerce: 'E-commerce',
      tag_ai: 'AI assistant',
      tag_food: 'Food',
      tag_music: 'Music',
      tag_landing: 'Premium landing',
      tag_booking: 'Booking',
      tag_fashion: 'Fashion',
      tag_quiz: 'Interactive quiz',
      tag_trilingual: 'Trilingual',
      tag_gaming: 'Gaming',
      project_link: 'View live site',
      project5_title: 'Next business',
      project5_desc: "Still undecided. Every new business joins here as soon as it finds its place.",

      servicios_eyebrow: "Who's on the other end",
      servicios_title: 'I build every site<br>like it were my own.',
      servicios_text1: "I'm Franco, and Tierra is my studio — a one-person operation, based in Denmark. I help small businesses finally have an identity of their own on the internet, instead of just another profile on someone else's platform.",
      servicios_text2: 'I pair careful design with practical technology: e-commerce that\'s simple to use, AI assistants where they actually add value, and fast sites that don\'t need ten plugins to work well.',
      servicios_badge: 'Design + code,<br>start to finish',
      servicios_item1_title: 'Custom design',
      servicios_item1_desc: "Every site starts from zero, built for the identity of the business it represents.",
      servicios_item2_title: 'Simple e-commerce',
      servicios_item2_desc: 'Carts and catalogs your customers can use without friction.',
      servicios_item3_title: 'AI assistants',
      servicios_item3_desc: "A support chat trained on your business's real information.",

      planes_eyebrow: 'How we work',
      planes_title: 'Two ways to<br>start your site.',
      planes_lead: "General pricing structure — we work out the final details of your project together, based on what you need.",
      plan_a_name: 'Plan A',
      plan_a_tag: 'Monthly subscription',
      plan_a_period: 'kr. / month',
      plan_a_desc: "I handle everything technical — you just focus on your business.",
      plan_a_f1: 'Custom site design and development',
      plan_a_f2: 'Hosting included',
      plan_a_f3: 'Ongoing maintenance and updates',
      plan_a_f4: 'You keep access to the domain; I manage the files and hosting',
      plan_cta: 'Ask about this plan',
      plan_b_name: 'Plan B',
      plan_b_tag: 'One-time payment',
      plan_b_badge: 'No strings attached',
      plan_b_period: 'kr. one-time',
      plan_b_desc: "I hand you the finished site and full control stays in your hands.",
      plan_b_f1: 'Custom site design and development',
      plan_b_f2: 'Domain, hosting, maintenance and updates are yours',
      plan_b_f3: "No monthly fees, no dependence on me after delivery",
      plan_b_f4: "Ideal if you already have (or plan to have) your own technical support",

      contacto_eyebrow: 'Contact',
      contacto_title: "Let's give your business<br>a place of its own.",
      contacto_lead: "Tell me what it's about and what you'd like to achieve. I'll get back to you by email.",
      form_name: 'Name',
      form_email: 'Email',
      form_business: 'Your business',
      form_business_placeholder: 'E.g. "Bakery, clothing store, yoga studio..."',
      form_message: 'Message',
      form_message_placeholder: "Tell me a bit about your business and what you'd like your site to do.",
      form_submit: 'Send message',
      form_note: "Opens your email app with everything pre-filled — nothing is sent automatically yet.",
      form_error: 'Fill in your name, email and message before sending.',

      footer_tagline: 'A digital home for every business, built from Denmark.',
      footer_nav_label: 'Navigation',
      footer_contact_label: 'Contact',
      footer_made: 'Made by Franco Mansilla',
      footer_copyright: 'All rights reserved.'
    },
    da: {
      nav_trabajos: 'Arbejde',
      nav_servicios: 'Ydelser',
      nav_planes: 'Planer',
      nav_contacto: 'Kontakt',
      nav_cta: 'Skriv til mig',

      hero_badge: 'Åben for nye virksomheder',
      hero_title_plain: 'Enhver virksomhed fortjener',
      hero_title_accent: 'et digitalt hjem.',
      hero_subtitle: 'Jeg designer og bygger skræddersyede hjemmesider, så din virksomhed endelig får sit eget sted på internettet — med et ansigt, en identitet, et navn.',
      hero_cta_primary: 'Se arbejdet',
      hero_cta_ghost: 'Fortæl mig din idé',
      hero_stat1_num: 'Unik',
      hero_stat1_label: 'hver side bygget til én virksomhed',
      hero_stat2_num: 'Direkte',
      hero_stat2_label: 'du taler med mig, ikke et salgsteam',
      hero_stat3_num: 'DK',
      hero_stat3_label: 'arbejdet udført fra Danmark',

      marquee_1: 'Skræddersyet design',
      marquee_2: 'Brandidentitet',
      marquee_3: 'E-handel',
      marquee_4: 'AI-assistenter',
      marquee_5: 'Animation',
      marquee_6: 'Hosting og vedligeholdelse',

      proyectos_eyebrow: 'Arbejde',
      proyectos_title: 'Virksomheder der<br>har fundet deres sted.',
      proyectos_lead: 'Hver med sin egen identitet — bygget fra bunden til at repræsentere det, de allerede har skabt.',
      status_live: 'Live',
      status_soon: 'Kommer snart',

      project_anoranza_desc: 'Argentinsk bageri i Danmark. Sit eget hjem på internettet, med katalog, indkøbskurv og en supportassistent, der svarer, som nogen fra butikken ville.',
      project_duosonus_desc: 'Harmonikaduo i København. Sin egen redaktionelle identitet, med turnékort og bookingformular.',
      project_froken_desc: 'Minimalistisk, selektivt dametøjsmærke. Katalog med kurv, synlig lagerstatus og AI-supportassistent.',
      project_wanderingdie_desc: 'Et værktøj til D&D-fællesskabet: en quiz med 10 spørgsmål for at finde din klasse, og en digital "Destiny Dice" til hverdagens beslutninger.',
      tag_ecommerce: 'E-handel',
      tag_ai: 'AI-assistent',
      tag_food: 'Mad',
      tag_music: 'Musik',
      tag_landing: 'Premium landing',
      tag_booking: 'Booking',
      tag_fashion: 'Mode',
      tag_quiz: 'Interaktiv quiz',
      tag_trilingual: 'Trilingual',
      tag_gaming: 'Gaming',
      project_link: 'Se siden live',
      project5_title: 'Næste virksomhed',
      project5_desc: 'Stadig ikke bestemt. Hver ny virksomhed kommer med her, så snart den finder sit sted.',

      servicios_eyebrow: 'Hvem der er i den anden ende',
      servicios_title: 'Jeg bygger hver side,<br>som var det min egen.',
      servicios_text1: 'Jeg hedder Franco, og Tierra er mit studie — jeg arbejder alene, baseret i Danmark. Jeg hjælper små virksomheder med endelig at få deres egen identitet på internettet — ikke bare endnu en profil på en andens platform.',
      servicios_text2: 'Jeg kombinerer gennemtænkt design med praktisk teknologi: e-handel der er enkel at bruge, AI-assistenter hvor de reelt gør en forskel, og hurtige sider der ikke kræver ti plugins for at fungere godt.',
      servicios_badge: 'Design + kode,<br>fra start til slut',
      servicios_item1_title: 'Skræddersyet design',
      servicios_item1_desc: 'Hver side starter fra bunden, bygget til identiteten af den virksomhed, den repræsenterer.',
      servicios_item2_title: 'Enkel e-handel',
      servicios_item2_desc: 'Kurve og kataloger, dine kunder kan bruge uden besvær.',
      servicios_item3_title: 'AI-assistenter',
      servicios_item3_desc: 'En supportchat trænet på din virksomheds rigtige information.',

      planes_eyebrow: 'Sådan arbejder vi',
      planes_title: 'To måder at<br>starte din side på.',
      planes_lead: 'Generel prisstruktur — de sidste detaljer i dit projekt aftaler vi sammen, ud fra hvad du har brug for.',
      plan_a_name: 'Plan A',
      plan_a_tag: 'Månedligt abonnement',
      plan_a_period: 'kr. / md.',
      plan_a_desc: 'Jeg tager mig af alt det tekniske — du skal bare passe din virksomhed.',
      plan_a_f1: 'Skræddersyet design og udvikling af siden',
      plan_a_f2: 'Hosting inkluderet',
      plan_a_f3: 'Løbende vedligeholdelse og opdateringer',
      plan_a_f4: 'Du har adgang til domænet; jeg administrerer filer og hosting',
      plan_cta: 'Spørg om denne plan',
      plan_b_name: 'Plan B',
      plan_b_tag: 'Engangsbetaling',
      plan_b_badge: 'Ingen bindinger',
      plan_b_period: 'kr. engangsbeløb',
      plan_b_desc: 'Jeg leverer den færdige side, og du har fuld kontrol.',
      plan_b_f1: 'Skræddersyet design og udvikling af siden',
      plan_b_f2: 'Domæne, hosting, vedligeholdelse og opdateringer er dit ansvar',
      plan_b_f3: 'Ingen månedlige gebyrer, ingen afhængighed af mig efter levering',
      plan_b_f4: 'Ideel hvis du allerede har (eller får) din egen tekniske support',

      contacto_eyebrow: 'Kontakt',
      contacto_title: 'Lad os give din virksomhed<br>sit eget sted.',
      contacto_lead: 'Fortæl mig, hvad det handler om, og hvad du gerne vil opnå. Jeg svarer per email.',
      form_name: 'Navn',
      form_email: 'Email',
      form_business: 'Din virksomhed',
      form_business_placeholder: 'F.eks. "Bageri, tøjbutik, yogastudie..."',
      form_message: 'Besked',
      form_message_placeholder: 'Fortæl lidt om din virksomhed, og hvad du gerne vil have din side skal gøre.',
      form_submit: 'Send besked',
      form_note: 'Åbner dit emailprogram med alt udfyldt på forhånd — der sendes ikke noget automatisk endnu.',
      form_error: 'Udfyld navn, email og besked, før du sender.',

      footer_tagline: 'Et digitalt hjem til enhver virksomhed, bygget fra Danmark.',
      footer_nav_label: 'Navigation',
      footer_contact_label: 'Kontakt',
      footer_made: 'Lavet af Franco Mansilla',
      footer_copyright: 'Alle rettigheder forbeholdes.'
    }
  };

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (global.navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(nav) !== -1) return nav;
    return DEFAULT_LANG;
  }

  var currentLang = detectLang();
  var listeners = [];

  function t(key, vars) {
    var str = (DICT[currentLang] && DICT[currentLang][key]) || (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][key]) || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace('{' + k + '}', vars[k]);
      });
    }
    return str;
  }

  function getLang() { return currentLang; }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyToDOM();
    listeners.forEach(function (fn) { fn(lang); });
  }

  function onChange(fn) { listeners.push(fn); }

  function applyToDOM(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    scope.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    if (!root) {
      document.documentElement.setAttribute('lang', currentLang);
      scope.querySelectorAll('[data-lang-option]').forEach(function (el) {
        el.classList.toggle('is-active', el.getAttribute('data-lang-option') === currentLang);
      });
    }
  }

  global.i18n = { t: t, getLang: getLang, setLang: setLang, applyToDOM: applyToDOM, onChange: onChange, SUPPORTED: SUPPORTED };
})(window);
