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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
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

// Project Filter and Search Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const searchInput = document.getElementById('project-search');
const projectCount = document.getElementById('project-count');

let currentFilter = 'all';
let currentSearch = '';

function updateProjectDisplay() {
  let visibleCount = 0;
  
  projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const cardTitle = card.querySelector('h3').textContent.toLowerCase();
    const cardDescription = card.querySelector('p').textContent.toLowerCase();
    const searchTerm = currentSearch.toLowerCase();
    
    const matchesFilter = currentFilter === 'all' || cardCategory === currentFilter;
    const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm);
    
    if (matchesFilter && matchesSearch) {
      card.style.display = '';
      card.classList.remove('hidden');
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 10);
      visibleCount++;
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => {
        card.classList.add('hidden');
        card.style.display = 'none';
      }, 300);
    }
  });
  
  // Update project count
  projectCount.innerHTML = `显示 <strong>${visibleCount}</strong> 个项目`;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.getAttribute('data-filter');
    updateProjectDisplay();
  });
});

// Search functionality
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    updateProjectDisplay();
  });
}

// Project Modal Functionality
const modal = document.getElementById('project-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalLinks = document.getElementById('modal-links');

function openProjectModal(card) {
  const title = card.querySelector('h3').textContent;
  const description = card.querySelector('p').textContent;
  const tags = Array.from(card.querySelectorAll('.project-tags span')).map(span => span.textContent);
  const links = Array.from(card.querySelectorAll('.project-links a'));
  
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  
  modalTags.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    modalTags.appendChild(span);
  });
  
  modalLinks.innerHTML = '';
  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent;
    a.target = '_blank';
    modalLinks.appendChild(a);
  });
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Add click event to project cards
projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't open modal if clicking on links
    if (!e.target.closest('.project-links')) {
      openProjectModal(card);
    }
  });
});

// Close modal events
if (modalClose) {
  modalClose.addEventListener('click', closeProjectModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeProjectModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeProjectModal();
  }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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
  
  .project-card:nth-child(2) { transition-delay: 0.1s; }
  .project-card:nth-child(3) { transition-delay: 0.2s; }
  .project-card:nth-child(4) { transition-delay: 0.3s; }
  .project-card:nth-child(5) { transition-delay: 0.4s; }
  .project-card:nth-child(6) { transition-delay: 0.5s; }
  .project-card:nth-child(7) { transition-delay: 0.6s; }
`;
document.head.appendChild(style);
