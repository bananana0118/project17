const itemName = document.querySelector(".name");
const itemPrice = document.querySelector(".price");
const itemDescription = document.querySelector(".description");
const deliveryInfo = document.querySelector(".delivery-info");
const sizeOption = document.querySelector(".size-option");
const cartBtn = document.querySelector(".cart");
const buyBtn = document.querySelector(".buy");

const basketAdd = document.querySelector(".basket-add");
const closeBtn = document.querySelector(".close");
const moveToCartBtn = document.querySelector(".move-to-cart");
const stayHereBtn = document.querySelector(".stay-here");

function addCart() {
    if (sizeOption.value === "1") {
        alert("필수 옵션을 선택해주세요.");
    }
    else {
        basketAdd.style.display = "block";

        const addShoppingCart = document.querySelector(".count");
        var count = addShoppingCart.innerText;
        count++;
        addShoppingCart.innerHTML = `<span>${count}</span>`;
        window.localStorage.setItem("numberOfCartItem", count);
    }
}

function closeCart(e) {
    e.preventDefault();
    basketAdd.style.display = "none";

    const addShoppingCart = document.querySelector(".count");
    addShoppingCart.innerHTML = `<span>${ window.localStorage.getItem("numberOfCartItem") }</span>`;
}

cartBtn.addEventListener("click", addCart);
closeBtn.addEventListener("click", closeCart);
stayHereBtn.addEventListener("click", closeCart);