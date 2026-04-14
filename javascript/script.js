const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-nav]');
const reveals = document.querySelectorAll('.reveal');

function showPageFromHash() {
    const hash = window.location.hash || '#home';
    const targetId = hash.replace('#', '');
    let found = false;

    pages.forEach(page => {
        if (page.id === targetId) {
            page.classList.add('active');
            found = true;
        } else {
            page.classList.remove('active');
        }
    });

    if (!found) {
        document.getElementById('home').classList.add('active');
    }

    navLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === (found ? hash : '#home'));
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeReveals, 100);
}

function observeReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.page.active .reveal').forEach((item) => observer.observe(item));
}

window.addEventListener('hashchange', showPageFromHash);
window.addEventListener('load', showPageFromHash);

const carouselState = {};

function initCarousel(id) {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.carousel-slide');
    carouselState[id] = 0;

    function render() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === carouselState[id]);
        });
    }

    render();
}

function moveCarousel(id, direction) {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.carousel-slide');
    const total = slides.length;
    const current = carouselState[id] || 0;
    carouselState[id] = direction === 'next'
        ? (current + 1) % total
        : (current - 1 + total) % total;

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === carouselState[id]);
    });
}

initCarousel('sweets-carousel');
initCarousel('rolls-carousel');

document.querySelectorAll('.carousel-btn').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        const action = button.getAttribute('data-action');
        moveCarousel(target, action);
    });
});