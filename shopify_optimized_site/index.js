// Index page logic: update cart count, render trending products and handle newsletter signup

document.addEventListener('DOMContentLoaded', () => {
    // Update the nav badge when the page loads. The implementation of
    // updateCartCount lives in common.js so it can be reused across pages.
    updateCartCount();
    renderTrendingProducts();
    initNewsletter();
});

// updateCartCount() is defined in common.js. Do not redefine here.

// Render trending products (bestsellers and new arrivals)
function renderTrendingProducts() {
    const grid = document.getElementById('trendingGrid');
    if (!grid) return;
    // Filter products with badge 'bestseller' or 'new'
    const trending = products.filter(p => p.badge === 'bestseller' || p.badge === 'new');
    // If not enough trending products, take first ones from dataset
    const items = trending.length >= 4 ? trending.slice(0, 4) : products.slice(0, 4);
    grid.innerHTML = items.map(p => {
        return `
            <div class="product-card" data-id="${p.id}">
                <div class="product-image">
                    <img src="${p.image}" alt="${p.name}">
                    ${p.badge ? `<span class="product-badge ${p.badge === 'bestseller' ? 'badge-bestseller' : p.badge === 'new' ? 'badge-new' : ''}">${p.badge === 'bestseller' ? 'Bestseller' : p.badge === 'new' ? 'Nieuw' : ''}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-price">${formatPrice(p.price)}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${p.id}">Toevoegen</button>
                </div>
            </div>
        `;
    }).join('');
    // Event delegation for add to cart buttons
    grid.addEventListener('click', function(e) {
        const btn = e.target.closest('.add-to-cart');
        if (btn) {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
            updateCartCount();
            showToast('Toegevoegd aan winkelwagen');
        }
    });
}

// Handle newsletter signup
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        if (email) {
            // Save email in localStorage for demo purposes
            const list = JSON.parse(localStorage.getItem('evalon_newsletter') || '[]');
            list.push(email);
            localStorage.setItem('evalon_newsletter', JSON.stringify(list));
            showToast('Bedankt! Je ontvangt 10% korting via e-mail.');
            emailInput.value = '';
        }
    });
}

// showToast() is defined in common.js. Do not redefine here.