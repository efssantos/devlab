/* =============================================
   SERANI — JAVASCRIPT (Microsoft Fluent Edition)
   ============================================= */

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  navbar.classList.toggle('scrolled', cur > 10);
  updateActiveNav();
  lastScroll = cur;
});

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- ACTIVE NAV ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const y = window.scrollY + 70;
  sections.forEach(sec => {
    const id  = sec.getAttribute('id');
    const lnk = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!lnk) return;
    lnk.classList.toggle('active', y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
  });
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const tgt = document.querySelector(a.getAttribute('href'));
    if (!tgt) return;
    e.preventDefault();
    const offset = 64;
    window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

// ---- SCROLL REVEAL ----
(function () {
  const els = document.querySelectorAll(
    '.svc-card, .why-card, .testi-card, .stat-card, .cert-item, .contact-form, .contact-left, .about-dashboard-wrap, .about-text-col'
  );
  els.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  els.forEach(el => io.observe(el));
})();

// ---- ANIMATED COUNTER ----
(function () {
  const nums = document.querySelectorAll('.stat-num[data-target]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const step   = Math.ceil(target / 50);
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString('pt-BR') + suffix;
          clearInterval(timer);
        } else {
          el.textContent = current.toLocaleString('pt-BR') + suffix;
        }
      }, 30);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => io.observe(el));
})();

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn     = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');

    btn.disabled = true;
    btnText.textContent = 'Enviando...';

    setTimeout(() => {
      btnText.textContent = '✓ Mensagem enviada com sucesso!';
      btn.style.background = '#107C10';
      btn.style.borderColor = '#107C10';

      setTimeout(() => {
        btnText.textContent = 'Enviar mensagem';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        contactForm.reset();
      }, 4000);
    }, 1500);
  });
}

// ---- HERO CARD HOVER GLOW (subtle Fluent) ----
document.querySelectorAll('.floating-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.background = `radial-gradient(ellipse at ${x}px ${y}px, rgba(0,120,212,0.04) 0%, #ffffff 70%)`;
  });
  card.addEventListener('mouseleave', () => { card.style.background = ''; });
});

// ---- SERVICE CARD TOP BORDER HIGHLIGHT ON HOVER ----
document.querySelectorAll('.svc-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const bar = card.querySelector('.svc-color-bar');
    if (bar) bar.style.height = '4px';
  });
  card.addEventListener('mouseleave', () => {
    const bar = card.querySelector('.svc-color-bar');
    if (bar) bar.style.height = '3px';
  });
});

console.log(
  '%c Serani | Microsoft Partner ',
  'background:#0078D4; color:#fff; font-size:14px; padding:6px 12px; border-radius:4px; font-weight:600;'
);
