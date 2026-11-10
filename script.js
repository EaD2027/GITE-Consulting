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
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold: 0.09});
    reveal.forEach(el => observer.observe(el));
  } else { reveal.forEach(el => el.classList.add('visible')); }

  // Listado de publicaciones — sin contenido inventado.
  const pubGrid = document.querySelector('#publication-list');
  if (pubGrid) {
    const category = pubGrid.dataset.category;
    const records = window.GITE_PUBLICACIONES?.[category];
    const items = Array.isArray(records) ? records : [];
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'pub-empty';
      const mark = document.createElement('span'); mark.className = 'pub-empty-mark'; mark.textContent = '↗';
      const heading = document.createElement('h3'); heading.textContent = 'Publicaciones por incorporar';
      const description = document.createElement('p'); description.textContent = pubGrid.dataset.empty || 'Todavía no se cargaron publicaciones.';
      empty.append(mark, heading, description);
      pubGrid.appendChild(empty);
    } else {
      items.forEach((item, idx) => {
        const card = document.createElement('article'); card.className = 'pub-entry';
        const kicker = document.createElement('div'); kicker.className = 'pub-entry-kicker';
        kicker.textContent = `${String(idx + 1).padStart(2,'0')} / ${String(item.anio || 'Año sin especificar')}`;
        const title = document.createElement('h3'); title.textContent = item.titulo || 'Título pendiente';
        const authors = document.createElement('p'); authors.className = 'pub-entry-authors'; authors.textContent = item.autores || '';
        const ref = document.createElement('p'); ref.className = 'pub-entry-reference'; ref.textContent = item.referencia || '';
        card.append(kicker, title, authors, ref);
        if (item.resumen) {const summary = document.createElement('p'); summary.className = 'pub-entry-summary'; summary.textContent = item.resumen; card.appendChild(summary);}
        if (typeof item.url === 'string' && (/^https:\/\//i.test(item.url) || /^assets\/documentos\/[a-z0-9_./-]+\.pdf$/i.test(item.url))) {
          const link = document.createElement('a'); link.className = 'pub-entry-link'; link.href = item.url;
          link.textContent = item.enlaceTexto || 'Consultar publicación ↗';
          if (item.url.startsWith('https://')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
          card.appendChild(link);
        }
        pubGrid.appendChild(card);
      });
    }
  }

  // Tarjetas del equipo, configurables desde equipo.js.
  const grid = document.querySelector('#team-grid');
  const people = Array.isArray(window.GITE_EQUIPO) ? window.GITE_EQUIPO : [];
  const placeholder = 'assets/equipo/avatar-placeholder.svg';
  const safeUrl = value => {
    if (typeof value !== 'string') return null;
    const url = value.trim();
    if (/^https:\/\//i.test(url) || /^mailto:[^\s@]+@[^\s@]+$/i.test(url)) return url;
    return null;
  };
  if (grid) {
    people.forEach(person => {
      const card = document.createElement('article');
      card.className = 'team-card reveal visible';
      const photo = document.createElement('div');
      photo.className = 'team-photo';
      const image = document.createElement('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.src = typeof person.foto === 'string' && person.foto ? person.foto : placeholder;
      image.alt = `Fotografía de ${person.nombre || 'integrante del equipo'}`;
      image.onerror = () => { image.onerror = null; image.src = placeholder; image.alt = 'Imagen ilustrativa: fotografía pendiente'; };
      photo.appendChild(image);
      const content = document.createElement('div');
      content.className = 'team-card-body';
      const role = document.createElement('p');
      role.className = 'team-role';
      role.textContent = person.rol || 'Integrante GITE';
      const name = document.createElement('h3');
      name.textContent = person.nombre || 'Nombre y apellido';
      const bio = document.createElement('p');
      bio.className = 'team-bio';
      bio.textContent = person.perfil || '';
      content.append(role, name, bio);
      if (Array.isArray(person.areas) && person.areas.length) {
        const tags = document.createElement('div');
        tags.className = 'team-areas';
        person.areas.forEach(area => {
          const tag = document.createElement('span');
          tag.textContent = area;
          tags.appendChild(tag);
        });
        content.appendChild(tags);
      }
      if (Array.isArray(person.enlaces) && person.enlaces.length) {
        const links = document.createElement('div');
        links.className = 'team-links';
        person.enlaces.forEach(item => {
          const href = safeUrl(item.url);
          if (!href) return;
          const a = document.createElement('a');
          a.href = href;
          a.textContent = item.texto || 'Ver perfil';
          if (href.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
          links.appendChild(a);
        });
        content.appendChild(links);
      }
      card.append(photo, content);
      grid.appendChild(card);
    });
  }
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
  // Permite pausar la animación por preferencia del visitante.
  const motionToggle = document.querySelector('.motion-toggle');
  const heroVisual = document.querySelector('.hero-visual');
  motionToggle?.addEventListener('click', () => {
    const paused = heroVisual.classList.toggle('is-paused');
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.setAttribute('aria-label', paused ? 'Reanudar animación de las figuras' : 'Pausar animación de las figuras');
    motionToggle.innerHTML = paused ? 'Reanudar movimiento <span aria-hidden="true">▶</span>' : 'Pausar movimiento <span aria-hidden="true">Ⅱ</span>';
  });
})();
