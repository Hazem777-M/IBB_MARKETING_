// عرض المنتجات المحفوظة في المفضلة
function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''; // تفريغ القائمة

    // استرداد المفضلة من localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<div class="empty-message">لا توجد منتجات في المفضلة.</div>';
        return;
    }

    // عرض المنتجات
    favorites.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="price">السعر: ${product.price}</p>
            <button onclick="removeFromFavorites('${product.id}')">إزالة من المفضلة</button>
            <button onclick="redirectToPurchase('${product.title}', '${product.price}')">شراء المنتج</button>
        `;

        favoritesList.appendChild(productElement);
    });
}

// توجيه المستخدم إلى صفحة الشراء مع تخزين اسم المنتج وسعره
function redirectToPurchase(productTitle, productPrice) {
    const selectedProduct = {
        title: productTitle,
        price: productPrice
    };

    // تخزين البيانات في localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

    // التوجيه إلى صفحة الشراء
    window.location.href = '../paymoney/paylocal.html';
}

// إزالة منتج من المفضلة
function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.id !== productId); // إزالة المنتج
    localStorage.setItem('favorites', JSON.stringify(favorites)); // تحديث localStorage
    renderFavorites(); // تحديث العرض
}

// تحميل المفضلة عند فتح الصفحة
document.addEventListener('DOMContentLoaded', renderFavorites);
