// ============= LOADER =============
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.loader-overlay');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

// ============= THEME TOGGLE =============
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ============= PROGRESS BAR =============
const progressFill = document.querySelector('.progress-bar-fill');
const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
const checkpoints = document.querySelectorAll('.checkpoint');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressFill) progressFill.style.width = progress + '%';

  // Checkpoint activation
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el || !checkpoints[i]) return;
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.6) {
      checkpoints.forEach(c => c.classList.remove('active'));
      checkpoints[i].classList.add('active');
    }
  });
});

// Checkpoint click
checkpoints.forEach((cp, i) => {
  cp.addEventListener('click', () => {
    const id = sections[i];
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

// ============= FADE-IN OBSERVER =============
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============= DYNAMIC GREETING =============
function setGreeting() {
  const h = new Date().getHours();
  const greetEl = document.getElementById('hero-greeting');
  if (!greetEl) return;
  if (h < 12)      greetEl.textContent = "Good morning! ☀️";
  else if (h < 18) greetEl.textContent = "Good afternoon! 👋";
  else             greetEl.textContent = "Good evening! 🌙";
}
setGreeting();

// ============= TYPING EFFECT =============
const roles = [
  "B.Tech CSE Student",
  "Aspiring Software Developer",
  "DSA Enthusiast",
  "Problem Solver",
  "Cybersecurity Explorer"
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typing-role');

function typeWriter() {
  if (!typingEl) return;
  const current = roles[roleIdx];
  if (deleting) {
    typingEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; charIdx = 0; }
    setTimeout(typeWriter, 60);
  } else {
    typingEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(typeWriter, 1500); }
    else setTimeout(typeWriter, 100);
  }
}
typeWriter();

// ============= NAVBAR ACTIVE LINK =============
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) current = id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});
