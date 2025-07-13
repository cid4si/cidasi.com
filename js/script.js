// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu Elements
    const menuButton = document.getElementById('menu');
    const sideMenu = document.getElementById('side-menu');
    const wrapper = document.getElementById('wrapper');
    
    // Menu toggle functionality
    if (menuButton && sideMenu) {
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            sideMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuButton.contains(event.target) && !sideMenu.contains(event.target)) {
                sideMenu.classList.remove('active');
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking on menu links
        const menuLinks = sideMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                sideMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth animations initialization
    initAnimations();
    
    // Social icons hover effects
    initSocialIcons();
    
    // Loading screen
    initLoadingScreen();
});

// Initialize animations
function initAnimations() {
    const wrapper = document.getElementById('wrapper');
    const header = document.getElementById('header');
    const socialIcons = document.querySelectorAll('.icon li');
    
    // Trigger wrapper animation
    if (wrapper) {
        setTimeout(() => {
            wrapper.style.opacity = '1';
        }, 100);
    }
    
    // Stagger social icons animation
    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${2.5 + (index * 0.2)}s`;
    });
}

// Social icons interactions
function initSocialIcons() {
    const socialLinks = document.querySelectorAll('.icon a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {            
            // Add pulse effect
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.4)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.1)';
        });
        
        // Click effect
        link.addEventListener('click', function(e) {
            // Create ripple effect
            createRipple(e, this);
        });
    });
}

// Create ripple effect on click
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Loading screen functionality
function initLoadingScreen() {
    // Hide loading after all content is loaded
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });
}

// Parallax effect for background (optional)
function initParallax() {
    const bg = document.getElementById('bg');
    if (bg) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            bg.style.backgroundPosition = `${x}% ${y}%`;
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #2c2835;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization - Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Utility function for smooth scrolling (if needed for future pages)
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Update copyright year in footer

document.addEventListener('DOMContentLoaded', function() {
  const anoElement = document.querySelector('#ano');
  const anoAtual = new Date().getFullYear();
  anoElement.textContent = anoAtual;
});