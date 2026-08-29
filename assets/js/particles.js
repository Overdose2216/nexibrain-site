// NexiBrain — champ de particules du héros (canvas léger, sans dépendance).
// Se désactive si l'utilisateur préfère les animations réduites, et se met en
// pause hors écran ou quand l'onglet est masqué : aucun coût CPU inutile.
(function () {
  'use strict';

  var canvas = document.getElementById('particles');
  if (!canvas) return;

  // Animations reduites : on dessine le champ une seule fois, sans mouvement.
  // Le visuel reste, seule l'animation disparait.
  var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var w = 0, h = 0, dpr = 1;
  var running = false, rafId = null;

  var LINK_DIST = 150;       // distance max pour relier deux particules
  var COLOR = '28, 168, 239'; // --accent

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function build() {
    // Densité proportionnelle à la surface, plafonnée pour rester fluide sur mobile
    var count = Math.min(Math.round((w * h) / 13000), 90);
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.9,
        a: Math.random() * 0.5 + 0.35
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + COLOR + ',' + p.a + ')';
      ctx.fill();

      // Liens vers les voisines proches : l'opacité décroit avec la distance
      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          var o = (1 - Math.sqrt(d2) / LINK_DIST) * 0.24;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(' + COLOR + ',' + o + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    if (!still) rafId = requestAnimationFrame(frame);
  }

  function start() { if (!running) { running = true; frame(); } }
  // En mode fixe, un seul rendu suffit : pas de boucle, pas de reprise au scroll.
  function stop() { running = false; if (rafId) cancelAnimationFrame(rafId); rafId = null; }

  size();
  build();
  start();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { size(); build(); }, 200);
  });

  if (!still) {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
  }

  // Pause dès que le héros sort de l'écran
  if (!still && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) start(); else stop();
    }, { threshold: 0 }).observe(canvas);
  }
})();
