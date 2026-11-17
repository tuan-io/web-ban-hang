let cart = JSON.parse(localStorage.getItem('netabooks_cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();

  if (document.getElementById('cart-content-area')) {
    loadCartPage();
  }
});

function addCart(productName) {
  cart.push(productName);
  localStorage.setItem('netabooks_cart', JSON.stringify(cart));
  updateCartCount();

  alert(
    "Đã thêm \"" + productName + "\" vào giỏ hàng!\n" +
    "Tổng số sản phẩm hiện tại: " + cart.length
  );
}

function updateCartCount() {
  let cartElement = document.getElementById('cart-count');
  if (cartElement) {
    cartElement.innerText = cart.length;
  }
}

function loadCartPage() {
  let cartArea = document.getElementById('cart-content-area');
  let totalCountBadge = document.getElementById('cart-total-count');

  if (totalCountBadge) {
    totalCountBadge.innerText = cart.length;
  }

  if (!cartArea) return;

  if (cart.length === 0) {
    cartArea.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Chưa có sản phẩm nào trong giỏ hàng của bạn</p>
        <a href="bansach.html" class="btn" style="text-decoration:none;">Tiếp tục mua thêm</a>
      </div>
    `;
  } else {
    let html = '<ul class="cart-item-list">';
    cart.forEach((item, index) => {
      html += `
        <li class="cart-item">
          <span>📚 ${item}</span>
          <button class="btn-remove" onclick="removeItem(${index})">Xóa</button>
        </li>
      `;
    });
    html += '</ul>';
    html += `
      <div class="cart-actions">
        <a href="bansach.html" class="btn" style="margin-right: 10px; background: #6c757d; text-decoration:none;">Tiếp tục mua sắm</a>
        <a href="thanhtoan.html" class="btn" onclick="checkout(event)" style="text-decoration:none;">Thanh toán ngay</a>
      </div>
    `;
    cartArea.innerHTML = html;
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('netabooks_cart', JSON.stringify(cart));
  updateCartCount();
  loadCartPage();
}

function checkout(event) {
  if (event) event.preventDefault();
  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống!');
    return;
  }
  window.location.href = 'thanhtoan.html';
}