/* Common cart and utility functions for the EVALON optimized site */

// Load products from global scope (data.js must be loaded before this script)

// Key used in localStorage
const CART_KEY = 'evalon_cart';

// Retrieve cart array from localStorage
function getCart() {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error loading cart', err);
        return [];
    }
}

// Save cart array back to localStorage
function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
        console.error('Error saving cart', err);
    }
}

// Find a product by its id in the products array
function findProductById(id) {
    return products.find(p => p.id === id);
}

// Add a product to the cart. If the item already exists (same id and size), increment quantity
function addToCart(id, size, quantity = 1) {
    const product = findProductById(id);
    if (!product) return;
    const cart = getCart();
    // Default to first size if none provided
    const finalSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : 'One Size');
    const existing = cart.find(item => item.id === id && item.size === finalSize);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id: id, name: product.name, price: product.price, image: product.image, size: finalSize, quantity: quantity });
    }
    saveCart(cart);
}

// Remove a product from the cart
function removeFromCart(id, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart(cart);
}

// Update quantity of an item
function updateQuantity(id, size, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === id && i.size === size);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        // remove item completely
        removeFromCart(id, size);
    } else {
        saveCart(cart);
    }
}

// Compute discount rate based on total items
function getDiscountRate(itemsCount) {
    if (itemsCount >= 3) return 0.25;
    if (itemsCount >= 2) return 0.10;
    return 0;
}

// Calculate totals: subtotal, discount, shipping, total
function calculateTotals(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountRate = getDiscountRate(totalItems);
    const discountAmount = subtotal * discountRate;
    const freeShippingThreshold = 50;
    const shippingCost = subtotal - discountAmount >= freeShippingThreshold || subtotal === 0 ? 0 : 5;
    const total = subtotal - discountAmount + shippingCost;
    return { totalItems, subtotal, discountRate, discountAmount, shippingCost, total };
}

// Format a number to a localized Euro price string (e.g. €19,99)
function formatPrice(value) {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);
}

// Generate a random order number (e.g. 8-digit)
function generateOrderNumber() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Export functions if module system is available (e.g. Node/ESM). In browser, functions remain global.
/* ---------------------------------------------------------------------------
 * Global UI helpers
 *
 * Several pages (shop, cart, checkout, thank‑you) need to update the cart
 * count indicator in the navigation and display toast notifications. These
 * helpers live here in common.js so that they are available everywhere.
 */

// Update the small badge in the navigation to reflect the current number of
// items in the cart. If there is no nav badge present on the page, this
// function safely does nothing. It also toggles the `.active` class on the
// badge which can be used for styling purposes (e.g. highlight when >0).
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('navCartCount');
    if (badge) {
        badge.textContent = count;
        badge.classList.toggle('active', count > 0);
    }
}

// Display a temporary toast notification at the bottom of the page. The
// corresponding HTML element with id `toast` must exist in each page. The
// toast will automatically disappear after 3 seconds. If the element is
// missing, nothing happens. Only one toast can be active at a time.
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Export functions if module system is available (e.g. Node/ESM). In browser,
// functions remain global by default. This conditional export prevents
// ReferenceError in Node while not interfering with browser execution.
if (typeof module !== 'undefined') {
    module.exports = {
        getCart,
        saveCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getDiscountRate,
        calculateTotals,
        formatPrice,
        generateOrderNumber,
        findProductById,
        updateCartCount,
        showToast
    };
}