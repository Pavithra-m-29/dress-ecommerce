// ========================================
// Pink Peach Boutique - Filters JavaScript
// Advanced Filtering System
// ========================================

// Filter products based on all selected filters
function filterProducts() {
    let filteredProducts = [...products];
    
    // Get selected Age Groups
    const selectedAges = Array.from(document.querySelectorAll('input[name="age"]:checked'))
        .map(input => input.value);
    
    if (selectedAges.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedAges.includes(product.age)
        );
    }
    
    // Get Price Range
    const maxPrice = document.getElementById('priceRange').value;
    filteredProducts = filteredProducts.filter(product => 
        product.price <= maxPrice
    );
    
    // Update price display
    document.getElementById('priceValue').textContent = parseInt(maxPrice).toLocaleString('en-IN');
    
    // Get selected Colors
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
        .map(input => input.value);
    
    if (selectedColors.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedColors.includes(product.color)
        );
    }
    
    // Get selected Size
    const selectedSize = document.querySelector('select[name="size"]').value;
    
    if (selectedSize) {
        filteredProducts = filteredProducts.filter(product => 
            product.size === selectedSize
        );
    }
    
    // Get selected Rating
    const selectedRating = document.querySelector('input[name="rating"]:checked')?.value || '0';
    
    if (selectedRating > '0') {
        filteredProducts = filteredProducts.filter(product => 
            product.rating >= parseInt(selectedRating)
        );
    }
    
    // Get selected Dress Types
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked'))
        .map(input => input.value);
    
    if (selectedTypes.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedTypes.includes(product.type)
        );
    }
    
    // Display filtered products
    displayProducts(filteredProducts);
}

// Reset all filters
function resetFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset radio buttons
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        if (radio.value === '0') {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    
    // Reset price range
    document.getElementById('priceRange').value = 10000;
    document.getElementById('priceValue').textContent = '10,000';
    
    // Reset size dropdown
    document.querySelector('select[name="size"]').value = '';
    
    // Reset search
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').value = '';
    }
    
    // Reset sort
    if (document.getElementById('sortSelect')) {
        document.getElementById('sortSelect').value = 'default';
    }
    
    // Display all products
    displayProducts(products);
    
    showNotification('Filters reset! Showing all products.', 'success');
}

// Filter by age group only (for category cards on homepage)
function filterByAge(ageGroup) {
    const filteredProducts = products.filter(product => 
        product.age === ageGroup
    );
    
    displayProducts(filteredProducts);
    
    // Update checkboxes
    document.querySelectorAll('input[name="age"]').forEach(checkbox => {
        checkbox.checked = checkbox.value === ageGroup;
    });
}

// Real-time filter as user types/scrolls
let filterTimeout;

function setupRealTimeFilters() {
    // Price range slider
    const priceSlider = document.getElementById('priceRange');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
                filterProducts();
            }, 300);
        });
    }
    
    // Size dropdown
    const sizeSelect = document.querySelector('select[name="size"]');
    if (sizeSelect) {
        sizeSelect.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // All checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
                filterProducts();
            }, 300);
        });
    });
    
    // All radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            filterProducts();
        });
    });
}

// Initialize filters on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on products page
    if (document.querySelector('.filters-sidebar')) {
        setupRealTimeFilters();
        
        // Check for URL parameters (e.g., products.html?age=kids)
        const urlParams = new URLSearchParams(window.location.search);
        const ageParam = urlParams.get('age');
        
        if (ageParam) {
            // Auto-select age filter
            const ageCheckbox = document.querySelector(`input[name="age"][value="${ageParam}"]`);
            if (ageCheckbox) {
                ageCheckbox.checked = true;
                filterProducts();
            }
        }
    }
});

// Get filter summary
function getFilterSummary() {
    const summary = [];
    
    const selectedAges = Array.from(document.querySelectorAll('input[name="age"]:checked'))
        .map(input => input.options?.[input.selectedIndex]?.text || input.value);
    if (selectedAges.length > 0) {
        summary.push(`Age: ${selectedAges.join(', ')}`);
    }
    
    const maxPrice = document.getElementById('priceRange')?.value;
    if (maxPrice && maxPrice < '10000') {
        summary.push(`Price: Up to ₹${parseInt(maxPrice).toLocaleString('en-IN')}`);
    }
    
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
        .map(input => input.value.charAt(0).toUpperCase() + input.value.slice(1));
    if (selectedColors.length > 0) {
        summary.push(`Color: ${selectedColors.join(', ')}`);
    }
    
    const selectedSize = document.querySelector('select[name="size"]')?.value;
    if (selectedSize) {
        summary.push(`Size: ${selectedSize}`);
    }
    
    const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;
    if (selectedRating && selectedRating > '0') {
        summary.push(`Rating: ${'⭐'.repeat(parseInt(selectedRating))} & Above`);
    }
    
    return summary;
}

// Display active filters
function displayActiveFilters() {
    const summary = getFilterSummary();
    
    if (summary.length > 0) {
        const filterSummary = document.createElement('div');
        filterSummary.className = 'active-filters';
        filterSummary.style.cssText = `
            background: #F4C2C2;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
        `;
        
        filterSummary.innerHTML = `
            <strong>Active Filters:</strong>
            ${summary.map(s => `<span style="background: white; padding: 5px 12px; border-radius: 15px; font-size: 0.9em;">${s}</span>`).join('')}
            <button onclick="resetFilters()" style="background: #FF69B4; color: white; border: none; padding: 5px 15px; border-radius: 15px; cursor: pointer; margin-left: auto;">
                Clear All
            </button>
        `;
        
        const productsPage = document.querySelector('.products-main');
        if (productsPage) {
            productsPage.insertBefore(filterSummary, productsPage.firstChild);
        }
    }
}

console.log('Pink Peach Boutique - Filters.js loaded successfully! 🔍');