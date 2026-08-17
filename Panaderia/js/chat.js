/* ==========================================================================
   AÑORANZA — Asistente de soporte (Gemini vía proxy propio)
   ========================================================================== */
(function () {
  'use strict';

  // TODO: reemplazar por la URL real del Worker después de `wrangler deploy`
  // (ver gemini-proxy/README.md). Ejemplo:
  // "https://anoranza-gemini-proxy.tu-subdominio.workers.dev"
  var CHAT_ENDPOINT = "https://anoranza-gemini-proxy.YOUR-SUBDOMAIN.workers.dev";

  var GREETING = "¡Hola! 👋 Soy el asistente virtual de Añoranza. Puedo ayudarte con dudas sobre nuestros productos, pedidos u horarios. ¿En qué te ayudo?";
  var FALLBACK_ERROR = "No pudimos conectar con el asistente en este momento. Mientras tanto, escribinos a hola@anoranza.dk y te respondemos apenas podamos.";

  var widget = document.getElementById('chatWidget');
  var fab = document.getElementById('chatFab');
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatClose');
  var messagesEl = document.getElementById('chatMessages');
  var quickEl = document.getElementById('chatQuick');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var sendBtn = document.getElementById('chatSend');

  if (!widget || !form) return;

  var history = [];
  var isLoading = false;
  var hasOpenedOnce = false;

  function cleanText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^[•\-]\s?/gm, '')
      .trim();
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(role, text) {
    var bubble = document.createElement('div');
    bubble.className = 'chat-msg chat-msg--' + role;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function addTypingIndicator() {
    var bubble = document.createElement('div');
    bubble.className = 'chat-msg chat-msg--assistant chat-msg--typing';
    bubble.innerHTML = '<i></i><i></i><i></i>';
    messagesEl.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function openChat() {
    widget.classList.add('is-open');
    fab.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    if (!hasOpenedOnce) {
      hasOpenedOnce = true;
      addMessage('assistant', GREETING);
    }
    setTimeout(function () { input.focus(); }, 300);
  }

  function closeChat() {
    widget.classList.remove('is-open');
    fab.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  fab.addEventListener('click', function () {
    if (widget.classList.contains('is-open')) closeChat();
    else openChat();
  });
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) closeChat();
  });

  function hideQuickChips() {
    quickEl.classList.add('is-hidden');
  }

  quickEl.querySelectorAll('.chat-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      sendMessage(chip.getAttribute('data-q'));
    });
  });

  function setLoading(state) {
    isLoading = state;
    sendBtn.disabled = state;
    input.disabled = state;
  }

  function sendMessage(text) {
    text = (text || '').trim();
    if (!text || isLoading) return;

    hideQuickChips();
    addMessage('user', text);
    input.value = '';
    setLoading(true);
    var typingBubble = addTypingIndicator();

    fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) throw new Error(data && data.error ? data.error : 'error');
          return data;
        });
      })
      .then(function (data) {
        typingBubble.remove();
        var reply = cleanText(data.reply || FALLBACK_ERROR);
        addMessage('assistant', reply);
        history.push({ role: 'user', text: text });
        history.push({ role: 'model', text: reply });
        if (history.length > 12) history = history.slice(-12);
      })
      .catch(function () {
        typingBubble.remove();
        addMessage('error', FALLBACK_ERROR);
      })
      .finally(function () {
        setLoading(false);
        input.focus();
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage(input.value);
  });

})();
