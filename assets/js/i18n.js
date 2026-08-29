// NexiBrain — bascule EN (défaut) / FR.
// Chaque élément traduisible porte data-fr="…" et un contenu TEXTE UNIQUEMENT
// (le texte anglais est celui du HTML). Les images localisées portent data-fr-src.
// Priorité : ?lang=fr|en dans l'URL (campagnes) > localStorage > anglais.
(function () {
  'use strict';
  var KEY = 'nexibrain-lang';

  function apply(lang) {
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
    try { localStorage.setItem(KEY, lang); } catch (e) { /* navigation privée */ }
    current = lang;
  }

  var current = 'en';
  var fromUrl = new URLSearchParams(window.location.search).get('lang');
  var lang = (fromUrl === 'fr' || fromUrl === 'en') ? fromUrl : null;
  if (!lang) { try { lang = localStorage.getItem(KEY); } catch (e) { lang = null; } }
  if (lang !== 'fr') lang = 'en';
  if (lang === 'fr') apply('fr');

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(current === 'fr' ? 'en' : 'fr');
    });
  });
})();
