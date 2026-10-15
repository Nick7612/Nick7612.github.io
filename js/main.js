// Mobile nav, filters, lightbox, reveal, form, year
document.addEventListener('DOMContentLoaded', () => {
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (ham && links) ham.addEventListener('click', () => links.classList.toggle('open'));

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .card, .proj, .t-item').forEach(el => {
    el.classList.add('reveal'); io.observe(el);
  });

  // Project filters
  const filters = document.querySelectorAll('.filter');
  const projs = document.querySelectorAll('.proj');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projs.forEach(p => {
      p.classList.toggle('hide', f !== 'all' && p.dataset.cat !== f);
    });
  }));

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const close = document.getElementById('lightboxClose');
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src.replace('w=800', 'w=1400');
      lb.classList.add('open');
    });
  });
  const closeLb = () => lb && lb.classList.remove('open');
  if (close) close.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });

  // Contact form (front-end only — works on GitHub Pages, opens mail client)
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg = document.getElementById('cMsg').value.trim();
    const out = document.getElementById('formMsg');
    if (!name || !email || !msg) { out.textContent = 'Please fill in all fields.'; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { out.textContent = 'Enter a valid email.'; return; }
    out.textContent = `Thanks ${name}! This demo form doesn't send email on static hosting — replace with Formspree to go live.`;
    form.reset();
  });
});
