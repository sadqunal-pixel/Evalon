// Logic for the shop (catalogue) page.
// This script handles filtering, sorting, rendering product cards, and showing a
// quick‑view modal. It relies on `products` from data.js and common cart
// utilities from common.js. The goal is to provide a delightful shopping
// experience that follows conversion best practices such as easy product
// discovery, clear CTAs, and optional quick view for size/quantity selection.

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initFiltersAndSorting();
    renderProducts(products);
    attachGridListeners();
    initQuickViewModal();
    // Apply category from query parameter (e.g. ?category=tops)
    applyInitialCategoryFromURL();
});

// Global state for currently selected category and sort
let selectedCategory = 'all';
let selectedSort = 'featured';

/**
 * Initialize filter buttons and sort dropdown handlers.
 */
function initFiltersAndSorting() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Activate this button and deactivate others
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.dataset.category;
            updateProductsDisplay();
        });
    });
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', () => {
        selectedSort = sortSelect.value;
        updateProductsDisplay();
    });
}

/**
 * Apply initial category filter from URL query parameters. If the URL
 * contains a `category` parameter, the corresponding filter button is
 * activated and products are filtered accordingly.
 */
function applyInitialCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
        // Find and click the appropriate filter button to reuse logic
        const btn = document.querySelector(`.filter-btn[data-category="${category}"]`);
        if (btn) {
            btn.click();
        }
    }
}

/**
 * Sort and filter the products array based on current selections, then
 * re‑render the product grid.
 */
function updateProductsDisplay() {
    let list = products.slice();
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
        list = list.filter(p => p.category === selectedCategory);
    }
    // Sort the list
    switch (selectedSort) {
        case 'price-low':
            list.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            list.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            list.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'featured':
        default:
            // Featured sorting: prioritize bestsellers and new arrivals, then by id
            list.sort((a, b) => {
                const badgeOrder = { 'bestseller': 1, 'new': 2, null: 3 };
                const badgeA = badgeOrder[a.badge] || 3;
                const badgeB = badgeOrder[b.badge] || 3;
                if (badgeA !== badgeB) return badgeA - badgeB;
                return a.id - b.id;
            });
            break;
    }
    renderProducts(list);
}

/**
 * Render the given list of products into the grid. Each card includes a
 * product image (with hover image), badge, name, price and a quick‑view
 * button. Hover images encourage engagement and help shoppers visualise
 * alternative angles. The results count text is also updated.
 *
 * @param {Array} list Array of product objects to render
 */
function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('resultsCount');
    if (!grid) return;
    countEl.textContent = list.length;
    grid.innerHTML = list.map(p => {
        const badgeLabel = p.badge === 'bestseller' ? 'Bestseller' : p.badge === 'new' ? 'Nieuw' : '';
        const badgeClass = p.badge === 'bestseller' ? 'badge-bestseller' : p.badge === 'new' ? 'badge-new' : '';
        return `
            <div class="product-card" data-id="${p.id}">
                <div class="product-image">
                    <img class="main-img" src="${p.image}" alt="${p.name}">
                    <img class="hover-img" src="${p.hoverImage}" alt="${p.name} hovered">
                    ${p.badge ? `<span class="product-badge ${badgeClass}">${badgeLabel}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-price">${formatPrice(p.price)}</p>
                    <button class="btn btn-primary quick-view-btn" type="button">Bekijk</button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Attach event listeners to the products grid for opening the quick view
 * modal when users click the quick‑view button. Using event delegation
 * reduces the need to register individual listeners on every card.
 */
function attachGridListeners() {
    const grid = document.getElementById('productsGrid');
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-view-btn');
        if (btn) {
            const card = btn.closest('.product-card');
            if (card) {
                const id = parseInt(card.dataset.id);
                openQuickView(id);
            }
        }
    });
}

/**
 * Initialise the quick view modal: set up close button, overlay click to close,
 * and prepare dynamic elements. The modal markup is defined in shop.html.
 */
function initQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    const overlay = document.getElementById('quickViewOverlay');
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeQuickView);
    overlay.addEventListener('click', closeQuickView);
    // Add submit event for the add‑to‑cart button inside modal
    const addBtn = modal.querySelector('#quickAddBtn');
    addBtn.addEventListener('click', () => {
        const id = parseInt(modal.dataset.productId);
        const sizeSelect = modal.querySelector('#quickSize');
        const qtyInput = modal.querySelector('#quickQty');
        const size = sizeSelect.value;
        const qty = parseInt(qtyInput.value) || 1;
        addToCart(id, size, qty);
        updateCartCount();
        showToast('Toegevoegd aan winkelwagen');
        closeQuickView();
    });
    // Quantity controls
    modal.querySelector('#qtyMinus').addEventListener('click', () => {
        const qtyInput = modal.querySelector('#quickQty');
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) { val--; qtyInput.value = val; }
    });
    modal.querySelector('#qtyPlus').addEventListener('click', () => {
        const qtyInput = modal.querySelector('#quickQty');
        let val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
    });
}

/**
 * Open the quick view modal for a given product id. Fills in the product
 * details such as image, title, price, size options, and default quantity.
 *
 * @param {number} id Product identifier
 */
function openQuickView(id) {
    const product = findProductById(id);
    if (!product) return;
    const modal = document.getElementById('quickViewModal');
    const overlay = document.getElementById('quickViewOverlay');
    modal.dataset.productId = id;
    modal.querySelector('.modal-image img').src = product.image;
    modal.querySelector('.modal-title').textContent = product.name;
    modal.querySelector('.modal-price').textContent = formatPrice(product.price);
    // Populate size select
    const sizeSelect = modal.querySelector('#quickSize');
    sizeSelect.innerHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');
    // Reset quantity
    modal.querySelector('#quickQty').value = 1;
    // Show modal
    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * Close the quick view modal and reset state.
 */
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    const overlay = document.getElementById('quickViewOverlay');
    modal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}