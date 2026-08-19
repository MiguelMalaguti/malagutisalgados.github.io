/* ============================================
   MALAGUTI SALGADOS & SUCOS
   Main JavaScript — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initLightbox();
  initSmoothScroll();
  initCurrentYear();
  initActiveNav();
});

/* ---------- Navbar scroll effect ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  function openMenu() {
    toggle.classList.add('active');
    navLinks.classList.add('open');
    overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---------- Scroll Reveal (Intersection Observer) ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox) return;

  // Open lightbox
  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-close')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---------- Current Year ---------- */
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Active Nav Link on Scroll ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActive() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}
