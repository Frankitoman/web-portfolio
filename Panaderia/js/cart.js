/* ==========================================================================
   AÑORANZA — Productos y carrito
   ========================================================================== */
(function () {
  'use strict';

  var PRODUCTS = [
    { id: 'alfajor-dulce-de-leche', name: 'Alfajores de dulce de leche', desc: 'Caja x6 — el clásico de siempre, relleno bien generoso.', price: 145, image: 'assets/images/products/alfajor-dulce-de-leche.jpg' },
    { id: 'alfajor-chocolate', name: 'Alfajores bañados en chocolate', desc: 'Caja x6 — dulce de leche cubierto con chocolate negro.', price: 155, image: 'assets/images/products/alfajor-chocolate.jpg' },
    { id: 'alfajor-coco', name: 'Alfajores de coco', desc: 'Caja x6 — rebozados en coco rallado.', price: 145, image: 'assets/images/products/alfajor-coco.jpg' },
    { id: 'medialunas', name: 'Medialunas de manteca', desc: 'Caja x6 — bien dulces y hojaldradas.', price: 140, image: 'assets/images/product-medialunas.jpg' },
    { id: 'facturas-surtidas', name: 'Facturas surtidas', desc: 'Caja x6 — variedad de la casa.', price: 150, image: 'assets/images/products/facturas-surtidas.jpg' },
    { id: 'vigilantes', name: 'Vigilantes de dulce de leche', desc: 'Caja x4 — hojaldre relleno, bañados en almíbar.', price: 110, image: 'assets/images/products/vigilantes.jpg' },
    { id: 'canoncitos', name: 'Cañoncitos de dulce de leche', desc: 'Caja x4 — crocantes por fuera, cremosos por dentro.', price: 115, image: 'assets/images/products/canoncitos.jpg' },
    { id: 'empanadas-dulces', name: 'Empanadas dulces', desc: 'Caja x6 — de dulce de leche, recién horneadas.', price: 135, image: 'assets/images/products/empanadas-dulces.jpg' },
    { id: 'torta-manzana', name: 'Torta de manzana', desc: 'Entera — 8 a 10 porciones, ideal para cumpleaños.', price: 420, image: 'assets/images/products/torta-manzana.jpg' },
    { id: 'torta-chocolate', name: 'Torta de chocolate y dulce de leche', desc: 'Entera — 8 a 10 porciones, capas de bizcochuelo y ganache.', price: 460, image: 'assets/images/products/torta-chocolate.jpg' }
  ];

  var STORAGE_KEY = 'anoranza_cart';

  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  var cart = loadCart();

  function findProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  function findCartLine(id) {
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) return cart[i];
    return null;
  }

  function addToCart(id) {
    var line = findCartLine(id);
    if (line) line.qty += 1;
    else cart.push({ id: id, qty: 1 });
    saveCart();
    renderCart();
  }

  function setQty(id, qty) {
    var line = findCartLine(id);
    if (!line) return;
    if (qty <= 0) {
      cart = cart.filter(function (l) { return l.id !== id; });
    } else {
      line.qty = qty;
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(function (l) { return l.id !== id; });
    saveCart();
    renderCart();
  }

  function cartCount() {
    return cart.reduce(function (sum, l) { return sum + l.qty; }, 0);
  }

  function cartTotal() {
    return cart.reduce(function (sum, l) {
      var p = findProduct(l.id);
      return sum + (p ? p.price * l.qty : 0);
    }, 0);
  }

  function formatPrice(n) {
    return n.toLocaleString('da-DK') + ' kr.';
  }

  /* ---------- Render products grid ---------- */
  var grid = document.getElementById('productsGrid');
  if (grid) {
    grid.innerHTML = PRODUCTS.map(function (p, i) {
      return (
        '<article class="product-card" data-reveal style="transition-delay:' + ((i % 4) * 60) + 'ms">' +
          '<div class="photo photo--product"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy"></div>' +
          '<div class="product-card__body">' +
            '<h3>' + p.name + '</h3>' +
            '<p>' + p.desc + '</p>' +
            '<div class="product-card__footer">' +
              '<span class="product-card__price">' + formatPrice(p.price) + '</span>' +
              '<button class="product-card__add" type="button" data-add="' + p.id + '">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 4h2l1.4 11.2A2 2 0 008.4 17h9.2a2 2 0 002-1.7L21 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="21" r="1.4" fill="currentColor"/><circle cx="17" cy="21" r="1.4" fill="currentColor"/></svg>' +
                '<span>Agregar</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-add]');
      if (!btn) return;
      addToCart(btn.getAttribute('data-add'));
      var label = btn.querySelector('span');
      var original = label.textContent;
      btn.classList.add('is-added');
      label.textContent = 'Agregado ✓';
      setTimeout(function () {
        btn.classList.remove('is-added');
        label.textContent = original;
      }, 1100);
    });

    // Reveal observer for dynamically-created product cards (main.js already ran on static content)
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      grid.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
    } else {
      grid.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ---------- Cart UI ---------- */
  var cartBtn = document.getElementById('cartBtn');
  var cartCountEl = document.getElementById('cartCount');
  var backdrop = document.getElementById('cartBackdrop');
  var drawer = document.getElementById('cartDrawer');
  var closeBtn = document.getElementById('cartClose');
  var itemsEl = document.getElementById('cartItems');
  var emptyEl = document.getElementById('cartEmpty');
  var footerEl = document.getElementById('cartFooter');
  var subtotalEl = document.getElementById('cartSubtotal');
  var checkoutBtn = document.getElementById('cartCheckout');

  function renderCart() {
    var count = cartCount();
    if (cartCountEl) {
      cartCountEl.textContent = String(count);
      cartCountEl.hidden = count === 0;
    }

    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = '';
      itemsEl.hidden = true;
      if (emptyEl) emptyEl.hidden = false;
      if (footerEl) footerEl.hidden = true;
      return;
    }

    itemsEl.hidden = false;
    if (emptyEl) emptyEl.hidden = true;
    if (footerEl) footerEl.hidden = false;

    itemsEl.innerHTML = cart.map(function (line) {
      var p = findProduct(line.id);
      if (!p) return '';
      return (
        '<div class="cart-item" data-line="' + p.id + '">' +
          '<div class="cart-item__photo"><img src="' + p.image + '" alt=""></div>' +
          '<div class="cart-item__info">' +
            '<strong>' + p.name + '</strong>' +
            '<span class="cart-item__price">' + formatPrice(p.price) + '</span>' +
          '</div>' +
          '<div class="cart-item__qty">' +
            '<button type="button" data-qty-down aria-label="Quitar uno">−</button>' +
            '<span>' + line.qty + '</span>' +
            '<button type="button" data-qty-up aria-label="Agregar uno">+</button>' +
          '</div>' +
          '<button class="cart-item__remove" type="button" data-remove aria-label="Eliminar del carrito">' +
            '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
          '</button>' +
        '</div>'
      );
    }).join('');

    if (subtotalEl) subtotalEl.textContent = formatPrice(cartTotal());
  }

  if (itemsEl) {
    itemsEl.addEventListener('click', function (e) {
      var line = e.target.closest('.cart-item');
      if (!line) return;
      var id = line.getAttribute('data-line');
      var current = findCartLine(id);
      if (!current) return;

      if (e.target.closest('[data-qty-up]')) setQty(id, current.qty + 1);
      else if (e.target.closest('[data-qty-down]')) setQty(id, current.qty - 1);
      else if (e.target.closest('[data-remove]')) removeFromCart(id);
    });
  }

  function openCart() {
    if (backdrop) backdrop.classList.add('is-open');
    if (drawer) { drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); }
  }
  function closeCart() {
    if (backdrop) backdrop.classList.remove('is-open');
    if (drawer) { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (backdrop) backdrop.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeCart();
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      var lines = cart.map(function (l) {
        var p = findProduct(l.id);
        return p ? (l.qty + 'x ' + p.name + ' (' + formatPrice(p.price * l.qty) + ')') : '';
      }).filter(Boolean);

      var summary = 'Quiero encargar:\n' + lines.map(function (l) { return '- ' + l; }).join('\n') +
        '\n\nTotal: ' + formatPrice(cartTotal());

      var messageField = document.getElementById('message');
      if (messageField) messageField.value = summary;

      closeCart();

      var contactSection = document.getElementById('contacto');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { if (messageField) messageField.focus(); }, 500);
    });
  }

  renderCart();
})();
