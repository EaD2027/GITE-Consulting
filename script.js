(() => {
  'use strict';
  const nav = document.querySelector('#site-nav');
  const toggle = document.querySelector('.menu-toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold: 0.09});
    reveal.forEach(el => observer.observe(el));
  } else { reveal.forEach(el => el.classList.add('visible')); }
  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('nombre') || '').trim();
    const from = String(data.get('email') || '').trim();
    const topic = String(data.get('tema') || '').trim();
    const message = String(data.get('mensaje') || '').trim();
    const subject = `${window.GITE_CONFIG?.subjectPrefix || 'Consulta GITE'}: ${topic}`;
    const body = `Nombre: ${name}\nCorreo: ${from}\nTema: ${topic}\n\n${message}`;
    const email = (window.GITE_CONFIG?.contactEmail || '').trim();
    const status = document.querySelector('#form-status');
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Se abrió tu aplicación de correo. Revisá el mensaje y envialo desde allí.';
    } else {
      const draft = `${subject}\n\n${body}`;
      try {
        await navigator.clipboard.writeText(draft);
        status.textContent = 'Consulta copiada al portapapeles. Para habilitar el envío directo, configurá tu correo en config.js.';
      } catch {
        status.textContent = 'Para habilitar el envío directo, configurá tu correo en config.js. También podés copiar tu mensaje manualmente.';
      }
    }
  });
})();
