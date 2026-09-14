// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial styles for animation
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add glitch effect on hover for project titles
document.querySelectorAll('.project-title').forEach(title => {
    title.addEventListener('mouseenter', () => {
        title.style.animation = 'glitch-rgb 0.3s infinite';
    });
    title.addEventListener('mouseleave', () => {
        title.style.animation = '';
    });
});

// Console message for that glitch art feel
console.log('%c 12matt3r EPK loaded successfully ', 'background: #00F3FF; color: #000; padding: 10px; font-family: monospace;');
console.log('%c >> Exploring digital decay through code and signal << ', 'background: #FF0055; color: #fff; padding: 10px; font-family: monospace;');