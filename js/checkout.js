// Checkout Script
function formatPrice(price) {
    return 'UGX ' + price.toLocaleString();
}

function loadCheckoutData() {
    const cartItems = JSON.parse(localStorage.getItem('medwareCart') || '[]');
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary') || '{}');

    const checkoutItemsDiv = document.getElementById('checkoutItems');
    if (checkoutItemsDiv) {
        checkoutItemsDiv.innerHTML = '';

        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'mb-3 pb-3 border-bottom';
            itemDiv.innerHTML = `
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="fw-600 mb-1">${item.name}</h6>
                        <small class="text-muted">Qty: ${item.quantity}</small>
                    </div>
                    <span class="fw-600">${formatPrice(item.price * item.quantity)}</span>
                </div>
            `;
            checkoutItemsDiv.appendChild(itemDiv);
        });
    }

    // Update totals
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const deliveryEl = document.getElementById('checkoutDelivery');
    const totalEl = document.getElementById('checkoutTotal');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(orderSummary.subtotal || 0);
    if (deliveryEl) deliveryEl.textContent = formatPrice(orderSummary.delivery || 0);
    if (totalEl) totalEl.textContent = formatPrice(orderSummary.total || 0);
}

function completeOrder() {
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;
    const district = document.getElementById('district')?.value;
    const startDate = document.getElementById('startDate')?.value;
    const rentalPeriod = document.getElementById('rentalPeriod')?.value;
    const paymentRadio = document.querySelector('input[name="payment"]:checked');
    const paymentMethod = paymentRadio ? paymentRadio.value : 'bank-transfer';

    if (!fullName || !email || !phone || !address || !district || !startDate || !rentalPeriod) {
        alert('Please fill in all required fields');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('medwareCart') || '[]');
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary') || '{}');

    const order = {
        id: 'ORD-' + Date.now(),
        customer: {
            name: fullName,
            email: email,
            phone: phone,
            address: address,
            district: district
        },
        items: cartItems,
        rental: {
            startDate: startDate,
            period: rentalPeriod
        },
        payment: paymentMethod,
        total: orderSummary.total || 0,
        status: 'Pending',
        orderDate: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('medwareOrders') || '[]');
    orders.push(order);
    localStorage.setItem('medwareOrders', JSON.stringify(orders));

    localStorage.removeItem('medwareCart');
    localStorage.removeItem('orderSummary');

    showConfirmation(order);
}

function showConfirmation(order) {
    const confirmationHTML = `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-6 text-center">
                    <div style="font-size: 4rem; color: #27AE4A; margin-bottom: 2rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h1 class="fw-700 mb-3" style="color: #1D2C5C;">Order Confirmed!</h1>
                    <p class="lead text-muted mb-4">Thank you for your order. We're preparing your equipment rental.</p>

                    <div class="card border-0 shadow-sm mb-4 text-start">
                        <div class="card-body">
                            <h6 class="fw-700 mb-3">Order Details</h6>
                            <p><strong>Order ID:</strong> ${order.id}</p>
                            <p><strong>Name:</strong> ${order.customer.name}</p>
                            <p><strong>Email:</strong> ${order.customer.email}</p>
                            <p><strong>Phone:</strong> ${order.customer.phone}</p>
                            <p><strong>Delivery Address:</strong> ${order.customer.address}, ${order.customer.district}</p>
                            <p><strong>Start Date:</strong> ${order.rental.startDate}</p>
                            <p><strong>Rental Period:</strong> ${order.rental.period}</p>
                            <hr>
                            <p><strong>Total Amount:</strong> <span style="color: #27AE4A; font-size: 1.25rem;">${formatPrice(order.total)}</span></p>
                            <p><strong>Status:</strong> <span class="badge" style="background: #F57F20; color: white;">Pending Confirmation</span></p>
                        </div>
                    </div>

                    <p class="text-muted mb-4">
                        We'll contact you at <strong>${order.customer.phone}</strong> to confirm your order and arrange delivery.
                    </p>

                    <div class="d-grid gap-2">
                        <a href="index.html" class="btn btn-primary btn-lg fw-600">
                            <i class="fas fa-home me-2"></i> Back to Home
                        </a>
                        <a href="shop.html" class="btn btn-outline-primary btn-lg fw-600">
                            <i class="fas fa-shopping-cart me-2"></i> Continue Shopping
                        </a>
                    </div>

                    <p class="text-muted small mt-4">
                        A confirmation email has been sent to <strong>${order.customer.email}</strong>
                    </p>
                </div>
            </div>
        </div>
    `;

    document.body.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Medware - Order Confirmation</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
            <link href="css/styles.css" rel="stylesheet">
        </head>
        <body>
            ${confirmationHTML}
        </body>
        </html>
    `;
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('medwareCart') || '[]');
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = count;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const startDateEl = document.getElementById('startDate');
    if (startDateEl) {
        startDateEl.min = today;
    }
    
    loadCheckoutData();
    updateCartCount();
});
