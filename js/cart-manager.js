// Cart Management
const products = [
    {
        id: 1,
        name: 'Wheelchairs',
        category: 'Mobility',
        description: 'Manual and powered wheelchairs for independent mobility and comfort.',
        price: 150000,
        inStock: 48,
        image: 'fas fa-wheelchair'
    },
    {
        id: 2,
        name: 'Transfer Chairs',
        category: 'Mobility',
        description: 'Specialized chairs for safe patient transfer and mobility assistance.',
        price: 120000,
        inStock: 32,
        image: 'fas fa-chair'
    },
    {
        id: 3,
        name: 'Hospital Beds',
        category: 'Hospital',
        description: 'Adjustable electric hospital beds with pressure relief systems.',
        price: 250000,
        inStock: 28,
        image: 'fas fa-bed'
    },
    {
        id: 4,
        name: 'Oxygen Concentrators',
        category: 'Respiratory',
        description: 'Portable and stationary oxygen therapy equipment for home care.',
        price: 180000,
        inStock: 35,
        image: 'fas fa-wind'
    },
    {
        id: 5,
        name: 'Walking Frames',
        category: 'Mobility',
        description: 'Walkers with and without wheels for safe mobility support.',
        price: 95000,
        inStock: 56,
        image: 'fas fa-person-hiking'
    },
    {
        id: 6,
        name: 'Patient Monitors',
        category: 'Diagnostic',
        description: 'Advanced vital signs monitoring systems for continuous patient care.',
        price: 320000,
        inStock: 52,
        image: 'fas fa-heart-pulse'
    },
    {
        id: 7,
        name: 'Suction Machines',
        category: 'Medical Support',
        description: 'Portable and stationary suction equipment for respiratory care.',
        price: 140000,
        inStock: 20,
        image: 'fas fa-pump-medical'
    },
    {
        id: 8,
        name: 'Commodes',
        category: 'Mobility',
        description: 'Comfortable and hygienic commode chairs for home and facility use.',
        price: 85000,
        inStock: 42,
        image: 'fas fa-toilet'
    },
    {
        id: 9,
        name: 'Ward Screens',
        category: 'Hospital',
        description: 'Privacy screens and portable dividers for patient care areas.',
        price: 110000,
        inStock: 65,
        image: 'fas fa-square'
    },
];

class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('medwareCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('medwareCart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product, quantity) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        this.saveCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => {
            el.textContent = this.getItemCount();
        });
    }

    clear() {
        this.items = [];
        this.saveCart();
    }
}

const cart = new Cart();

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    cart.updateCartCount();
});
