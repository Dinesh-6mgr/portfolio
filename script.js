// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ===== Typed Text =====
const texts = ['Web Developer', 'MERN Stack Learner', 'UI/UX Enthusiast', 'Problem Solver'];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = texts[textIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .timeline-item, .contact-grid, .resume-content'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when skills section is visible
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        fill.style.width = fill.getAttribute('data-width') + '%';
      }
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== Scroll to Top =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Set the _next redirect to current page so user stays after submit
document.getElementById('formNextUrl').value = window.location.href;

contactForm.addEventListener('submit', (e) => {
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  // Form submits naturally to formsubmit.co
});
