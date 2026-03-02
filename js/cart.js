// ============================================
// MEDWARE - Cart Page Script
// Used by cart.html
// ============================================

const DELIVERY_COST = 50000;

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

function getItemCost(item) {
    if (item.rentalPeriod === 'month') {
        return item.pricePerDay * 30 * item.quantity;
    }
    return item.pricePerDay * item.quantity;
}

function updateCartDisplay() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');

    if (cart.length === 0) {
        if (cartItemsDiv) cartItemsDiv.style.display = 'none';
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
        updateTotals(0);
        return;
    }

    if (cartItemsDiv) cartItemsDiv.style.display = 'block';
    if (emptyCartDiv) emptyCartDiv.style.display = 'none';
    if (cartItemsDiv) cartItemsDiv.innerHTML = '';

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = getItemCost(item);
        subtotal += itemTotal;
        const perDayFormatted = formatPrice(item.pricePerDay);
        const perMonthFormatted = formatPrice(item.pricePerDay * 30);
        const isDaySelected = item.rentalPeriod === 'day' || !item.rentalPeriod;

        const cartItem = document.createElement('div');
        cartItem.className = 'card border-0 shadow-sm mb-3';
        cartItem.innerHTML = `
            <div class="card-body p-3">
                <div class="row align-items-center g-3">
                    <div class="col-3 col-md-2">
                        <img src="${item.image || ''}" alt="${item.name}"
                             style="width:100%;height:70px;object-fit:contain;background:#f0f4f8;border-radius:8px;">
                    </div>
                    <div class="col-9 col-md-3">
                        <h6 class="fw-600 mb-1" style="color:#1D2C5C;">${item.name}</h6>
                        <small class="text-muted">${item.category}</small>
                    </div>
                    <div class="col-6 col-md-2">
                        <label class="form-label small text-muted mb-1">Rental Period</label>
                        <select class="form-select form-select-sm" onchange="changeRentalPeriod(${index}, this.value)">
                            <option value="day" ${isDaySelected ? 'selected' : ''}>Per Day (${perDayFormatted})</option>
                            <option value="month" ${item.rentalPeriod === 'month' ? 'selected' : ''}>Per Month (${perMonthFormatted})</option>
                        </select>
                    </div>
                    <div class="col-3 col-md-2">
                        <label class="form-label small text-muted mb-1">Qty</label>
                        <input type="number" class="form-control form-control-sm" value="${item.quantity}"
                               min="1" max="20" onchange="updateQuantity(${index}, this.value)">
                    </div>
                    <div class="col-6 col-md-2 text-end">
                        <label class="form-label small text-muted mb-1">Total</label>
                        <div class="fw-700" style="color:#27AE4A;">${formatPrice(itemTotal)}</div>
                    </div>
                    <div class="col-3 col-md-1 text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})" title="Remove">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        cartItemsDiv.appendChild(cartItem);
    });

    updateTotals(subtotal);
}

function changeRentalPeriod(index, period) {
    const cart = getCart();
    if (cart[index]) {
        cart[index].rentalPeriod = period;
        saveCart(cart);
        updateCartDisplay();
    }
}

function updateQuantity(index, newQuantity) {
    const cart = getCart();
    const qty = parseInt(newQuantity);
    if (qty > 0 && cart[index]) {
        cart[index].quantity = qty;
        saveCart(cart);
        updateCartDisplay();
    }
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCartDisplay();
}

function updateTotals(subtotal) {
    const total = subtotal + (subtotal > 0 ? DELIVERY_COST : 0);

    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('delivery');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (deliveryEl) deliveryEl.textContent = subtotal > 0 ? formatPrice(DELIVERY_COST) : 'UGX 0';
    if (totalEl) totalEl.textContent = formatPrice(total);

    localStorage.setItem('orderSummary', JSON.stringify({
        subtotal: subtotal,
        delivery: subtotal > 0 ? DELIVERY_COST : 0,
        total: total
    }));
}

function clearCart() {
    localStorage.removeItem('medwareCart');
    updateCartCount();
    updateCartDisplay();
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    updateCartDisplay();
});
