import { addCommas } from "../useful-functions.js";
import { createItem } from "../common.js";
import * as Api from "../api.js";
import { loadCartItem } from "../navAndLogin.js";

const ul = document.querySelector("#list-ul");
const totalprice = document.getElementById("total-price");
const paymentBtn = document.getElementById("payment-btn")
const deleteAllBtn = document.getElementById("delete-all-item");

let cartItems = !JSON.parse(localStorage.getItem("cart"))
    ? []
    : JSON.parse(localStorage.getItem("cart"));

let sumPrice = 0;

const onClickPaymentBtn = () => {
    window.location.href = '/payment';
}

paymentBtn.addEventListener('click', onClickPaymentBtn);

/* 컴포넌트 클릭시 이벤트 종류마다 분기되도록 리펙토링 예정*/

/**
 * ✅ 장바구니에서 상품을 삭제하는 함수
 * @param {event} e ,
 *
 */
const deleteProduct = (e) => {
    const d = Array.from(document.querySelectorAll("#delete-item"));
    const idx = d.indexOf(e.target);
    if (idx > -1) {
        cartItems.splice(idx, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderPage(cartItems);
};

/**
 * ✅ 상품수량 증가 함수
 * @param {event} e
 */
const plusQueantity = (e) => {
    const d = Array.from(document.querySelectorAll("#plus-btn"));
    const idx = d.indexOf(e.target);

    cartItems[idx].productQuantity += 1;
    cartItems[idx].productTotalprice =
        cartItems[idx].productQuantity * cartItems[idx].productPrice;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderPage((cartItems = cartItems));
};

/**
 * ✅ 상품수량 감소 함수
 * @param {event} e
 */
const minusQueantity = (e) => {
    const d = Array.from(document.querySelectorAll("#minus-btn"));
    const idx = d.indexOf(e.target);

    if (cartItems[idx].productQuantity > 0) {
        cartItems[idx].productQuantity -= 1;
    }

    cartItems[idx].productTotalprice =
        cartItems[idx].productQuantity * cartItems[idx].productPrice;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderPage((cartItems = cartItems));
};

const deleteAll = () => {
    localStorage.removeItem("cart");
    cartItems = [];
    renderPage(cartItems);
};

deleteAllBtn.addEventListener("click", deleteAll);

const renderPage = (cartItems) => {
    sumPrice = 0;
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }

    cartItems.map((el) => {
        const li = createItem(el);
        ul.appendChild(li);
        sumPrice += el.productTotalprice;
    });

    /* template literal 에서 메소드 처리할 수 잇도록 리펙토링 예정 */
    const cartItems1 = Array.from(document.querySelectorAll("#delete-item"));
    const cartItems2 = Array.from(document.querySelectorAll("#minus-btn"));
    const cartItems3 = Array.from(document.querySelectorAll("#plus-btn"));
    cartItems1.map((cartItems) =>
        cartItems.addEventListener("click", deleteProduct)
    );
    cartItems2.map((cartItems) =>
        cartItems.addEventListener("click", minusQueantity)
    );
    cartItems3.map((cartItems) =>
        cartItems.addEventListener("click", plusQueantity)
    );

    totalprice.innerHTML = `
        ${addCommas(sumPrice*0.9)}<span style="font-productSize:14px">원</span>`;

    if (sumPrice > 30000) {
        document.getElementById("ship-pay").innerHTML = "무료";
        document.getElementById("payment").innerHTML = `
            ${addCommas(
                sumPrice*0.9
            )}<span style="font-productSize:14px">원</span>`;
    } else {
        document.getElementById("ship-pay").innerHTML = "3,500원";
        document.getElementById("payment").innerHTML = `
            ${addCommas(
                sumPrice + 3500
            )}<span style="font-productSize:14px">원</span>`;
    }
    loadCartItem();
};

const load = async (cartItems) => {
    renderPage(cartItems);
};

load(cartItems);
