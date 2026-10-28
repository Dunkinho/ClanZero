/* CLAN ZERO - CONFIGURA ESTOS DOS DATOS CUANDO LOS TENGAS */
const SITE_CONFIG = {
  discordInvite: '',          // Ejemplo: 'https://discord.gg/CQNq45GTaa'
  serverAddress: '',         // Ejemplo: '123.45.67.89:2001'
};

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  menu.hidden = isOpen;
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.hidden = true;
  menuToggle.setAttribute('aria-expanded','false');
}));

const trailerDialog = document.querySelector('#trailer-dialog');
const trailerVideo = trailerDialog.querySelector('video');
document.querySelectorAll('.js-open-trailer').forEach(button => {
  button.addEventListener('click', () => {
    trailerDialog.showModal();
    trailerVideo.currentTime = 0;
    trailerVideo.play().catch(() => {});
  });
});
trailerDialog.querySelector('.close-dialog').addEventListener('click', () => trailerDialog.close());
trailerDialog.addEventListener('close', () => trailerVideo.pause());
trailerDialog.addEventListener('click', event => {
  if (event.target === trailerDialog) trailerDialog.close();
});

const toast = document.querySelector('#site-toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}

document.querySelector('#discord-button').addEventListener('click', () => {
  if (SITE_CONFIG.discordInvite) {
    const url = new URL(SITE_CONFIG.discordInvite);
    if (url.protocol === 'https:') window.open(url.href, '_blank', 'noopener,noreferrer');
  } else showToast('El enlace de Discord estará disponible próximamente.');
});
document.querySelector('#copy-ip').addEventListener('click', async () => {
  if (!SITE_CONFIG.serverAddress) return showToast('La IP del servidor se anunciará próximamente.');
  try { await navigator.clipboard.writeText(SITE_CONFIG.serverAddress); showToast('IP copiada: ' + SITE_CONFIG.serverAddress); }
  catch { showToast('IP del servidor: ' + SITE_CONFIG.serverAddress); }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.10 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.hero-video')?.pause();
}
