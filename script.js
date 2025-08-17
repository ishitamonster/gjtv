// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        
        // Fade in main content
        const mainContent = document.getElementById('main-content');
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);
        
    }, 1500); // 1.5 second loading
});

// Time Updates - Exactly like Fork Off
function updateTimes() {
    const now = new Date();
    
    try {
        // New York
        const nyTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        const nyElement = document.getElementById('ny-time');
        if (nyElement) nyElement.textContent = formatTime(nyTime);
        
        // Dubai  
        const dubaiTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Dubai"}));
        const dubaiElement = document.getElementById('dubai-time');
        if (dubaiElement) dubaiElement.textContent = formatTime(dubaiTime);
        
        // London
        const londonTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/London"}));
        const londonElement = document.getElementById('london-time');
        if (londonElement) londonElement.textContent = formatTime(londonTime);
        
    } catch (error) {
        console.warn('Time update failed:', error);
    }
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';
    
    const hour12 = date.getHours() === 0 ? 12 : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    
    return `${hour12.toString().padStart(2, '0')}:${minutes}:${seconds} ${period}`;
}

// Update every second
setInterval(updateTimes, 1000);
updateTimes(); // Initial call

// Smooth scrolling for navigation
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

// Minimal hover effects
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.opacity = '0.6';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

// Simple fade-in animation for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe content sections
document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(10px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Script error:', e.error);
});

// Clean console message
console.log('Green Juice TV - Loaded successfully');
