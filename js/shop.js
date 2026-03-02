// ============================================
// MEDWARE - Shop/Home Page Script
// Used by index.html
// ============================================

const PRODUCTS = [
    { id: '1',  name: 'Standard Wheelchair',         category: 'Mobility',    pricePerDay: 10000, image: 'images/Standard Wheelchair.jpg' },
    { id: '2',  name: 'Heavy-Duty Wheelchair',       category: 'Mobility',    pricePerDay: 15000, image: 'images/Heavy-Duty Wheelchair .jpg' },
    { id: '3',  name: 'Hospital Bed (Manual)',        category: 'Beds',        pricePerDay: 25000, image: 'images/hospital-bed.jpg' },
    { id: '4',  name: 'Hospital Bed (Semi-Electric)', category: 'Beds',        pricePerDay: 35000, image: 'images/Hospital Bed (Semi-Electric) .jpg' },
    { id: '5',  name: 'Oxygen Concentrator',          category: 'Respiratory', pricePerDay: 50000, image: 'images/Oxygen Concentrator.jpg' },
    { id: '6',  name: 'Suction Machine',              category: 'Respiratory', pricePerDay: 20000, image: 'images/Suction Machine.jpg' },
    { id: '7',  name: 'Walking Frame',                category: 'Mobility',    pricePerDay: 7000,  image: 'images/Walking Frame.jpg' },
    { id: '8',  name: 'Crutches',                     category: 'Mobility',    pricePerDay: 5000,  image: 'images/Crutches.jpg' },
    { id: '9',  name: 'Commode Chair',                category: 'Comfort',     pricePerDay: 8000,  image: 'images/Commode Chair.jpg' },
    { id: '10', name: 'Transfer Chair',               category: 'Mobility',    pricePerDay: 15000, image: 'images/Transfer Chair.jpg' },
    { id: '11', name: 'Ward Screen',                  category: 'Privacy',     pricePerDay: 10000, image: 'images/Ward Screen.jpg' },
    { id: '12', name: 'Rollator Walker',              category: 'Mobility',    pricePerDay: 12000, image: 'images/Rollator Walker.jpg' },
    { id: '13', name: 'Patient Monitor',              category: 'Monitoring',  pricePerDay: 60000, image: 'images/patient-monitor.jpg' },
];

function formatPrice(amount) {
    return 'UGX ' + amount.toLocaleString();
}

function getCart() {
    return JSON.parse(localStorage.getItem('medwareCart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('medwareCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = count;
    });
}

function addToCart(productId) {
    const id = String(productId);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const cart = getCart();
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            pricePerDay: product.pricePerDay,
            image: product.image,
            quantity: 1,
            rentalPeriod: 'day'
        });
    }

    saveCart(cart);

    // Simple visual feedback
    const btn = event && event.target ? event.target.closest('.btn') : null;
    if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check me-1"></i>Added';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
        }, 1500);
    }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offset = 80;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });
}

// Form handler
function setupFormHandler() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const inputs = form.querySelectorAll('input, textarea');
            const name = inputs[0].value;
            const phone = inputs[1].value;
            const equipment = inputs[2].value;
            if (name && phone && equipment) {
                alert('Thank you, ' + name + '! We\'ve received your request and will contact you at ' + phone + ' shortly.');
                form.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.market-card, .service-card-white, .why-card, .process-step, .equipment-card, .mw-product-card').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    setupSmoothScroll();
    setupFormHandler();
    setupScrollAnimations();
});
