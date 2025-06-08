let cartItems = [];
let totalPrice = 0;

function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price });
    totalPrice += price;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');

    cartList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        // Optional: Add remove button for each item
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.onclick = () => {
            removeFromCart(index);
        };
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    totalSpan.textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    totalPrice -= cartItems[index].price;
    cartItems.splice(index, 1);
    updateCart();
}

function clearCart() {
    cartItems = [];
    totalPrice = 0;
    updateCart();
      
