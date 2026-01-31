// ============================================
// iOS Developer Portfolio - Navjyot Singh
// Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTypingAnimation();
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimation();
    initNavbarScroll();
    initParallaxEffects();
});

// ============================================
// Typing Animation
// ============================================
function initTypingAnimation() {
    const typedTextElement = document.querySelector('.typed-text');
    const phrases = [
        'Swift & SwiftUI Expert',
        'Building Intuitive UIs',
        'Creating Mobile Magic',
        'Crafting iOS Experiences',
        'MVVM Architecture Pro'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let timeout = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            timeout = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            timeout = 500;
        }

        setTimeout(type, timeout);
    }

    type();
}

// ============================================
// Mobile Navigation
// ============================================
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger animations for child elements
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });

    // Observe cards and items
    const animateElements = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-category, .contact-card, .stat, .about-card'
    );
    animateElements.forEach(el => {
        el.classList.add('animate-item');
        observer.observe(el);
    });
}

// ============================================
// Counter Animation
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                let count = 0;

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (counter.closest('.stat').querySelector('.stat-label').textContent.includes('%') ? '%' : '+');
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const navLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);

            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '';
                });
                if (navLink) {
                    navLink.style.color = '#007AFF';
                }
            }
        });

        lastScroll = currentScroll;
    });
}

// ============================================
// Parallax Effects
// ============================================
function initParallaxEffects() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const heroVisual = document.querySelector('.hero-visual');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingIcons.forEach((icon, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });

        if (heroVisual) {
            const rotateX = (mouseY - 0.5) * 10;
            const rotateY = (mouseX - 0.5) * 10;
            heroVisual.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
}

// ============================================
// App Icon Click Effects
// ============================================
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1.15)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, 100);
    });
});

// ============================================
// CSS for Scroll Animations (injected)
// ============================================
const style = document.createElement('style');
style.textContent = `
    .animate-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .animate-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .animate-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .timeline-item.animate-in {
        animation: slideInLeft 0.6s ease forwards;
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .project-card.animate-in {
        animation: scaleIn 0.5s ease forwards;
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .skill-tag {
        transition: all 0.3s ease, transform 0.2s ease;
    }

    .skill-tag:hover {
        transform: translateY(-3px) scale(1.05);
    }
`;
document.head.appendChild(style);

// ============================================
// Preloader (optional enhancement)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// Easter Egg: Konami Code
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('%c Welcome to Navjyot Singh\'s Portfolio! ', 'background: linear-gradient(135deg, #007AFF, #5856D6); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
console.log('%c iOS Developer | Swift & SwiftUI Expert ', 'color: #007AFF; font-size: 12px;');
