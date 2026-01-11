// Logic for the cart page: render cart items, update totals and progress bars,
// handle quantity changes, item removal, cross‑sell suggestions and navigate
// to checkout. Built on top of common.js utilities.

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) return;
        window.location.href = 'checkout.html';
    });
});

/**
 * Render the cart contents. If the cart is empty, show a friendly message and
 * hide the summary sidebar. Otherwise, list each item with controls for
 * quantity adjustment and removal. Also compute cross‑sell suggestions.
 */
function renderCart() {
    const cart = getCart();
    const itemsContainer = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    const crossSellSection = document.getElementById('crossSellSection');
    const crossGrid = document.getElementById('crossGrid');
    itemsContainer.innerHTML = '';
    if (cart.length === 0) {
        summary.style.display = 'none';
        crossSellSection.style.display = 'none';
        itemsContainer.innerHTML = `<p class="empty-cart">Je winkelwagen is leeg. <a href="shop.html" class="link">Blijf winkelen</a></p>`;
        return;
    }
    summary.style.display = '';
    crossSellSection.style.display = '';
    // Build HTML for each cart item
    cart.forEach(item => {
        const product = findProductById(item.id);
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="item-name">${item.name}</h4>
                <p class="item-size">Maat: ${item.size}</p>
                <p class="item-price">${formatPrice(item.price)}</p>
                <div class="qty-controls" data-id="${item.id}" data-size="${item.size}">
                    <button class="qty-btn minus" aria-label="verminderen">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn plus" aria-label="verhogen">+</button>
                </div>
            </div>
            <div class="cart-item-remove">
                <button class="remove-btn" aria-label="verwijderen">×</button>
            </div>
        `;
        // Quantity change handlers
        const qtyControls = row.querySelector('.qty-controls');
        qtyControls.addEventListener('click', (e) => {
            const btn = e.target.closest('.qty-btn');
            if (!btn) return;
            const pid = parseInt(qtyControls.dataset.id);
            const size = qtyControls.dataset.size;
            if (btn.classList.contains('minus')) {
                updateQuantity(pid, size, -1);
            } else if (btn.classList.contains('plus')) {
                updateQuantity(pid, size, 1);
            }
            renderCart();
            updateCartCount();
        });
        // Remove handler
        row.querySelector('.remove-btn').addEventListener('click', () => {
            removeFromCart(item.id, item.size);
            renderCart();
            updateCartCount();
        });
        itemsContainer.appendChild(row);
    });
    updateSummary();
    renderCrossSell(cart);
}

/**
 * Update the summary sidebar based on current cart contents. This includes
 * displaying subtotal, discount, shipping, total, and progress bars for
 * reaching free shipping and higher discount tiers.
 */
function updateSummary() {
    const cart = getCart();
    const { totalItems, subtotal, discountRate, discountAmount, shippingCost, total } = calculateTotals(cart);
    document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
    document.getElementById('summaryDiscount').textContent = discountRate > 0 ? `‑${formatPrice(discountAmount)}` : formatPrice(0);
    document.getElementById('summaryShipping').textContent = shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost);
    document.getElementById('summaryTotal').textContent = formatPrice(total);
    // Progress to free shipping
    const freeShippingThreshold = 50;
    const amountAfterDiscount = subtotal - discountAmount;
    const progressShipping = Math.min(amountAfterDiscount / freeShippingThreshold, 1);
    document.getElementById('freeShippingBar').style.width = `${progressShipping * 100}%`;
    const diff = freeShippingThreshold - amountAfterDiscount;
    const fsText = diff > 0 ? `Nog ${formatPrice(diff)} tot gratis verzending` : 'Je hebt gratis verzending!';
    document.getElementById('freeShippingText').textContent = fsText;
    // Progress to discount
    const nextTier = totalItems >= 3 ? 3 : (totalItems >= 2 ? 3 : 2);
    const nextDiscountRate = totalItems >= 3 ? 0.25 : (totalItems >= 2 ? 0.25 : 0.10);
    // Determine progress in items towards next tier
    const progressDiscount = Math.min(totalItems / nextTier, 1);
    document.getElementById('discountBar').style.width = `${progressDiscount * 100}%`;
    let discountText = '';
    if (totalItems < 2) {
        discountText = `Nog ${2 - totalItems} artikel(en) tot 10% korting`;
    } else if (totalItems < 3) {
        discountText = `Nog ${3 - totalItems} artikel(en) tot 25% korting`;
    } else {
        discountText = 'Je hebt 25% korting';
    }
    document.getElementById('discountText').textContent = discountText;
}

/**
 * Render cross‑sell recommendations. Choose up to 3 products that are not
 * already in the cart. This encourages shoppers to add complementary items.
 * @param {Array} cart Current cart array
 */
function renderCrossSell(cart) {
    const crossGrid = document.getElementById('crossGrid');
    crossGrid.innerHTML = '';
    // Build a set of product IDs already in cart
    const inCartIds = new Set(cart.map(item => item.id));
    // Filter products not in cart
    const eligible = products.filter(p => !inCartIds.has(p.id));
    // Choose 3 items: prioritize bestsellers and new arrivals
    eligible.sort((a, b) => {
        const badgeOrder = { 'bestseller': 1, 'new': 2, null: 3 };
        return (badgeOrder[a.badge] || 3) - (badgeOrder[b.badge] || 3);
    });
    const suggestions = eligible.slice(0, 3);
    suggestions.forEach(p => {
        const card = document.createElement('div');
        card.className = 'cross-item';
        const badgeLabel = p.badge === 'bestseller' ? 'Bestseller' : p.badge === 'new' ? 'Nieuw' : '';
        const badgeClass = p.badge === 'bestseller' ? 'badge-bestseller' : p.badge === 'new' ? 'badge-new' : '';
        card.innerHTML = `
            <div class="cross-image">
                <img src="${p.image}" alt="${p.name}">
                ${p.badge ? `<span class="product-badge ${badgeClass}">${badgeLabel}</span>` : ''}
            </div>
            <div class="cross-info">
                <p class="cross-name">${p.name}</p>
                <p class="cross-price">${formatPrice(p.price)}</p>
                <button class="btn btn-primary btn-small add-cross" data-id="${p.id}">Voeg toe</button>
            </div>
        `;
        // Add event for add to cart
        card.querySelector('.add-cross').addEventListener('click', (e) => {
            const pid = parseInt(e.target.dataset.id);
            addToCart(pid);
            updateCartCount();
            showToast('Toegevoegd aan winkelwagen');
            renderCart();
        });
        crossGrid.appendChild(card);
    });
}