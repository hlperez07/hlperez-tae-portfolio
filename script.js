document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
document.querySelectorAll('.feature-card, .stat-card, .tech-item, .env-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
console.log('%c🧪 Henry Perez - QA Automation Portfolio', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cLooking for bugs? You are in the right place! 🐛', 'color: #10b981; font-size: 14px;');
console.log('%cCheck out the code: https://github.com/hlperez07/hlperez-tae-portafolio', 'color: #6b7280; font-size: 12px;');
