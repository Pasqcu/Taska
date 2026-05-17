// ============================================================
// TASKA — interactions (Apple-inspired)
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
    // Swap language-aware hrefs (e.g. App Store IT vs US storefront)
    const hrefKey = lang === 'it' ? 'hrefIt' : 'hrefEn';
    document.querySelectorAll('[data-href-it][data-href-en]').forEach(el => {
      const href = el.dataset[hrefKey];
      if (href) el.setAttribute('href', href);
    });
    localStorage.setItem(STORAGE_KEY, lang);
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

  // ----- Sticky nav: switch between dark (hero) and light (light sections) -----
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    // Sections that should make the nav dark (over black background)
    const darkSelectors = ['.hero', '.feature.dark', '.how', '.final-cta', '.marquee'];
    const darkSections = darkSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));
    const navH = nav.offsetHeight;

    function updateNav() {
      const probeY = navH / 2 + 1;
      let overDark = false;
      for (const el of darkSections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) { overDark = true; break; }
      }
      nav.classList.toggle('dark', overDark);
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav, { passive: true });
  }

  // ----- Mobile menu -----
  function initMobileNav() {
    const ham = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (!ham || !links) return;
    ham.addEventListener('click', () => links.classList.toggle('mobile-open'));
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
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // ----- Subtle hero parallax on the phone mockup -----
  function initHeroParallax() {
    const phone = document.querySelector('.hero .phone');
    if (!phone || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        if (y < 800) {
          phone.style.transform = `translateY(${y * 0.06}px) scale(${1 - Math.min(y, 600) * 0.00012})`;
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----- Auto-close one FAQ when another opens (Apple-style) -----
  function initFaq() {
    document.querySelectorAll('.faq').forEach(group => {
      const items = group.querySelectorAll('details');
      items.forEach(d => {
        d.addEventListener('toggle', () => {
          if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
        });
      });
    });
  }

  function init() {
    initLang();
    initNav();
    initMobileNav();
    initReveal();
    initHeroParallax();
    initFaq();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
