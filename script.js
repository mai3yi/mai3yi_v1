/* GLOBAL VARIABLES */
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
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });

  // Fade out landing scroll indicator
  if (window.scrollY > window.innerHeight * 0.3) {
    scrollCue.style.opacity = 0;
  } else {
    scrollCue.style.opacity = 1;
  }
});

/* === 2. SCROLL SMOOTHNESS === */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

/* === 3. PARALLAX INTRO BACKGROUND === */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  intro.style.transform = `translateY(${scrolled * 0.25}px)`;
  intro.style.opacity = Math.max(1 - scrolled / 500, 0.3);
});

/* === 4. GLITCH TEXT EFFECT FOR TITLES === */
function glitchText(element, intensity = 2, interval = 60) {
  const text = element.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let glitchTimer;

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
    clearInterval(glitchTimer);
    glitchTimer = setInterval(glitchCycle, interval);
  });

  element.addEventListener('mouseleave', () => {
    clearInterval(glitchTimer);
    element.textContent = text;
  });
}

// Apply glitch to all section headers
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
  item.addEventListener('mouseenter', () => {
    const overlay = item.querySelector('.overlay');
    overlay.style.background = 'rgba(0,0,0,0.9)';
    overlay.style.transform = 'translateY(-5px)';
  });
  item.addEventListener('mouseleave', () => {
    const overlay = item.querySelector('.overlay');
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.transform = 'translateY(0)';
  });
});

/* === 7. KEYBOARD NOISE GLITCH (ambient) === */
let lastNoise = 0;
document.addEventListener('keydown', e => {
  if (Date.now() - lastNoise < 200) return;
  lastNoise = Date.now();

  const flash = document.createElement('div');
  flash.className = 'screen-flash';
  flash.style.position = 'fixed';
  flash.style.top = 0;
  flash.style.left = 0;
  flash.style.width = '100%';
  flash.style.height = '100%';
  flash.style.background = `rgba(59,95,255,${Math.random() * 0.05})`;
  flash.style.pointerEvents = 'none';
  flash.style.mixBlendMode = 'screen';
  flash.style.transition = 'opacity 0.3s ease';
  body.appendChild(flash);

  setTimeout(() => (flash.style.opacity = 0), 50);
  setTimeout(() => flash.remove(), 300);
});

/* === 8. RANDOM DATA STREAM TICKER (OPTIONAL) === */
// adds “ambient signal” text at footer
const footer = document.querySelector('footer');
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
/* === UNIVERSAL IMAGE ZOOM MODAL === */
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

// Apply to both galleries and project cards
setupZoom(document.querySelectorAll('.gallery-card img'));
setupZoom(document.querySelectorAll('.project img'));

modal.addEventListener('click', e => {
  if (e.target === modalImg) {
    modalImg.classList.toggle('zoomed');
  } else {
    modal.classList.remove('active');
    modalImg.classList.remove('zoomed');
  }
});
/* === AUTOPLAY GLITCH ON LOAD === */
function autoGlitch(element, intensity = 2, duration = 2000, interval = 120) {
  const text = element.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let timer;

  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function cycle() {
    let output = '';
    for (let i = 0; i < text.length; i++) {
      output += Math.random() < 0.08 * intensity ? randomChar() : text[i];
    }
    element.textContent = output;
  }

  // Start glitch immediately on load
  let count = 0;
  timer = setInterval(() => {
    cycle();
    count += interval;
    if (count >= duration) {
      clearInterval(timer);
      element.textContent = text; // reset to clean text
    }
  }, interval);
}

// Trigger when DOM is ready
window.addEventListener('load', () => {
  const nameEl = document.querySelector('#glitch-name');
  if (nameEl) autoGlitch(nameEl, 2, 1500, 40);
});
