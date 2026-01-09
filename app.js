// ===== Product Data =====
const products = [
    {
        id: 1,
        name: "Premium Jeans",
        price: 199.00,
        category: "Jeans",
        image: "https://www.evalon-amsterdam.com/cdn/shop/files/Screenshot2025-09-15at18.14.15.png",
        hoverImage: "https://www.evalon-amsterdam.com/cdn/shop/files/3dde0efd-92cd-4c49-8df7-e10d119d5ad5-2.png",
        badge: "soldout",
        inStock: false,
        sizes: ["28", "30", "32", "34", "36"],
        description: "Onze signature jeans, vervaardigd van premium Japans denim. De perfecte pasvorm die je dag na dag kunt dragen."
    },
    {
        id: 2,
        name: "Premium Sweater",
        price: 99.00,
        category: "Sweaters",
        image: "https://www.evalon-amsterdam.com/cdn/shop/files/Screenshot2025-09-15at18.09.36.png",
        hoverImage: "https://www.evalon-amsterdam.com/cdn/shop/files/bbd45b30-45ce-4b14-ba5f-b2b287603df4.png",
        badge: "new",
        inStock: true,
        lowStock: true,
        sizes: ["S", "M", "L", "XL"],
        description: "Ultra-zachte sweater van 100% premium katoen. Tijdloos ontwerp, perfecte pasvorm."
    },
    {
        id: 3,
        name: "Premium T-Shirt",
        price: 59.00,
        category: "T-Shirts",
        image: "https://www.evalon-amsterdam.com/cdn/shop/files/Screenshot2025-09-15at18.09.28.png",
        hoverImage: "https://www.evalon-amsterdam.com/cdn/shop/files/2031f7c0-ba0b-4e51-8cc0-8a42d528204e.png",
        badge: "soldout",
        inStock: false,
        sizes: ["S", "M", "L", "XL"],
        description: "Het perfecte basis t-shirt. Vervaardigd van premium katoen met een comfortabele fit."
    }
];

// ===== State =====
let cart = JSON.parse(localStorage.getItem('evalon_cart')) || [];
let selectedSizes = {};

// ===== DOM Elements =====
const els = {
    productsGrid: document.getElementById('productsGrid'),
    cartBtn: document.getElementById('cartBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.getElementById('cartCount'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartClose: document.getElementById('cartClose'),
    cartFooter: document.getElementById('cartFooter'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    navToggle: document.getElementById('navToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    header: document.getElementById('header'),
    modalOverlay: document.getElementById('modalOverlay'),
    modal: document.getElementById('modal'),
    modalContent: document.getElementById('modalContent'),
    modalClose: document.getElementById('modalClose'),
    toast: document.getElementById('toast')
};

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    initEventListeners();
    initScrollEffects();
    initUrgencyIndicators();
});

// ===== Render Products =====
function renderProducts() {
    els.productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge === 'new' ? '<span class="product-badge badge-new">Nieuw</span>' : ''}
                ${product.badge === 'soldout' ? '<span class="product-badge badge-soldout">Uitverkocht</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">€${product.price.toFixed(2).replace('.', ',')}</p>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Toevoegen' : 'Uitverkocht'}
                    </button>
                </div>
                ${product.inStock ? 
                    (product.lowStock ? '<span class="stock-label low-stock">⚡ Nog maar 3 op voorraad!</span>' : '<span class="stock-label in-stock">✓ Op voorraad</span>') 
                    : '<span class="stock-label">Meld je aan voor restock</span>'}
            </div>
        </div>
    `).join('');
}

// ===== Cart Functions =====
function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    if (!size && product.sizes.length > 1) {
        openQuickView(productId);
        return;
    }
    
    const finalSize = size || product.sizes[0];
    const existingItem = cart.find(item => item.id === productId && item.size === finalSize);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size: finalSize,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    openCart();
    showToast(`${product.name} toegevoegd aan winkelwagen`);
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, size, change) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('evalon_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeShippingThreshold = 50;
    const remaining = Math.max(0, freeShippingThreshold - subtotal);
    const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
    
    // Update cart count badge
    els.cartCount.textContent = totalItems;
    els.cartCount.classList.toggle('active', totalItems > 0);
    
    // Update subtotal
    els.cartSubtotal.textContent = `€${subtotal.toFixed(2).replace('.', ',')}`;
    
    // Update free shipping progress
    els.progressFill.style.width = `${progress}%`;
    if (remaining > 0) {
        els.progressText.innerHTML = `Nog <strong>€${remaining.toFixed(2).replace('.', ',')}</strong> voor gratis verzending!`;
    } else {
        els.progressText.innerHTML = `<strong>🎉 Je hebt gratis verzending!</strong>`;
        els.progressFill.style.background = 'var(--color-success)';
    }
    
    // Render cart items
    if (cart.length === 0) {
        els.cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Je winkelwagen is leeg</p>
                <button class="btn btn-primary" onclick="closeCart()">Ga winkelen</button>
            </div>
        `;
        els.cartFooter.style.display = 'none';
    } else {
        els.cartFooter.style.display = 'block';
        els.cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">€${item.price.toFixed(2).replace('.', ',')} • Maat: ${item.size}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', -1)">−</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')">Verwijderen</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function openCart() {
    els.cartDrawer.classList.add('active');
    els.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    els.cartDrawer.classList.remove('active');
    els.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Quick View Modal =====
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    selectedSizes[productId] = null;
    
    els.modalContent.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-details">
            <span class="modal-category">${product.category}</span>
            <h2 class="modal-title">${product.name}</h2>
            <p class="modal-price">€${product.price.toFixed(2).replace('.', ',')}</p>
            <p class="modal-desc">${product.description}</p>
            <div class="modal-sizes">
                <label>Selecteer maat</label>
                <div class="size-options">
                    ${product.sizes.map(size => `
                        <button class="size-btn" data-size="${size}" data-product="${productId}">${size}</button>
                    `).join('')}
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary btn-full modal-add" data-id="${productId}" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Toevoegen aan Winkelwagen' : 'Uitverkocht'}
                </button>
            </div>
            ${product.lowStock ? '<p class="urgency-text">🔥 <strong>Populair!</strong> Nog maar 3 op voorraad</p>' : ''}
        </div>
    `;
    
    els.modalOverlay.classList.add('active');
    els.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    els.modalOverlay.classList.remove('active');
    els.modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Toast =====
function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    setTimeout(() => els.toast.classList.remove('show'), 2500);
}

// ===== Event Listeners =====
function initEventListeners() {
    // Cart
    els.cartBtn.addEventListener('click', openCart);
    els.cartClose.addEventListener('click', closeCart);
    els.cartOverlay.addEventListener('click', closeCart);
    
    // Modal
    els.modalClose.addEventListener('click', closeModal);
    els.modalOverlay.addEventListener('click', closeModal);
    
    // Mobile menu
    els.navToggle.addEventListener('click', () => {
        els.mobileMenu.classList.toggle('active');
        document.body.style.overflow = els.mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            els.mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Product grid click delegation
    els.productsGrid.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-to-cart');
        const card = e.target.closest('.product-card');
        
        if (addBtn && !addBtn.disabled) {
            e.stopPropagation();
            addToCart(parseInt(addBtn.dataset.id));
        } else if (card) {
            openQuickView(parseInt(card.dataset.id));
        }
    });
    
    // Featured add to cart
    document.querySelector('.add-featured')?.addEventListener('click', function() {
        addToCart(parseInt(this.dataset.id));
    });
    
    // Size selection in modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('size-btn')) {
            const productId = parseInt(e.target.dataset.product);
            const size = e.target.dataset.size;
            
            selectedSizes[productId] = size;
            
            document.querySelectorAll(`.size-btn[data-product="${productId}"]`).forEach(btn => {
                btn.classList.remove('selected');
            });
            e.target.classList.add('selected');
        }
        
        if (e.target.classList.contains('modal-add')) {
            const productId = parseInt(e.target.dataset.id);
            const size = selectedSizes[productId];
            
            if (!size) {
                showToast('Selecteer eerst een maat');
                return;
            }
            
            addToCart(productId, size);
            closeModal();
        }
    });
    
    // Newsletter
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Bedankt! Je ontvangt 10% korting via e-mail.');
        e.target.reset();
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== Scroll Effects =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        els.header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ===== Urgency Indicators (Conversion Optimization) =====
function initUrgencyIndicators() {
    // Simulate viewers count
    const viewerCount = document.querySelector('.urgency-text strong');
    if (viewerCount) {
        setInterval(() => {
            const count = 8 + Math.floor(Math.random() * 10);
            viewerCount.textContent = `${count} mensen`;
        }, 8000);
    }
}

// Global functions for inline handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.closeCart = closeCart;
window.closeModal = closeModal;