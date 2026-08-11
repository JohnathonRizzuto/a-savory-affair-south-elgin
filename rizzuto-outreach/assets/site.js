/* Rizzuto Outreach - shared behavior */
(function () {
  'use strict';

  var hdr = document.getElementById('hdr');
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var isDesktop = function () { return window.matchMedia('(min-width: 1001px)').matches; };

  /* Sticky header + hero parallax */
  function onScroll() {
    if (hdr) {
      if (window.scrollY > 80) hdr.classList.add('scrolled');
      else hdr.classList.remove('scrolled');
    }
    var y = window.scrollY;
    var blobs = document.querySelectorAll('[data-par]');
    for (var i = 0; i < blobs.length; i++) {
      var f = parseFloat(blobs[i].getAttribute('data-par'));
      blobs[i].style.transform = 'translate3d(0,' + (y * f) + 'px,0)';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* Dropdowns - hover on desktop, tap to expand on mobile */
  var drops = document.querySelectorAll('.dropdown');
  for (var d = 0; d < drops.length; d++) {
    (function (drop) {
      var btn = drop.querySelector('.drop-btn');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var open = drop.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      drop.addEventListener('mouseenter', function () {
        if (!isDesktop()) return;
        drop.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      });
      drop.addEventListener('mouseleave', function () {
        if (!isDesktop()) return;
        drop.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    })(drops[d]);
  }
  document.addEventListener('click', function (e) {
    if (!isDesktop()) return;
    for (var i = 0; i < drops.length; i++) {
      if (!drops[i].contains(e.target)) drops[i].classList.remove('open');
    }
  });

  /* Scroll reveal with per-group stagger */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var sibs = en.target.parentElement
          ? en.target.parentElement.querySelectorAll(':scope > .reveal')
          : [];
        var idx = Array.prototype.indexOf.call(sibs, en.target);
        en.target.style.transitionDelay = (idx > 0 ? Math.min(idx, 6) * 0.09 : 0) + 's';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  } else {
    for (var k = 0; k < items.length; k++) items[k].classList.add('in');
  }

  /* Current year */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Contact form -> prefilled email */
  var form = document.getElementById('ctform');
  if (form) {
    var note = document.getElementById('fnote');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (id) {
        var el = document.getElementById(id);
        return el ? (el.value || '').trim() : '';
      };
      var name = g('f-name');
      var email = g('f-email');
      if (!name || !email) {
        note.textContent = 'Please add your name and email so we can write back.';
        note.style.color = '#E2C68E';
        return;
      }
      var ctx = form.getAttribute('data-context') || '';
      var lines = [
        'Name: ' + name,
        'Business: ' + (g('f-biz') || '-'),
        'Email: ' + email,
        'Phone: ' + (g('f-phone') || '-'),
        'Town: ' + (g('f-town') || '-'),
        'Interested in: ' + (document.getElementById('f-svc') ? document.getElementById('f-svc').value : '-'),
        '',
        g('f-msg') || '(no message)',
        '',
        ctx ? '--- ' + ctx : ''
      ];
      var subject = 'New inquiry from ' + name + (g('f-biz') ? ' - ' + g('f-biz') : '');
      window.location.href =
        'mailto:johnnyrizzuto125@gmail.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(lines.join('\n'));
      note.textContent = 'Opening your email app... if nothing happens, write to johnnyrizzuto125@gmail.com';
      note.style.color = '#E2C68E';
    });
  }
})();
