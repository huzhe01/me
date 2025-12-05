import './style.css'

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('svg');

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when clicking a link
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Header Scroll Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.section-title, .hero-content > *, .timeline-item, .project-card, .skills-list li').forEach(el => {
  el.classList.add('hidden-animate');
  observer.observe(el);
});

// Add CSS for animations dynamically or ensure it's in style.css
// We'll add a style block for animation utilities if not present
const style = document.createElement('style');
style.textContent = `
  .hidden-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .fade-in-up {
    opacity: 1;
    transform: translateY(0);
  }
  
  .timeline-item:nth-child(2) { transition-delay: 0.2s; }
  .timeline-item:nth-child(3) { transition-delay: 0.4s; }
  
  .project-card:nth-child(2) { transition-delay: 0.2s; }
  .project-card:nth-child(3) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);
