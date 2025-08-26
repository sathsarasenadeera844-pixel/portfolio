// Section navigation
function showSection(targetId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Animate skill bars if Skills section is shown
        if (targetId === '#skills') {
            setTimeout(animateSkillBars, 300);
        }
    }
}

// Add active class to nav links and handle section navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Show corresponding section
        const targetId = this.getAttribute('href');
        showSection(targetId);
        
        // Close mobile menu if open
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('mobile-open');
    });
});

// Set first nav item as active by default and show home section
document.addEventListener('DOMContentLoaded', function() {
    const firstNavLink = document.querySelector('.nav-link[href="#home"]');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
    showSection('#home');
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        // Reset width
        bar.style.width = '0%';
        
        // Animate after a short delay
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200 + 100);
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnMenuBtn = menuBtn.contains(e.target);
    
    if (!isClickInsideSidebar && !isClickOnMenuBtn && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }
});

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

// Add smooth animations on scroll (optional enhancement)
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize interactive effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio item hover effects
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon-box');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon-box');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Contact item hover effects
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(255, 71, 87, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add typing effect to rotating text (optional enhancement)
    const rotatingTexts = document.querySelectorAll('.rotating-text span');
    rotatingTexts.forEach((text, index) => {
        text.style.animationDelay = `${index * 3}s`;
    });

    // Smooth transitions for all interactive elements
    const interactiveElements = document.querySelectorAll('button, .nav-link, .portfolio-item, .service-card, .contact-item');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });

    // Add parallax effect to decorative elements (optional)
    window.addEventListener('scroll', optimizedScrollHandler);

    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize animations
    setTimeout(() => {
        const homeSection = document.querySelector('#home');
        if (homeSection && homeSection.classList.contains('active')) {
            // Trigger home section animations
            const greeting = homeSection.querySelector('.greeting');
            const roleText = homeSection.querySelector('.role-text');
            const description = homeSection.querySelector('.description');
            
            if (greeting) greeting.style.animation = 'fadeInUp 1s ease 0.5s forwards';
            if (roleText) roleText.style.animation = 'fadeInUp 1s ease 1s forwards';
            if (description) description.style.animation = 'fadeInUp 1s ease 1.5s forwards';
        }
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Allow navigation with arrow keys
    const currentActive = document.querySelector('.nav-link.active');
    const allNavLinks = Array.from(document.querySelectorAll('.nav-link'));
    const currentIndex = allNavLinks.indexOf(currentActive);
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % allNavLinks.length;
        allNavLinks[nextIndex].click();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? allNavLinks.length - 1 : currentIndex - 1;
        allNavLinks[prevIndex].click();
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('mobile-open');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Optimized scroll handler for parallax effect
const optimizedScrollHandler = debounce(function() {
    const decoration1 = document.querySelector('.decoration-1');
    const decoration2 = document.querySelector('.decoration-2');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (decoration1) {
        decoration1.style.transform = `translateY(${rate}px)`;
    }
    
    if (decoration2) {
        decoration2.style.transform = `rotate(45deg) translateY(${rate * 0.7}px)`;
    }
}, 10);

// Add loading animation (optional)
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill animation trigger when scrolling (alternative to click trigger)
function checkSkillsInView() {
    const skillsSection = document.querySelector('#skills');
    if (skillsSection && skillsSection.classList.contains('active')) {
        const skillBars = document.querySelectorAll('.skill-progress');
        let hasAnimated = false;
        
        skillBars.forEach(bar => {
            if (bar.style.width && bar.style.width !== '0%') {
                hasAnimated = true;
            }
        });
        
        if (!hasAnimated) {
            animateSkillBars();
        }
    }
}

// Enhanced intersection observer for better performance
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    setTimeout(() => {
        const animateElements = document.querySelectorAll('.portfolio-item, .service-card, .contact-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 1000);
}

// Export functions for potential external use
window.portfolioFunctions = {
    showSection,
    toggleMobileMenu,
    animateSkillBars,
    handleFormSubmit,
    checkSkillsInView
};