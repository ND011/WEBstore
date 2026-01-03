/* State Management */
let cart = [];
const products = document.querySelectorAll('.product-card');

/* DOM Elements */
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMenuBtn = document.getElementById('close-menu');

const searchIcon = document.getElementById('search-icon');
const searchOverlay = document.getElementById('search-overlay');
const closeSearchBtn = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-sidebar-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total-price');
const cartCountEls = document.querySelectorAll('.cart-count, .cart-count-header');

const sortSelect = document.getElementById('sort-select');
const productGrid = document.getElementById('product-grid');

/* --- Mobile Menu --- */
function toggleMenu() {
    mobileMenuOverlay.classList.toggle('open');
}

mobileToggle.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) toggleMenu();
});

/* --- Search Overlay --- */
function toggleSearch() {
    searchOverlay.classList.toggle('open');
    if (searchOverlay.classList.contains('open')) {
        setTimeout(() => searchInput.focus(), 100);
    }
}

searchIcon.addEventListener('click', toggleSearch);
closeSearchBtn.addEventListener('click', toggleSearch);
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) toggleSearch();
});

// Search Logic
function performSearch() {
    const query = searchInput.value.toLowerCase();
    let count = 0;
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').innerText.toLowerCase();
        const category = product.querySelector('.product-category').innerText.toLowerCase();
        
        if (title.includes(query) || category.includes(query)) {
            product.style.display = 'block';
            count++;
        } else {
            product.style.display = 'none';
        }
    });

    // Update count (optional, if we had a live count element)
    toggleSearch(); // Close overlay after search
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

/* --- Cart Functionality --- */
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

cartIcon.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

function updateCartUI() {
    // Update Counts
    cartCountEls.forEach(el => el.innerText = cart.length);

    // Update Items
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your bag is empty</div>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-remove" onclick="removeFromCart(${index})">Remove</div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Update Total
    cartTotalEl.innerText = '$' + total.toFixed(2);
}

function addToCart(title, price, image) {
    cart.push({ title, price, image });
    updateCartUI();
    
    // Open cart to show feedback
    if (!cartSidebar.classList.contains('open')) {
        toggleCart();
    }
}

// Global function for onclick access
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// Event Listeners for Add to Cart Buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const title = card.querySelector('.product-title').innerText;
        const priceText = card.querySelector('.product-price').innerText;
        const price = parseFloat(priceText.replace('$', ''));
        const image = card.querySelector('img').src;

        addToCart(title, price, image);
    });
});

/* --- Sorting Logic --- */
sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    const productArray = Array.from(products);

    if (value === 'price-low') {
        productArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price').innerText.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').innerText.replace('$', ''));
            return priceA - priceB;
        });
    } else if (value === 'price-high') {
        productArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price').innerText.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').innerText.replace('$', ''));
            return priceB - priceA;
        });
    }
    // Default: could resort by original index if we stored it, but keeping it simple

    // Re-append in new order
    productArray.forEach(product => productGrid.appendChild(product));
});

/* --- Sticky Header Effect --- */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

console.log("Interactive script loaded.");
