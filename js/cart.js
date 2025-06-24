const cartSidebar = document.getElementById("cart-sidebar");
const openCartBtn = document.querySelector(".modal_cart");
const closeCartBtn = document.getElementById("close-cart");

openCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("hidden");
  cartSidebar.classList.add("show");

  navbarDropdown.classList.remove("show");
  navbarHome.classList.remove("show");
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("show");
  setTimeout(() => {
    cartSidebar.classList.add("hidden");
  }, 300);
});

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCartSidebar() {
  const cartBody = document.querySelector(".cart-body");
  const subtotalEl = document.querySelector(".subtotal span:last-child");
  if (!cartBody || !subtotalEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartBody.innerHTML = "<p>There is no products in cart</p>";
    subtotalEl.innerText = "Rp 0";
    return;
  }

  let html = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const price = Number(item.price.replace(/[^\d]/g, ""));
    subtotal += price;

    html += `
        <div class="cart-item-sidebar" data-index="${index}">
          <img src="${item.img}" width="60" />
          <div class="cart-item-info">
            <p>${item.name}</p>
            <span>${item.price}</span>
            <span style="text-decoration: line-through;">${item.priceChange}</span>
          </div>
          <button class="remove-item">×</button>
        </div>
      `;
  });

  cartBody.innerHTML = html;
  subtotalEl.innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = this.closest(".cart-item-sidebar").dataset.index;
      removeCartItem(index);
      updateCartCount();
    });
  });
}

function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartSidebar();
  updateCartCount();
}

function handleAddToCart(e) {
  try {
    const productCard = e.target.closest(".product_card, .product-category");
    if (!productCard) return;

    const name =
      productCard.querySelector(".name_product, h5")?.innerText || "No name";
    const desc = productCard.querySelector(".name_title, p")?.innerText || "";
    const price = productCard.querySelector("span.price")?.innerText || "Rp 0";
    const priceChange =
      productCard.querySelector("span.price_change")?.innerText ||
      "Rp 0" ||
      "Rp 0";
    const img = productCard.querySelector("img")?.getAttribute("src") || "";

    const product = { name, desc, price, img, priceChange };

    const cart = getCart() || [];
    cart.push(product);
    saveCart(cart);

    renderCartSidebar();
    updateCartCount();
    showCartSidebar();
  } catch (error) {
    console.error("Error in handleAddToCart:", error);
  }
}

function showCartSidebar() {
  const sidebar = document.getElementById("cart-sidebar");
  if (sidebar) sidebar.classList.remove("hidden");
}

function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.innerText = cart.length;
    countEl.style.display = cart.length > 0 ? "flex" : "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", handleAddToCart);
  });

  const closeCartBtn = document.getElementById("close-cart");
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      document.getElementById("cart-sidebar")?.classList.add("hidden");
    });
  }

  renderCartSidebar();
  updateCartCount();
  // loadProduct();
});

function renderCartPage() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const emptyMsg = document.querySelector(".cart-empty-message");
  const subtotalEl = document.querySelector(".cart-summary__value");
  const totalEl = document.querySelector(".cart-summary__value--total");

  if (!cartItemsContainer || !subtotalEl || !totalEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    cartItemsContainer.innerHTML = "";
    subtotalEl.innerText = "Rp 0";
    totalEl.innerText = "Rp 0";
    return;
  }

  emptyMsg.style.display = "none";

  let html = `
      <ul class="cart-list__product">
        <li>Product</li>
        <li>Price</li>
        <li>Quantity</li>
        <li>Subtotal</li>
      </ul>
  `;
  let subtotal = 0;

  cart.forEach((item, index) => {
    const price = Number(item.price.replace(/[^\d]/g, ""));
    subtotal += price;

    html += `
        <div class="cart-item"  data-index="${index}">
          <img src="${item.img}" width="80" />
          <div class="cart-item-details" ">
            <p class="cart-item-name" >${item.name}</p>
            <p class="cart-item-price">${item.price}</p>
            <button class="remove-cart-item" "><img src="/images/Pin.png"</button>
          </div>  
        </div>
      `;
  });

  cartItemsContainer.innerHTML = html;
  subtotalEl.innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;
  totalEl.innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;

  document.querySelectorAll(".remove-cart-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = this.closest(".cart-item").dataset.index;
      removeCartItem(index);
      renderCartPage();
      updateCartCount();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartSidebar();
  renderCartPage();
  updateCartCount();
});
