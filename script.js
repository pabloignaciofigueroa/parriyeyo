'use strict';
const $ = (selector) => document.querySelector(selector);
const menu = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menú'); navigation.classList.remove('is-open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
$('#year').textContent = new Date().getFullYear();
const today = new Date();
$('#date').min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

// Las cantidades orientan la consulta; no son paquetes ni precios cerrados.
document.querySelectorAll('[data-guests]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-guests]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const more = button.dataset.guests === 'more';
    $('#guests').value = more ? '' : button.dataset.guests;
    $('#format-status').textContent = more
      ? 'Para más de 40 invitados, indica la cantidad estimada en el formulario. Revisaremos menú y operación contigo.'
      : `Prepararemos tu consulta para ${button.dataset.guests} invitados. Menú, cantidades y valor se confirman en la propuesta.`;
    $('#format-cta').textContent = more ? 'Indicar número de invitados ↗' : `Cotizar para ${button.dataset.guests} invitados ↗`;
    $('#format-cta').dataset.more = String(more);
  });
});
$('#format-cta').addEventListener('click', () => {
  if ($('#format-cta').dataset.more === 'true') $('#guests').focus({ preventScroll: true });
});
$('#guests').addEventListener('input', () => {
  document.querySelectorAll('[data-guests]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.guests === $('#guests').value)));
});
document.querySelectorAll('[data-event]').forEach(link => link.addEventListener('click', () => {
  $('#occasion').value = link.dataset.event;
}));

const content = window.PARRIYEYO_CONTENT || {};
if (content.featuredDish) {
  const heading = [...document.querySelectorAll('.dish h3')].find(el => el.textContent === content.featuredDish);
  if (heading) {
    const badge = document.createElement('span');
    badge.className = 'dish-feature';
    badge.textContent = content.featuredLabel || 'De nuestra cocina';
    heading.closest('.dish').querySelector('.dish-photo').append(badge);
  }
}
function safeHttps(value) { try { return new URL(value).protocol === 'https:'; } catch { return false; } }
(content.partners || []).forEach(partner => {
  if (!partner.name || !safeHttps(partner.url)) return;
  const link = document.createElement('a');
  link.href = partner.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
  if (partner.logo && /^assets\/[a-z0-9_./-]+$/i.test(partner.logo) && !partner.logo.includes('..')) {
    const img = document.createElement('img'); img.src = partner.logo; img.alt = partner.name; img.loading = 'lazy'; link.append(img);
  } else { link.textContent = partner.name; }
  $('#partner-list').append(link);
});
$('#aliados').hidden = !$('#partner-list').children.length;
if (content.conditionsPdf && /^assets\/[a-z0-9_/-]+\.pdf$/i.test(content.conditionsPdf) && !content.conditionsPdf.includes('..')) {
  $('#conditions-link').href = content.conditionsPdf;
  $('#conditions-download').hidden = false;
}

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); });
});
const gallery = [...document.querySelectorAll('[data-gallery]')];
const galleryDialog = $('#gallery-dialog');
let activeImage = 0;
function showImage(index) {
  activeImage = (index + gallery.length) % gallery.length;
  const item = gallery[activeImage];
  $('#gallery-image').src = item.dataset.gallery;
  $('#gallery-image').alt = item.querySelector('img').alt;
  $('#gallery-caption').textContent = `${activeImage + 1} / ${gallery.length} — ${item.dataset.caption}`;
}
gallery.forEach((item, index) => item.addEventListener('click', () => { showImage(index); galleryDialog.showModal(); }));
$('#previous-image').addEventListener('click', () => showImage(activeImage - 1));
$('#next-image').addEventListener('click', () => showImage(activeImage + 1));
galleryDialog.addEventListener('keydown', event => { if (event.key === 'ArrowRight') { event.preventDefault(); showImage(activeImage + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(activeImage - 1); } });
const video = $('#brand-video');
$('[data-video]').addEventListener('click', () => { $('#video-dialog').showModal(); video.play().catch(() => { /* Los controles nativos permiten iniciar manualmente. */ }); });
$('#video-dialog').addEventListener('close', () => video.pause());

const form = $('#quote-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = $('#name').value.trim();
  const place = $('#place').value.trim();
  if (!name || !place) { const input = !name ? $('#name') : $('#place'); input.setCustomValidity('Completa este dato para preparar tu consulta.'); input.reportValidity(); input.addEventListener('input', () => input.setCustomValidity(''), { once: true }); return; }
  const date = $('#date').value;
  const formattedDate = date ? new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`)) : 'Por definir';
  $('#quote-message').value = `¡Hola, Parriyeyo! Soy ${name} y me gustaría cotizar un evento.\n\nOcasión: ${$('#occasion').value}\nFecha estimada: ${formattedDate}\nInvitados: ${$('#guests').value}\nLugar: ${place}\n${$('#details').value.trim() ? `\nMás detalles: ${$('#details').value.trim()}\n` : ''}\n¿Podemos conversar sobre disponibilidad y una propuesta?`;
  $('#copy-status').textContent = 'El mensaje todavía no se ha enviado.';
  $('#copy-message').innerHTML = 'Copiar mensaje <span aria-hidden="true">↗</span>';
  $('#quote-dialog').showModal();
});
$('#copy-message').addEventListener('click', async () => {
  const message = $('#quote-message');
  try { await navigator.clipboard.writeText(message.value); $('#copy-status').textContent = 'Mensaje copiado. Abre Instagram, pulsa «Mensaje» y pégalo para enviarlo.'; $('#copy-message').textContent = '¡Mensaje copiado!'; }
  catch { message.focus(); message.select(); $('#copy-status').textContent = 'Seleccionamos tu mensaje. Usa la opción Copiar de tu dispositivo y pégalo en Instagram.'; }
});

// Movimiento progresivo: el contenido permanece visible sin JavaScript.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const entrances = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!motionPreference.matches) {
        entry.target.animate(
          [{ transform: 'translateY(22px)' }, { transform: 'translateY(0)' }],
          { duration: 750, easing: 'cubic-bezier(.16,1,.3,1)' }
        );
      }
      entrances.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.dish, .chef-image, .section-heading').forEach(el => entrances.observe(el));
}
