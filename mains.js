// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
});

// ===== Search Functionality =====
function performSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length > 0) {
        // Redirect to search page with query
        window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
    }
}

// Live search suggestions
const searchInput = document.querySelector('.search-container input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        const value = e.target.value.trim();
        if (value.length > 2) {
            getSearchSuggestions(value);
        }
    }, 500));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getSearchSuggestions(query) {
    // This would connect to your backend/suggestions API
    console.log('Fetching suggestions for:', query);
    
    // Example suggestion data
    const suggestions = [
        'SSC CGL 2026',
        'SSC CHSL 2026',
        'RRB NTPC 2026',
        'IBPS PO 2026',
        'NDA 2026'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    displaySuggestions(suggestions);
}

function displaySuggestions(suggestions) {
    // Create or update suggestions dropdown
    let suggestionsBox = document.querySelector('.suggestions-box');
    
    if (!suggestionsBox) {
        suggestionsBox = document.createElement('div');
        suggestionsBox.className = 'suggestions-box';
        document.querySelector('.search-container').appendChild(suggestionsBox);
    }
    
    if (suggestions.length > 0) {
        suggestionsBox.innerHTML = suggestions.map(s => 
            `<div class="suggestion-item" onclick="selectSuggestion('${s}')">${s}</div>`
        ).join('');
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }
}

function selectSuggestion(value) {
    document.querySelector('.search-container input').value = value;
    document.querySelector('.suggestions-box').style.display = 'none';
    performSearch();
}

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
        const suggestionsBox = document.querySelector('.suggestions-box');
        if (suggestionsBox) {
            suggestionsBox.style.display = 'none';
        }
    }
});

// ===== Notification Badge Auto-hide =====
function autoHideBadges() {
    const newBadges = document.querySelectorAll('.badge.new');
    newBadges.forEach(badge => {
        setTimeout(() => {
            badge.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    });
}

// Call this on page load
if (document.querySelector('.badge.new')) {
    autoHideBadges();
}

// ===== Newsletter Form Submission =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would send to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('धन्यवाद! अब आपको सभी अपडेट मिलेंगे।');
        this.reset();
    });
}

// ===== Smooth Scroll for Anchor Links =====
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

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Back to Top Button =====
function createBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(btn);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
}

// Call this if you want back to top button
// createBackToTop();

// ===== Page Load Performance =====
window.addEventListener('load', function() {
    // Remove loader if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Log performance
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    }
});

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registered:', registration);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}
