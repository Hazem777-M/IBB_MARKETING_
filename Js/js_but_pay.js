function addToFavorites(productId) {
    const product = document.getElementById(productId);

    // استخراج بيانات المنتج
    const productData = {
        id: productId,
        image: product.querySelector('img').src,
        title: product.querySelector('h3').textContent,
        description: product.querySelector('p').textContent,
        
    };

    // استرداد المفضلة الحالية من localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // التحقق من عدم إضافة المنتج مسبقًا
    if (!favorites.find(item => item.id === productId)) {
        favorites.push(productData);
        localStorage.setItem('favorites', JSON.stringify(favorites)); // تحديث localStorage
        alert('تمت إضافة المنتج إلى المفضلة!');
    } else {
        alert('المنتج مضاف بالفعل إلى المفضلة!');
    }
}

//  ---------------------------- JS for - Price + Name of product --------------------------------
function storeProductData(productId) {
    const product = document.getElementById(productId);

    // استخراج بيانات المنتج
    const productData = {
        title: product.querySelector('h3').textContent,
        price: product.querySelector('.price').textContent.replace('$', '') // إزالة النص الإضافي
    };

    // تخزين البيانات في localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
}
//------------------------------------------
function addToFavorites(productId) {
    const product = document.getElementById(productId);

    // استخراج بيانات المنتج بما في ذلك السعر
    const productData = {
        id: productId,
        image: product.querySelector('img').src,
        title: product.querySelector('h3').textContent,
        description: product.querySelector('p').textContent,
        price: product.querySelector('.price').textContent.replace('السعر: ', '') // إزالة النص الإضافي
    };

    // استرداد المفضلة الحالية من localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // التحقق من عدم إضافة المنتج مسبقًا
    if (!favorites.find(item => item.id === productId)) {
        favorites.push(productData);
        localStorage.setItem('favorites', JSON.stringify(favorites)); // تحديث localStorage
        alert('تمت إضافة المنتج إلى المفضلة!');
    } else {
        alert('المنتج مضاف بالفعل إلى المفضلة!');
    }
}

// ---------------------------- JS for - Price + Name of product --------------------------------
function storeProductData(productId) {
    const product = document.getElementById(productId);

    // استخراج بيانات المنتج
    const productData = {
        title: product.querySelector('h3').textContent,
        price: product.querySelector('.price').textContent.replace('السعر: ', '') // إزالة النص الإضافي
    };

    // تخزين البيانات في localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
}