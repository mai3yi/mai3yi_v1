/* ===== GLOBAL VARIABLES ===== */
const body = document.body;
const navLinks = document.querySelectorAll('#nav a');
const sections = document.querySelectorAll('.section');
const intro = document.querySelector('#landing');
const scrollCue = document.querySelector('.scroll-indicator');

/* === 1. NAV HIGHLIGHT ON SCROLL === */
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) link.classList.add('active');
  });

  if (scrollCue) {
    scrollCue.style.opacity = window.scrollY > window.innerHeight * 0.3 ? 0 : 1;
  }
});

/* === 2. SMOOTH SCROLL === */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* === 3. PARALLAX LANDING === */
if (intro) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    intro.style.transform = `translateY(${scrolled * 0.25}px)`;
    intro.style.opacity = Math.max(1 - scrolled / 500, 0.3);
  });
}

/* === 4. GLITCH EFFECT FOR TITLES === */
function glitchText(element, intensity = 2, interval = 60) {
  const text = element.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let timer;
  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }
  function glitchCycle() {
    let output = '';
    for (let i = 0; i < text.length; i++) {
      output += Math.random() < 0.1 * intensity ? randomChar() : text[i];
    }
    element.textContent = output;
  }
  element.addEventListener('mouseenter', () => {
    clearInterval(timer);
    timer = setInterval(glitchCycle, interval);
  });
  element.addEventListener('mouseleave', () => {
    clearInterval(timer);
    element.textContent = text;
  });
}
document.querySelectorAll('.section h2').forEach(h => glitchText(h, 1.5));

/* === 5. PROJECT TILE INTERACTION === */
document.querySelectorAll('.project').forEach(tile => {
  tile.addEventListener('mouseenter', () => {
    tile.style.zIndex = 10;
    tile.style.filter = 'contrast(1.2) brightness(1.1)';
  });
  tile.addEventListener('mouseleave', () => {
    tile.style.zIndex = '';
    tile.style.filter = '';
  });
});

/* === 6. PROCESS ITEM OVERLAY REVEAL === */
document.querySelectorAll('.process-item').forEach(item => {
  const overlay = item.querySelector('.overlay');
  if (!overlay) return;
  item.addEventListener('mouseenter', () => (overlay.style.background = 'rgba(0,0,0,0.9)'));
  item.addEventListener('mouseleave', () => (overlay.style.background = 'rgba(0,0,0,0.7)'));
});

/* === 7. UNIVERSAL IMAGE ZOOM MODAL === */
const modal = document.createElement('div');
modal.id = 'img-modal';
const modalImg = document.createElement('img');
modal.appendChild(modalImg);
document.body.appendChild(modal);

function setupZoom(images) {
  images.forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = img.src;
    });
  });
}

// Applies to documentation, galleries, and Occluder carousel
setupZoom(document.querySelectorAll('.gallery img'));
setupZoom(document.querySelectorAll('.carousel.fullscreen img'));
setupZoom(document.querySelectorAll('.project img'));
setupZoom(document.querySelectorAll('.gallery-card img'));

modal.addEventListener('click', e => {
  if (e.target === modalImg) {
    modalImg.classList.toggle('zoomed');
  } else {
    modal.classList.remove('active');
    modalImg.classList.remove('zoomed');
  }
});

/* === 8. OCCLUDER CAROUSEL === */
(() => {
  const carousel = document.querySelector('.carousel.fullscreen');
  if (!carousel) return;

  const images = carousel.querySelectorAll('img');
  const next = carousel.querySelector('.next');
  const prev = carousel.querySelector('.prev');
  let current = 0;

  const showImage = i => {
    images.forEach(img => img.classList.remove('active'));
    images[i].classList.add('active');
  };

  next.addEventListener('click', () => {
    current = (current + 1) % images.length;
    showImage(current);
  });

  prev.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next.click();
    if (e.key === 'ArrowLeft') prev.click();
    if (e.key === 'Escape') modal.classList.remove('active');
  });
})();

/* === 9. RANDOM FOOTER SIGNALS === */
const footer = document.querySelector('footer');
if (footer) {
  const phrases = [
    '[signal restored]',
    '[scanning memory sectors...]',
    '[connection: stable]',
    '[rebuilding index...]',
    '[data integrity: 97.4%]'
  ];
  setInterval(() => {
    const p = document.createElement('p');
    p.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    p.style.fontFamily = 'IBM Plex Mono, monospace';
    p.style.color = 'rgba(255,255,255,0.2)';
    p.style.fontSize = '0.7rem';
    footer.appendChild(p);
    setTimeout(() => p.remove(), 4000);
  }, 6000);
}
/* === OCCLUDER LIGHT FADE === */
window.addEventListener('DOMContentLoaded', () => {
  if (document.title.includes('Occluder')) {
    document.body.classList.add('occluder-light');
  }
});
