/* ============================================
   LUXURY SALON & WELLNESS - JAVASCRIPT
   ============================================ */

// Initialize AOS (Animate On Scroll) Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });
});

// Set minimum date to today for date input
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        dateInput.setAttribute('min', minDate);
    }
});

// Form Validation and Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value.trim();
        
        // Validation
        if (!name || !phone || !service || !date || !time) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Phone number validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            document.getElementById('phone').focus();
            return;
        }
        
        // Date validation (should not be in the past)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            document.getElementById('date').focus();
            return;
        }
        
        // Show success modal
        showSuccessModal(name, service, date, time);
        
        // Reset form
        bookingForm.reset();
        
        // Reset minimum date after form reset
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const minDate = `${year}-${month}-${day}`;
            dateInput.setAttribute('min', minDate);
        }
    });
}

// Show Success Modal
function showSuccessModal(name, service, date, time) {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
const modal = document.getElementById('successModal');
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#' || href === '#!') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
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

// Mobile Menu Toggle (if needed for future expansion)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        const icon = this.querySelector('i');
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Header Scroll Effect (optional enhancement)
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
    }
    
    lastScroll = currentScroll;
});

// Format Phone Input (add visual formatting as user types)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove all non-digit characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        e.target.value = value;
    });
    
    // Prevent non-numeric input
    phoneInput.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
    });
}

// Service Name Mapping for Display
const serviceNames = {
    'wedding-makeup': 'Wedding Makeup',
    'corporate-grooming': 'Corporate Grooming',
    'ritual-traditional': 'Ritual & Traditional Services',
    'spa-massage': 'Spa & Massage',
    'hair-styling': 'Hair & Styling',
    'mens-grooming': "Men's Premium Grooming"
};

// Format Date for Display
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
}

// Format Time for Display
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// WhatsApp Link Generation Helper
function generateWhatsAppLink(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
}

// Update WhatsApp links dynamically if needed
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Link is already set in HTML, this is just for tracking/logging if needed
        console.log('WhatsApp link clicked');
    });
});

// Lazy Loading for Images (if images are added in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state to buttons (enhancement)
document.querySelectorAll('.btn-submit').forEach(button => {
    const form = button.closest('form');
    if (form) {
        form.addEventListener('submit', function() {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Re-enable after modal is shown (simulated delay)
            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-check"></i> Confirm Booking';
            }, 1500);
        });
    }
});

// Console message for developers
console.log('%c Luxury Salon & Wellness ', 'background: #D4AF37; color: #2C3E50; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Website loaded successfully! ', 'color: #25D366; font-size: 14px; font-weight: bold;');

