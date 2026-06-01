// ========================================
// Pink Peach Boutique - Main JavaScript
// Cart Management & Common Functions
// ========================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const products = [
    {
        id: 1,
        name: "Pink Silk Saree",
        age: "adults",
        ageLabel: "Adults (25-35)",
        price: 2499,
        color: "pink",
        size: "L",
        type: "saree",
        rating: 5,
        reviews: 124,
        image: "https://imglink.ai/images?prompt=pink+silk+saree+for+women&width=800&height=1000&key=anonymous"
    },
    {
        id: 2,
        name: "Peach Kids Gown",
        age: "kids",
        ageLabel: "Kids (5-8)",
        price: 1299,
        color: "peach",
        size: "M",
        type: "gown",
        rating: 5,
        reviews: 89,
        image: "https://imglink.ai/images?prompt=peach+kids+gown&width=800&height=1000&key=anonymous"
    },
    {
        id: 3,
        name: "Pink Kurti Set",
        age: "teens",
        ageLabel: "Teens (16-20)",
        price: 899,
        color: "pink",
        size: "S",
        type: "kurti",
        rating: 4,
        reviews: 203,
        image: "https://imglink.ai/images?prompt=pink+kurti+set+for+women&width=800&height=1000&key=anonymous"
    },
    {
        id: 4,
        name: "Red Baby Dress",
        age: "babies",
        ageLabel: "Babies (0-2)",
        price: 599,
        color: "red",
        size: "XS",
        type: "dress",
        rating: 5,
        reviews: 156,
        image: "https://imglink.ai/images?prompt=red+baby+dress&width=800&height=1000&key=anonymous"
    },
    {
        id: 5,
        name: "Blue Salwar Suit",
        age: "adults",
        ageLabel: "Adults (30-40)",
        price: 1899,
        color: "blue",
        size: "XL",
        type: "salwar",
        rating: 4,
        reviews: 78,
        image: "https://imglink.ai/images?prompt=blue+salwar+suit+for+women&width=800&height=1000&key=anonymous"
    },
    {
        id: 6,
        name: "White Kids Dress",
        age: "kids",
        ageLabel: "Kids (3-6)",
        price: 799,
        color: "white",
        size: "S",
        type: "dress",
        rating: 4,
        reviews: 112,
        image: "https://imglink.ai/images?prompt=white+kids+dress&width=800&height=1000&key=anonymous"
    },
    {
        id: 7,
        name: "Peach Evening Gown",
        age: "teens",
        ageLabel: "Teens (14-18)",
        price: 1599,
        color: "peach",
        size: "M",
        type: "gown",
        rating: 5,
        reviews: 95,
        image: "https://imglink.ai/images?prompt=peach+evening+gown&width=800&height=1000&key=anonymous"
    },
    {
        id: 8,
        name: "Pink Designer Saree",
        age: "adults",
        ageLabel: "Adults (20-35)",
        price: 3499,
        color: "pink",
        size: "L",
        type: "saree",
        rating: 5,
        reviews: 245,
        image: "https://imglink.ai/images?prompt=pink+designer+saree&width=800&height=1000&key=anonymous"
    },
    {
        id: 9,
        name: "Red Kids Kurti",
        age: "kids",
        ageLabel: "Kids (7-10)",
        price: 649,
        color: "red",
        size: "M",
        type: "kurti",
        rating: 4,
        reviews: 67,
        image: "https://imglink.ai/images?prompt=red+kids+kurti&width=800&height=1000&key=anonymous"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    if (document.getElementById('productGrid')) {
        displayProducts(products);
    }
});

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert('Product not found!');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        alert(`${product.name} quantity updated!`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            age: product.ageLabel,
            quantity: 1
        });
        alert(`${product.name} added to cart!`);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
}

function displayProducts(productsToShow) {
    const productGrid = document.getElementById('productGrid');
    const productsCount = document.getElementById('productsCount');

    if (!productGrid) return;

    if (productsToShow.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        if (productsCount) productsCount.textContent = '0 products found';
        return;
    }

    let productsHTML = '';

    productsToShow.forEach(product => {
        productsHTML += `
            <div class="product-card" data-id="${product.id}" 
                 data-age="${product.age}" 
                 data-price="${product.price}" 
                 data-color="${product.color}" 
                 data-size="${product.size}" 
                 data-type="${product.type}" 
                 data-rating="${product.rating}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="age">Age: ${product.ageLabel}</p>
                <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
                <p class="rating">
                    <span class="stars">${'⭐'.repeat(product.rating)}</span>
                    <span class="review-count">(${product.reviews} reviews)</span>
                </p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn-reviews" onclick="viewReviews(${product.id})" style="margin-top: 5px; background: white; color: #FF69B4; border: 2px solid #FF69B4;">
                    <i class="fas fa-star"></i> View Reviews
                </button>
            </div>
        `;
    });

    productGrid.innerHTML = productsHTML;

    if (productsCount) {
        productsCount.textContent = `Showing ${productsToShow.length} product${productsToShow.length !== 1 ? 's' : ''}`;
    }
}

function viewReviews(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Viewing reviews for: ${product.name}\nRating: ${product.rating}/5 ⭐\nTotal Reviews: ${product.reviews}`);
    window.location.href = `product-detail.html?id=${productId}`;
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.ageLabel.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}

function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    let sortedProducts = [...products];

    switch (sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    displayProducts(sortedProducts);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

console.log('Pink Peach Boutique - Main.js loaded successfully! 🌸');