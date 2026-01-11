// Thank you page script: displays the order confirmation details stored in
// localStorage after checkout. Shows order number, customer info and the
// purchased items summary.

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayOrderDetails();
});

function displayOrderDetails() {
    const params = new URLSearchParams(window.location.search);
    const orderNum = params.get('order');
    const orderDataStr = localStorage.getItem('evalon_last_order');
    const orderInfo = document.getElementById('orderInfo');
    const orderContainer = document.getElementById('thankyouOrder');
    if (!orderDataStr) {
        orderInfo.textContent = 'Je bestelling is voltooid.';
        return;
    }
    try {
        const order = JSON.parse(orderDataStr);
        if (order.number !== orderNum) {
            orderInfo.textContent = 'Je bestelling is voltooid.';
            return;
        }
        orderInfo.innerHTML = `Je ordernummer is <strong>#${order.number}</strong>. We hebben een bevestiging gestuurd naar <strong>${order.customer.email}</strong>.`;
        // Display shipping details
        const customer = order.customer;
        const shippingDiv = document.createElement('div');
        shippingDiv.className = 'thankyou-shipping';
        shippingDiv.innerHTML = `
            <h3>Verzendadres</h3>
            <p>${customer.firstName} ${customer.lastName}</p>
            <p>${customer.address}</p>
            <p>${customer.postcode} ${customer.city}</p>
            <p>${customer.country}</p>
        `;
        orderContainer.appendChild(shippingDiv);
        // Items summary
        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'thankyou-items';
        itemsDiv.innerHTML = '<h3>Bestelde artikelen</h3>';
        order.items.forEach(item => {
            const p = document.createElement('p');
            const lineTotal = item.price * item.quantity;
            p.textContent = `${item.name} (${item.size}) × ${item.quantity} – ${formatPrice(lineTotal)}`;
            itemsDiv.appendChild(p);
        });
        orderContainer.appendChild(itemsDiv);
        // Totals
        const totalsDiv = document.createElement('div');
        totalsDiv.className = 'thankyou-totals';
        totalsDiv.innerHTML = `
            <h3>Overzicht</h3>
            <p>Subtotaal: ${formatPrice(order.totals.subtotal)}</p>
            <p>Korting: ${order.totals.discountRate > 0 ? '‑' + formatPrice(order.totals.discountAmount) : formatPrice(0)}</p>
            <p>Verzendkosten: ${order.totals.shippingCost === 0 ? 'Gratis' : formatPrice(order.totals.shippingCost)}</p>
            <p><strong>Totaal: ${formatPrice(order.totals.total)}</strong></p>
        `;
        orderContainer.appendChild(totalsDiv);
        // Clear saved order after displaying so returning to page again won't keep data
        // but keep for demonstration; optional: localStorage.removeItem('evalon_last_order');
    } catch (err) {
        console.error('Failed to parse order', err);
        orderInfo.textContent = 'Bedankt voor je bestelling!';
    }
}