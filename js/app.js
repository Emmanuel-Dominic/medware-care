// ============================================
// MEDWARE - Product Data & Cart System
// Used by equipments.html
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

// ---- Helpers ----

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

// ---- Add to Cart ----

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
    showToast(product.name + ' added to cart');
}

// ---- Toast Notification ----

function showToast(message) {
    const toastMsg = document.getElementById('toast-message');
    const toastEl = document.getElementById('addToCartToast');
    if (toastMsg && toastEl) {
        toastMsg.textContent = message;
        const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
        toast.show();
    }
}

// ---- Category Filter ----

function setupCategoryFilter() {
    const buttons = document.querySelectorAll('.mw-category-btn');
    const cards = document.querySelectorAll('#product-grid > [data-category]');

    if (!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Toggle active state
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-category');

            cards.forEach(card => {
                if (!filter || filter === 'All') {
                    card.style.display = '';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ---- Init ----

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    setupCategoryFilter();
});
