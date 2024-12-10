"use strict";
const buttonContainer = document.querySelectorAll(".product__btn-wrapper");
const body = document.querySelector("body");
const cart = document.querySelector(".cart");
const cartTotalUnit = document.querySelector(".cart__unit");

const state = {
  products: [
    {
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
      unit: 0,
    },
    {
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7.0,
      unit: 0,
    },
    {
      name: "Macaron Mix of Five",
      category: "Macaron",
      price: 8.0,
      unit: 0,
    },
    {
      name: "Classic Tiramisu",
      category: "Tiramisu",
      price: 5.5,
      unit: 0,
    },
    {
      name: "Pistachio Baklava",
      category: "Baklava",
      price: 4.0,
      unit: 0,
    },
    {
      name: "Lemon Meringue Pie",
      category: "Pie",
      price: 5.0,
      unit: 0,
    },
    {
      name: "Red Velvet Cake",
      category: "Cake",
      price: 4.5,
      unit: 0,
    },
    {
      name: "Salted Caramel Brownie",
      category: "Brownie",
      price: 4.5,
      unit: 0,
    },
    {
      name: "Vanilla Panna Cotta",
      category: "Panna Cotta",
      price: 6.5,
      unit: 0,
    },
  ],
  cart: [],
};

// delegate event to parent element
buttonContainer.forEach((button) => {
  //   add event to each wrapper button
  button.addEventListener("click", (e) => {
    const productContainer = e.target.closest(".product");
    const buttonParent = e.target.closest(".product__btn-wrapper");
    const buttonControl = e.target.closest(".product__btn--control");

    const productName = productContainer.dataset.productName;

    const index = state.products.findIndex((item) => item.name === productName);
    const product = { ...state.products[index] };

    // if thc the control button is not present
    if (!buttonControl) {
      // (a) update the cart
      addProductToCart(product);
      cart.innerHTML = updateCart(state.cart);
      productContainer.dataset.productUnit = state.cart.find((item) => item.name === productName).unit;
      cartTotalUnit.innerHTML = `(${state.cart.reduce((total, item) => (total += item.unit), 0)})`;

      // (b) replace the button html
      buttonParent.innerHTML = `
        <div class="product__btn product__btn--control btn">
            <div id="remove-product" class="product-control" data-type="remove"><i class="fa-solid fa-minus"></i></div>
            <span class="unit">${product.unit}</span>
            <div id="add-product" class="product-control" data-type="add"><i class="fa-solid fa-plus"></i></div>
        </div>
    `;

      return;
    }

    // if the button control is being clicked
    if (e.target.closest(".product-control")) {
      const operation = e.target.closest(".product-control").dataset.type;

      // (a) update the cart base on button being clicked
      const unit = buttonParent.querySelector(".unit");

      // (b) add or remove base on button opertion
      operation === "add" ? addProductToCart(product) : removeProductToCart(product, productContainer);
      cartTotalUnit.innerHTML = `(${state.cart.reduce((total, item) => (total += item.unit), 0)})`;
      // (c) update unit element
      unit.textContent = state.cart.find((item) => item.name === product.name).unit;

      // (d) update DOM unit for the product
      productContainer.dataset.productUnit = state.cart.find((item) => item.name === productName).unit;

      // delete a product from the cart state
      if (state.cart.find((item) => item.name === productName).unit === 0) {
        const index = state.cart.indexOf(state.cart.find((item) => item.name === productName));
        state.cart.splice(index, 1);
      }

      if (state.cart.length === 0) {
        resetCart();
        return;
      }

      cart.innerHTML = updateCart(state.cart);
    }
  });
});

// =======================================================================

cart.addEventListener("click", (e) => {
  // () delete the product from the cart
  if (e.target.closest(".cart__product-close")) {
    const cartProduct = e.target.closest(".cart__product");
    const cartName = cartProduct.dataset.cartName;

    const index = state.cart.findIndex((item) => item.name === cartName);
    state.cart.splice(index, 1);

    const product = document.querySelector(`[data-product-name = "${cartName}"]`);
    resetProduct(product);

    if (state.cart.length < 1) {
      resetCart();

      return;
    }
    cart.innerHTML = updateCart(state.cart);
    cartTotalUnit.innerHTML = `(${state.cart.reduce((total, item) => (total += item.unit), 0)})`;
  }

  if (e.target.closest(".cart__btn")) {
    const popupComponent = document.createElement("div");
    popupComponent.className = "overlay";

    if (document.querySelector(".overlay")) {
      const overlay = document.querySelector(".overlay");
      overlay.innerHTML = updateCheckout(state.cart);
      overlay.classList.toggle("hidden");

      return;
    }

    const cartHTML = state.cart
      .map((item) => {
        return `
        <li class="checkout__product">
          <img src="./assets/images/image-${item.category.toLowerCase().split(" ").join("-")}-thumbnail.jpg" alt="" />
          <div class="checkout__product-details">
            <p class="checkout__product-name">${item.name}</p>
            <p class="checkout__product-price-per-unit"><span class="unit">${item.unit}x</span> @$${item.price}</p>
          </div>
          <span class="checkout__product-price">$${(item.unit * item.price).toFixed(2)}</span>
        </li>
      `;
      })
      .join("");

    popupComponent.innerHTML = `
      <div class="checkout">
        <img src="./assets/images/icon-order-confirmed.svg" alt="" />
        <h2 class="checkout__title">Order Confirmed</h2>
        <p class="checkout__subtitle">We hope you enjoy your food</p>

        <div class="checkout__list-wrapper">
          <ul class="checkout__list">
            ${cartHTML}
          </ul>
          <div class="checkout__total-wrapper">
            <p>Order Total</p>
            <span class="checkout__total">${state.cart
              .reduce((amount, product) => (amount += product.unit * product.price), 0)
              .toFixed(2)}</span>
          </div>
        </div>

        <button class="checkout__btn btn">Start New Order</button>
      </div>
    `;

    body.insertAdjacentElement("beforeend", popupComponent);
  }
});

// =======================================================================

body.addEventListener("click", (e) => {
  if (e.target.matches(".overlay")) {
    e.target.classList.toggle("hidden");
    e.target.innerHTML = "";
    return;
  }

  if (e.target.matches(".checkout__btn")) {
    resetCart();
    cartTotalUnit.innerHTML = `(${state.cart.reduce((total, item) => (total += item.unit), 0)})`;

    const products = document.querySelectorAll(".product");
    products.forEach((item) => resetProduct(item));
    document.querySelector(".overlay").remove();
  }
});

// =======================================================================
function addProductToCart(product) {
  const filteredProduct = state.cart.find((item) => item.name === product.name);

  if (filteredProduct) {
    state.cart.find((item) => item.name === product.name).unit++;
    return;
  }

  state.cart.push(product);
  state.cart.find((item) => item.name === product.name).unit++;
}

// =======================================================================

function removeProductToCart(product, productDOM) {
  const filteredProduct = state.cart.find((item) => item.name === product.name);

  if (filteredProduct) {
    if (filteredProduct.unit <= 1) {
      if (filteredProduct) state.cart.find((item) => item.name === product.name).unit--;

      resetProduct(productDOM);

      return;
    }

    if (filteredProduct) state.cart.find((item) => item.name === product.name).unit--;

    return;
  }
}

// =======================================================================

function updateCart(products) {
  const productHTML = products
    .map((item) => {
      return `
    <li class="cart__product" data-cart-name="${item.name}">
      <div class="cart__product-details">
        <p class="cart__product-name">${item.name}</p>
        <p class="cart__product-price-per-unit">
          <span class="unit">${item.unit}x</span>
          <span class="price">@$${item.price}</span>
          <span class="total-price">$${(item.price * item.unit).toFixed(2)}</span>
        </p>
      </div>
      <button class="cart__product-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
          <path
            fill="#CAAFA7"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </button>
    </li>
    `;
    })
    .join("");

  const contentHTML = `
      <div class="cart content">
        <ul class="cart__list">
          ${productHTML}
        </ul>
        <div class="cart__total-wrapper">
          <p>Order Total</p>
          <span class="cart__total">$${products
            .reduce((amount, product) => (amount += product.unit * product.price), 0)
            .toFixed(2)}</span>
        </div>
        <div class="cart__banner">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
            <path
              fill="#1EA575"
              d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
            />
            <path
              fill="#1EA575"
              d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
            />
          </svg>
          <p>
            This is a
            <strong>carbon-neutral</strong>
            delivery
          </p>
        </div>
        <button class="cart__btn btn">Start New Order</button>
      </div>
    `;

  return contentHTML; 
} 

// =======================================================================

function updateCheckout(products) {
  const cartHTML = products
    .map((item) => {
      return `
        <li class="checkout__product">
          <img src="./assets/images/image-${item.category.split(" ").join("-")}-thumbnail.jpg" alt="" />
          <div class="checkout__product-details">
            <p class="checkout__product-name">${item.name}</p>
            <p class="checkout__product-price-per-unit"><span class="unit">${item.unit}x</span> @$${item.price}</p>
          </div>
          <span class="checkout__product-price">$${(item.unit * item.price).toFixed(2)}</span>
        </li>
      `;
    })
    .join("");

  const contentHTML = `
      <div class="checkout">
        <img src="./assets/images/icon-order-confirmed.svg" alt="" />
        <h2 class="checkout__title">Order Confirmed</h2>
        <p class="checkout__subtitle">We hope you enjoy your food</p>

        <div class="checkout__list-wrapper">
          <ul class="checkout__list">
            ${cartHTML}
          </ul>
          <div class="checkout__total-wrapper">
            <p>Order Total</p>
            <span class="checkout__total">${products
              .reduce((amount, product) => (amount += product.unit * product.price), 0)
              .toFixed(2)}</span>
          </div>
        </div>

        <button class="checkout__btn btn">Start New Order</button>
      </div>
    `;

  return contentHTML;
}

// =======================================================================

function resetCart() {
  cart.innerHTML = `
    <img src="./assets/images/illustration-empty-cart.svg" alt="" />
    <p>Your added items will appear here</p>
  `;
  state.cart = [];
}

// =======================================================================

function resetProduct(product) {
  product.dataset.productUnit = 0;
  product.querySelector(".product__btn-wrapper").innerHTML = `
    <button class="product__btn product__btn--cart btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
        <g fill="#C73B0F" clip-path="url(#a)">
          <path
            d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
          />
          <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
        </g>
        <defs>
          <clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z" /></clipPath>
        </defs>
      </svg>
      <span>Add to Cart</span> 
    </button>
  `;
}
