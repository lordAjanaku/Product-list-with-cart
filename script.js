"use strict";
const addToCartButtons = document.querySelectorAll(".product__btn--cart");
const controlButtons = document.querySelectorAll(".product__btn--control");
const cart = document.querySelector(".cart");
const cartUnit = document.querySelector(".cart__unit");

const products = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
    unit: 0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
    unit: 0,
  },
];

// function to add or removed uint to the product state
function addRemoveUnit(obj, operation = "add") {
  operation === "add" ? obj.unit++ : obj.unit--;
}
// function to update the cart
function updateCart(product) {
  const datas = product.filter((item) => item.unit > 0);

  // total number of unit in the cart
  const allUnits = datas.reduce((unit, item) => {
    return (unit += item.unit);
  }, 0);

  // total price of product selected
  const totalAmount = datas.reduce((price, item) => {
    return (price += item.price * item.unit);
  }, 0);

  const dataHTML = datas
    .map((data) => {
      return `
      <li class="cart__product" data-cart-name="${data.name}">
      <div class="cart__product-details">
        <p class="cart__product-name">${data.name}</p>
        <p class="cart__product-price-per-unit">
          <span class="unit">${data.unit}x</span>
          <span class="price">@$${data.price}</span>
          <span class="total-price">$${(data.unit * data.price).toFixed(2)}</span>
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

  cartUnit.textContent = `(${allUnits})`;

  const contentHTML = `
    <div class="cart content">
      <ul class="cart__list">
        ${dataHTML}
      </ul>
      <div class="cart__total-wrapper">
        <p>Order Total</p>
        <span class="cart__total">$${totalAmount.toFixed(2)}</span>
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
  cart.innerHTML = contentHTML;
}

// cart button funtionality
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // (A) declare all major element needed
    const btn = e.target.closest(".product__btn--cart");
    const btnParent = e.target.closest(".product__btn-wrapper");
    const product = e.target.closest(".product");
    const productName = product.dataset.productName;
    const controlButton = document.createElement("button");

    // (B) hide and remove button from flow if product has 1 or more unit
    btn.classList.add("hidden");

    // (B) create a control button
    controlButton.className = "product__btn product__btn--control btn";
    controlButton.innerHTML = `
        <div id="remove-product" class="product-control" data-type="remove"><i class="fa-solid fa-minus"></i></div>
        <span class="unit">0</span>
        <div id="add-product" class="product-control" data-type="add"><i class="fa-solid fa-plus"></i></div>
    `;
    // replace cart button with control button
    btnParent.append(controlButton);

    // ============================================================
    // ============================================================
    // ============================================================
    // control button funtionality
    controlButton.addEventListener("click", (e) => {
      const ctrlBtn = e.target.closest(".product-control");

      if (!ctrlBtn) return; // return if the target is null/false

      // (A) add or remove unit from the product state
      addRemoveUnit(products.filter((item) => item.name === productName)[0], ctrlBtn.dataset.type);
      // (B) increase or decrease the product unit in the DOM
      product.dataset.productUnit = increDecre(product.dataset.productUnit, ctrlBtn.dataset.type);
      // (C) apply changes to the uint counter on the button when clicked
      controlButton.querySelector(".unit").textContent = product.dataset.productUnit;

      // if the product unit is less than one this block of code shoud be executed
      if (+product.dataset.productUnit < 1) {
        // (a) remove cart button from the hidden state
        btn.classList.toggle("hidden");
        // (b) remove control button from the DOM
        controlButton.remove();
        // (c) a tenary operator that controls what is displayed on cart component
        function resetCart() {
          cart.innerHTML = `
              <div class="cart">
                <img src="./assets/images/illustration-empty-cart.svg" alt="" />
                <p>Your added items will appear here</p>
              </div>
            `;
          cartUnit.textContent = `(0)`;
        }
        products.filter((item) => item.unit > 0).length < 1 ? resetCart() : updateCart(products);
        return;
      }
      // (D) call the update function
      updateCart(products);
    });

    // ============================================================
    // ============================================================
    // ============================================================

    // (D) add or remove unit from the product state
    addRemoveUnit(products.filter((item) => item.name === productName)[0]);
    // (E) increase or decrease the product unit in the DOM
    product.dataset.productUnit = increDecre(product.dataset.productUnit);
    // (F) apply changes to the uint counter on the button when clicked
    controlButton.querySelector(".unit").textContent = product.dataset.productUnit;

    // (G) call the update function
    updateCart(products);

    //  ============================================================

    const cartButton = document.querySelector(".cart__btn");
    cartButton.addEventListener("click", () => {
      const datas = products.filter((item) => item.unit > 0);
      const popupHTML = datas
        .map((data) => {
          return `
          <li class="checkout__product">
            <img src="./assets/images/image-${data.category.split(" ").join("-")}-thumbnail.jpg" alt="" />
            <div class="checkout__product-details">
              <p class="checkout__product-name">${data.name}</p>
              <p class="checkout__product-price-per-unit"><span class="unit">${
                data.unit
              }x</span> @$${data.price.toFixed(2)}</p>
            </div>
            <span class="checkout__product-price">$${(data.unit * data.price).toFixed(2)}</span>
          </li>
        `;
        })
        .join("");

      const contentHTML = `
          <div class="overlay">
            <div class="checkout">
              <img src="./assets/images/icon-order-confirmed.svg" alt="" />
              <h2 class="checkout__title">Order Confirmed</h2>
              <p class="checkout__subtitle">We hope you enjoy your food</p>

              <div class="checkout__list-wrapper">
                <ul class="checkout__list">
                  ${popupHTML}
                </ul>
                <div class="checkout__total-wrapper">
                  <p>Order Total</p>
                  <span class="checkout__total">$${datas
                    .reduce((amount, item) => (amount += item.price * item.unit), 0)
                    .toFixed(2)}</span>
                </div>
              </div>

              <button class="checkout__btn btn">Start New Order</button>
            </div>
          </div> 
        `;

      document.querySelector("body").insertAdjacentHTML("beforeend", contentHTML);
      document.querySelector(".overlay").style.display = "grid";
    });

    // ============================================================
    // ============================================================
    // ============================================================
    const cartList = document.querySelector(".cart__wrapper");
    cartList.addEventListener("click", (e) => {
      const closeProductButton = e.target.closest(".cart__product-close");

      if (!closeProductButton) return;

      if (products.filter((item) => item.unit > 0).length < 1) {
        cart.innerHTML = `
            <div class="cart">
              <img src="./assets/images/illustration-empty-cart.svg" alt="" />
              <p>Your added items will appear here</p>
            </div>
          `;
      }

      closeProductButton.addEventListener("click", (e) => {
        const productName = products.filter(
          (item) => item.name === e.target.closest(".cart__product").dataset.cartName
        )[0].name;
        products.filter((item) => item.name === productName)[0].unit = 0;

        const item = document.querySelector(`[data-product-name = "${productName}"]`);
        item.dataset.productUnit = 0;
        item.querySelector(".unit").textContent = 0;
        item.querySelector(".product__btn--control").remove();
        item.querySelector(".product__btn--cart").classList.toggle("hidden");
        e.target.closest(".cart__product").remove();
      });
      // ============================================================
      // ============================================================
      // ============================================================
    });
  });
});

// function that increase or decrease a number
function increDecre(num, operation = "add") {
  operation === "add" ? +num++ : +num--;
  return num;
}
