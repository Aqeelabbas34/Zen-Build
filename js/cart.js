// Add item to cart
function addToCart(name, price, image) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(product => product.name === name);

    if (existingProductIndex !== -1) {
        // If the item already exists, increase its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new item
        cart.push({ name, price, image, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
}

// Load cart items and summary
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector("#cart-items");
    const cartSummary = document.querySelector("#cart-summary");

    // Clear previous content
    cartContainer.innerHTML = "";
    cartSummary.innerHTML = "";

    let totalPrice = 0;

    if (cart.length === 0) {
        // If cart is empty, display a message
        cartContainer.innerHTML = "<p class='text-center text-light'>Your cart is empty!</p>";
        cartSummary.innerHTML = `
            <p><strong>Subtotal:</strong> Rs. 0.00</p>
            <p><strong>Estimated Shipping:</strong> Rs. 0.00</p>
            <p><strong>Total:</strong> Rs. 0.00</p>
        `;
    } else {
        // Loop through cart items and render each one
        cart.forEach((product, index) => {
            const itemTotal = product.price * product.quantity;
            totalPrice += itemTotal;

            cartContainer.innerHTML += `
                <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                        <div class="ms-3">
                            <p class="mb-1 text-light"><strong>${product.name}</strong></p>
                            <p class="mb-0 text-light">Price: Rs. ${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="quantity-control">
                        <button class="btn btn-sm btn-danger" onclick="changeQuantity(${index}, -1)">-</button>
                        <input type="number" class="item-quantity" value="${product.quantity}" min="1" readonly>
                        <button class="btn btn-sm btn-success" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <p class="item-total text-light">Total: Rs. ${itemTotal.toFixed(2)}</p>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });

        // Update cart summary
        cartSummary.innerHTML = `
            <p><strong>Subtotal:</strong> Rs. ${totalPrice.toFixed(2)}</p>
            <p><strong>Estimated Shipping:</strong> Rs. 0.00</p>
            <p><strong>Total:</strong> Rs. ${totalPrice.toFixed(2)}</p>
        `;
    }
}

// Change item quantity
function changeQuantity(index, delta) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity < 1) cart[index].quantity = 1; // Minimum quantity is 1
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart(); // Reload cart to update UI
    }
}

// Remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart
}

// Initialize cart when the page loads
document.addEventListener("DOMContentLoaded", loadCart);
