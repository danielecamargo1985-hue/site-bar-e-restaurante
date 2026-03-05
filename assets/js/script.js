/* ======================================
   BAR E RESTAURANTE - SABORES & ENCONTROS
   Main JavaScript
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

  // === Navbar Scroll Effect ===
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // === Active Nav Link on Scroll ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // === Scroll Animation (Intersection Observer) ===
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // === Back to Top on Logo Click (smooth) ===
  const logo = document.querySelector('.navbar-logo');
  if (logo) {
    logo.closest('a').addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Year auto-update in footer ===
  const yearEl = document.querySelector('.footer');
  if (yearEl) {
    const copyright = yearEl.querySelector('p');
    if (copyright) {
      copyright.innerHTML = copyright.innerHTML.replace(/© \d{4}/, `© ${new Date().getFullYear()}`);
    }
  }

});
