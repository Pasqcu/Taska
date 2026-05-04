// ============================================================
// TASKA WEBSITE — interaction script
// ============================================================

(function () {
  'use strict';

  // ----- Language switcher -----
  const STORAGE_KEY = 'taska-lang';
  const supported = ['it', 'en'];

  function detectInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (supported.includes(saved)) return saved;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return supported.includes(browser) ? browser : 'en';
  }

  function setLang(lang) {
    if (!supported.includes(lang)) return;
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.classList.toggle('active-lang', el.dataset.lang === lang);
    });
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
    });
    localStorage.setItem(STORAGE_KEY, lang);
    // Update document title if multilingual title is present
    const titleEl = document.querySelector('title[data-titles]');
    if (titleEl) {
      try {
        const map = JSON.parse(titleEl.dataset.titles);
        if (map[lang]) document.title = map[lang];
      } catch (e) {}
    }
  }

  function initLang() {
    setLang(detectInitialLang());
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.setLang));
    });
  }

  // ----- Sticky nav shadow on scroll -----
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----- Mobile hamburger -----
  function initMobileNav() {
    const ham = document.querySelector('.hamburger');
    const links = document.querySelector('.nav-links');
    if (!ham || !links) return;
    ham.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('mobile-open'))
    );
  }

  // ----- Scroll reveal -----
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // ----- Init on DOM ready -----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLang();
      initNav();
      initMobileNav();
      initReveal();
    });
  } else {
    initLang();
    initNav();
    initMobileNav();
    initReveal();
  }
})();
