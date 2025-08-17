// Green Juice TV - Main JavaScript

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    // Simulate realistic loading time
    const loadingDuration = Math.random() * 1000 + 2000; // 2-3 seconds
    
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        // Fade out loading screen
        loadingScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Fade in main content with stagger
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            mainContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                
                // Initialize animations after content is visible
                initializeAnimations();
            }, 100);
        }, 800);
        
    }, loadingDuration);
});

// Real-time Clock Function for Multiple Time Zones
function updateTimes() {
    const now = new Date();
    
    try {
        // New York (EST/EDT)
        const nyTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        const nyElement = document.getElementById('ny-time');
        if (nyElement) nyElement.textContent = formatTime(nyTime);
        
        // Mumbai (IST) - Your location
        const mumbaiTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        const mumbaiElement = document.getElementById('mumbai-time');
        if (mumbaiElement) mumbaiElement.textContent = formatTime(mumbaiTime);

  // London (GMT/BST)
        const londonTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/London"}));
        const londonElement = document.getElementById('london-time');
        if (londonElement) londonElement.textContent = formatTime(londonTime);
        
        // Tokyo (JST)
        const tokyoTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
        const tokyoElement = document.getElementById('tokyo-time');
        if (tokyoElement) tokyoElement.textContent = formatTime(tokyoTime);
        
    } catch (error) {
        console.warn('Time zone update failed:', error);
    }
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Update times every second
setInterval(updateTimes, 1000);
updateTimes(); // Initial call

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Navbar Scroll Effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Background opacity based on scroll
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottomColor = 'rgba(74, 222, 128, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.borderBottomColor = '#333333';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Intersection Observer for Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('about-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.about-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
                
                if (entry.target.classList.contains('service-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.service-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('time-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.time-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 80);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections and animated elements
    document.querySelectorAll('.section, .time-item, .about-item, .service-item').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Parallax Effect for Hero Section
function initializeParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }
}

// Dynamic Green Juice Theme Effects
function initializeThemeEffects() {
    // Cursor glow effect (desktop only)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            let cursor = document.querySelector('.cursor-glow');
            if (!cursor) {
                const glowDiv = document.createElement('div');
                glowDiv.className = 'cursor-glow';
                glowDiv.style.cssText = `
                    position: fixed;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(74, 222, 128, 0.03) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(glowDiv);
                cursor = glowDiv;
            }
            
            cursor.style.left = (e.clientX - 150) + 'px';
            cursor.style.top = (e.clientY - 150) + 'px';
        });
    }
    
    // Random green accent animations
    setInterval(() => {
        const elements = document.querySelectorAll('.service-item, .about-item, .time-item');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        if (randomElement && document.visibilityState === 'visible') {
            randomElement.style.boxShadow = '0 0 30px rgba(74, 222, 128, 0.3)';
            setTimeout(() => {
                randomElement.style.boxShadow = '';
            }, 2000);
        }
    }, 15000); // Every 15 seconds
}

// Email Contact Enhancement
function initializeContactEnhancements() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            // Add visual feedback
            emailLink.style.transform = 'scale(0.95)';
            setTimeout(() => {
                emailLink.style.transform = 'scale(1)';
            }, 150);
            
            // Add analytics tracking if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_email_click', {
                    event_category: 'engagement',
                    event_label: 'email_contact'
                });
            }
        });
    }
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy load images with data-src attribute
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Add loading states for better UX
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-green);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(74, 222, 128, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add mobile menu CSS for responsive design
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 968px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                border-bottom: 1px solid var(--border-color);
            }
            
            .nav-links.mobile-active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .mobile-menu-toggle {
                display: flex !important;
            }
            
            .mobile-menu-toggle span {
                transition: all 0.3s ease;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all features
function initializeAnimations() {
    initializeSmoothScrolling();
    initializeNavbarEffects();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeThemeEffects();
    initializeContactEnhancements();
    initializePerformanceOptimizations();
    initializeScrollToTop();
    addMobileMenuStyles();
}

// Error handling
window.addEventListener('error', (e) => {
    console.warn('GJTV Script Error:', e.error);
});

// Page visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume time updates when page becomes visible
        updateTimes();
    }
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (mobileToggle && navLinks && navLinks.classList.contains('mobile-active')) {
            mobileToggle.click();
        }
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    body:not(.keyboard-navigation) *:focus {
        outline: none;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-green);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);

// Console branding (fun easter egg)
console.log(`
%cGreen Juice TV
%cBuilt with passion for internet-native brands
%cVisit: https://greenjuicetv.com
`, 
'color: #4ade80; font-size: 24px; font-weight: bold;',
'color: #a3a3a3; font-size: 14px;',
'color: #84cc16; font-size: 12px;'
);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}
