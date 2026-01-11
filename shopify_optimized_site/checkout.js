// Checkout page logic. This script loads the current cart, renders the order
// summary, handles form submission for the checkout, and creates a temporary
// order record. It does not process any real payments but demonstrates
// best‑practice UX with minimal required fields and a guest checkout option.

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCheckoutSummary();
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        placeOrder();
    });
});

/**
 * Render the order summary in the checkout sidebar. If the cart is empty,
 * redirect back to the cart page. Each item shows name, size, quantity and
 * total price. Totals (subtotal, discount, shipping, total) are displayed.
 */
function renderCheckoutSummary() {
    const cart = getCart();
    if (!cart || cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    const summaryContainer = document.getElementById('summaryItems');
    summaryContainer.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'summary-item';
        const totalPrice = item.price * item.quantity;
        div.innerHTML = `
            <div class="summary-item-info">
                <span class="summary-item-name">${item.name} (${item.size}) × ${item.quantity}</span>
                <span class="summary-item-price">${formatPrice(totalPrice)}</span>
            </div>
        `;
        summaryContainer.appendChild(div);
    });
    const { subtotal, discountRate, discountAmount, shippingCost, total } = calculateTotals(cart);
    document.getElementById('checkoutSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkoutDiscount').textContent = discountRate > 0 ? `‑${formatPrice(discountAmount)}` : formatPrice(0);
    document.getElementById('checkoutShipping').textContent = shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost);
    document.getElementById('checkoutTotal').textContent = formatPrice(total);
}

/**
 * Handle the form submission: collect user details, generate an order object,
 * store it in localStorage under a specific key, clear the cart, and
 * redirect to the thank you page. No payment processing occurs here.
 */
function placeOrder() {
    const cart = getCart();
    if (!cart || cart.length === 0) return;
    const order = {};
    order.number = generateOrderNumber();
    order.items = cart;
    const totals = calculateTotals(cart);
    order.totals = totals;
    // Collect customer info
    order.customer = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        postcode: document.getElementById('postcode').value.trim(),
        city: document.getElementById('city').value.trim(),
        country: document.getElementById('country').value.trim(),
        payment: document.querySelector('input[name="payment"]:checked').value
    };
    // Save the order temporarily (could be sent to backend in real implementation)
    try {
        localStorage.setItem('evalon_last_order', JSON.stringify(order));
    } catch (e) {
        console.error('Failed to save order', e);
    }
    // Clear cart
    saveCart([]);
    updateCartCount();
    // Redirect to thank you page with order number
    window.location.href = 'thankyou.html?order=' + order.number;
}