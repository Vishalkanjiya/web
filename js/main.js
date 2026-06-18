/* =========================================
   ATYA GLOBAL — Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky Nav --- */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* --- Mobile Hamburger --- */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navCta    = document.getElementById('navCta');

  function openMenu() {
    navMenu.classList.add('open');
    navCta.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent scroll behind menu
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navCta.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  /* Close menu on any nav link click */
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* Close menu on outside tap */
  document.addEventListener('click', (e) => {
    if (
      navMenu && navMenu.classList.contains('open') &&
      !nav.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* Close menu on resize to desktop */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  /* --- Scroll Reveal --- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => revealObs.observe(el));

  /* --- Contact Form --- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
      btn.style.background = 'var(--espresso)';
      btn.style.color = '#fff';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Enquiry';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

});
