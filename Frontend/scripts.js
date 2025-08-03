
// ===== JAVASCRIPT FUNCTIONALITY =====

// Smooth scrolling for navigation links
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

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        this.reset();
        
        // Show alert
        alert('Thanks for your interest! We\'ll be in touch soon to get your construction projects organized! 🚀');
    }, 2000);
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 32, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 32, 46, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            
            // Animate progress bar
            if (entry.target.querySelector('.progress-bar')) {
                setTimeout(() => {
                    entry.target.querySelector('.progress-bar').style.width = '72%';
                }, 500);
            }
        }
    });
}, observerOptions);

// Observe service cards and features
document.querySelectorAll('.service-card, .features-visual, .stat-item').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats

const counters = document.querySelectorAll('.stats h3.num-increase');

const startCounter = (counter) => {
    counter.innerText = '0';  // Reset each time
    const target = +counter.getAttribute('data-target');
    const increment = target / 200;
    const showPlus = counter.getAttribute('data-plus') === 'true';

    const updateCounter = () => {
        const current = parseFloat(counter.innerText.replace('+', '')); // Remove + if present
        if (current < target) {
            const nextValue = current + increment;
            counter.innerText = target >= 100 ? Math.ceil(nextValue) : nextValue.toFixed(1);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target >= 100 ? target : target.toFixed(1);
            if (showPlus) counter.innerText += '+';
        }
    };

    updateCounter();
};

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => startCounter(counter));
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
observer2.observe(statsSection);

