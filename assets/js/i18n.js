// NexiBrain — bascule EN / FR (défaut EN, sauf page avec data-default="fr" sur le <script>).
// Chaque élément traduisible porte data-fr="…" et un contenu TEXTE UNIQUEMENT
// (le texte anglais est celui du HTML). Les images localisées portent data-fr-src.
// Priorité : ?lang=fr|en dans l'URL (campagnes) > localStorage > défaut de la page.
(function () {
  'use strict';
  var KEY = 'nexibrain-lang';

  function render(lang) {
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.textContent;
      el.textContent = lang === 'fr' ? el.dataset.fr : el.dataset.en;
    });
    document.querySelectorAll('[data-fr-src]').forEach(function (el) {
      if (el.dataset.enSrc === undefined) el.dataset.enSrc = el.getAttribute('src');
      el.setAttribute('src', lang === 'fr' ? el.dataset.frSrc : el.dataset.enSrc);
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'fr' ? 'EN' : 'FR';
      btn.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    });
    current = lang;
  }

  function setLang(lang) {
    render(lang);
    try { localStorage.setItem(KEY, lang); } catch (e) { /* navigation privée */ }
  }

  var current = 'en';
  var defaultLang = (document.currentScript && document.currentScript.dataset.default === 'fr') ? 'fr' : 'en';
  var fromUrl = new URLSearchParams(window.location.search).get('lang');
  // Un choix explicite (URL ou déjà mémorisé) prime sur le défaut de la page,
  // mais le défaut lui-même n'est jamais mémorisé pour ne pas "fuiter" vers les autres pages.
  var explicit = (fromUrl === 'fr' || fromUrl === 'en') ? fromUrl : null;
  if (!explicit) {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === 'fr' || stored === 'en') explicit = stored;
    } catch (e) { /* navigation privée */ }
  }
  if (explicit) { setLang(explicit); }
  else if (defaultLang === 'fr') { render('fr'); }

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(current === 'fr' ? 'en' : 'fr');
    });
  });
})();
