// ===== SLIDER FUNCTIONALITY =====
let currentSlideIndex = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (n >= slides.length) currentSlideIndex = 0;
    if (n < 0) currentSlideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides.length > 0) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (dots.length > 0) {
        dots[currentSlideIndex].classList.add('active');
    }
}

function changeSlide(n) {
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

// Auto-advance slider every 6 seconds if on home page
const slides = document.querySelectorAll('.slide');
if (slides.length > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 6000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== RESERVE BUTTON =====
document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Thank you for your interest! Please call us at +1 (212) 555-1234 to make a reservation, or fill out the contact form on our Contact Us page.');
    });
});

// ===== RESPONSIVE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close menu when a link is clicked
if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.style.display = 'none';
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe menu items and cards for animation
document.querySelectorAll('.menu-category, .dish-card, .testimonial-card, .value-card, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== NEWSLETTER FORM =====
const newsletterForms = document.querySelectorAll('.newsletter');
newsletterForms.forEach(form => {
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (input && input.value) {
                alert('Thank you for subscribing! We\'ll keep you updated with our latest news and special offers.');
                input.value = '';
            } else {
                alert('Please enter your email address.');
            }
        });
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && slides.length > 0) {
        changeSlide(-1);
    } else if (event.key === 'ArrowRight' && slides.length > 0) {
        changeSlide(1);
    }
});

// ===== HEADER SCROLL EFFECT =====
let lastScrollTop = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 20px rgba(212, 175, 55, 0.15)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ===== FORM VALIDATION (for Contact Form) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!firstName || !email || !phone || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert(`Thank you, ${firstName}! Your message has been sent. We'll get back to you soon at ${email}`);
        this.reset();
    });
}

// ===== ACTIVE NAV LINK =====
const currentLocation = location.pathname;
const menuItems = document.querySelectorAll('.nav-menu a');

menuItems.forEach(item => {
    if (item.getAttribute('href') === currentLocation.substring(currentLocation.lastIndexOf('/'))) {
        item.style.color = 'var(--primary-gold)';
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.animation = 'fadeIn 0.5s ease-in';
});