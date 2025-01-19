function showPayments(type) {
  if (type === 'local') {
    document.getElementById('local-payments').style.display = 'block';
    document.getElementById('international-payments').style.display = 'none';
  } else {
    document.getElementById('local-payments').style.display = 'none';
    document.getElementById('international-payments').style.display = 'block';
  }
}

function selectPayment(company) {
  document.getElementById('paymentCompany').value = company;
  document.getElementById('paymentForm').style.display = 'block';
  
  // إظهار حقل رقم الحساب
  const accountNumberField = document.getElementById('customernumber');
  accountNumberField.style.display = 'block'; // التأكد من العرض الدائم للحقل

  window.scrollTo(0, document.getElementById('paymentForm').offsetTop);
}

// سعر الصرف الحالي (يمكن تحديثه من مصدر موثوق)
const exchangeRate = 530; // 1 دولار = 530 ريال يمني

// تحويل العملة بناءً على الاختيار
function convertCurrency() {
  const currency = document.getElementById('currency').value; // العملة المختارة
  const originalPrice = parseFloat(document.getElementById('productPrice').value); // السعر الأصلي بالدولار

  let convertedPrice;
  if (currency === 'YER') {
    // تحويل السعر من دولار أمريكي إلى ريال يمني
    convertedPrice = (originalPrice * exchangeRate).toFixed(2);
    document.getElementById('convertedPrice').value = `${convertedPrice} YER`; // تحديث الحقل بالريال
  } else {
    // إذا كانت العملة هي دولار أمريكي، عرض السعر الأصلي
    document.getElementById('convertedPrice').value = `${originalPrice.toFixed(2)} USD`;
  }
}

// تحميل البيانات عند فتح الصفحة
window.onload = function () {
  // استرداد بيانات المنتج من localStorage
  const productData = JSON.parse(localStorage.getItem('selectedProduct'));

  if (productData) {
    // تحديث الحقول بقيم المنتج
    document.getElementById('productName').value = productData.title; // اسم المنتج
    document.getElementById('productPrice').value = productData.price.replace('$', ''); // السعر الأساسي بالدولار
    convertCurrency(); // تحديث السعر افتراضيًا
  } else {
    alert('لم يتم تحديد منتج.'); // تنبيه إذا لم يتم تحديد المنتج
  }

  // إضافة مستمع لتغيير العملة
  document.getElementById('currency').addEventListener('change', convertCurrency);
};
