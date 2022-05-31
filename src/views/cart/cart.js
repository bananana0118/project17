import { addCommas } from "../useful-functions.js";
import { createItem } from "../utils.js";

// const dummycartItems = [
//     {
//         productName:"Short Sleeve Comfor Shirt-Navy",
//         productSize: 5,
//         productQuantity: 1,
//         productprice: 35000,
//         productTotalprice: 35000,
//         productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
//     },
//     {
//         productName:"Short Sleeve Comfor Shirt-Navy",
//         productSize: 5,
//         productQuantity: 1,
//         productprice: 25000,
//         productTotalprice: 25000,
//         productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
//     },
//     {
//         productName:"Short Sleeve Comfor Shirt-Navy3",
//         productSize: 5,
//         productQuantity: 1,
//         productprice: 45000,
//         productTotalprice: 45000,
//         productImg: "https://anotheroffice.co.kr/web/upload/NNEditor/20220519/SANTIAGO_SLACKS_GRAPHITE_SANGSE.jpg"
//     },
//     {
//         productName:"Short Sleeve Comfor Shirt-Navy",
//         productSize: 5,
//         productQuantity: 1,
//         productprice: 25000,
//         productTotalprice: 25000,
//         productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
//     }
// ]

const ul = document.querySelector('#list-ul');
const totalprice = document.getElementById('total-price');
// localStorage.setItem('cart', JSON.stringify(dummycartItems));
let cartItems = !JSON.parse(localStorage.getItem('cart')) ? [] : JSON.parse(localStorage.getItem('cart')) ;

const deleteAllBtn = document.getElementById('delete-all-item');
let sumPrice = 0

/* 컴포넌트 클릭시 이벤트 종류마다 분기되도록 리펙토링 예정*/

/**
 * ✅ 장바구니에서 상품을 삭제하는 함수
 * @param {event} e ,
 * 
 */
const deleteProduct  = (e) => {
    const d = Array.from(document.querySelectorAll('#delete-item'));
    const idx = d.indexOf(e.target)
    if(idx > -1){
        cartItems.splice(idx,1);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderPage(cartItems);
}

/**
 * ✅ 상품수량 증가 함수
 * @param {event} e 
 */
const plusQueantity = (e) => {
    const d = Array.from(document.querySelectorAll('#plus-btn'));
    const idx = d.indexOf(e.target);
    
    cartItems[idx].productQuantity += 1;
    cartItems[idx].productTotalprice = cartItems[idx].productQuantity * cartItems[idx].productprice
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderPage(cartItems= cartItems);
}

/**
 * ✅ 상품수량 감소 함수
 * @param {event} e 
 */
const minusQueantity = (e) => {
    const d = Array.from(document.querySelectorAll('#minus-btn'));
    const idx = d.indexOf(e.target);
    
    if(cartItems[idx].productQuantity > 0) {
        cartItems[idx].productQuantity -= 1;
    }
    
    cartItems[idx].productTotalprice = cartItems[idx].productQuantity * cartItems[idx].productprice
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderPage(cartItems= cartItems);
}

const deleteAll = () => {
    localStorage.removeItem('cart');
    cartItems = [];
    renderPage(cartItems);
}

deleteAllBtn.addEventListener('click', deleteAll);

const renderPage = (cartItems) => {
    sumPrice = 0
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }

    cartItems.map(el => {
        const li = createItem(el);
        ul.appendChild(li);
        sumPrice += el.productTotalprice;
    })
    
    /* template literal 에서 메소드 처리할 수 잇도록 리펙토링 예정 */
    const cartItems1 = Array.from(document.querySelectorAll('#delete-item'));
    const cartItems2 = Array.from(document.querySelectorAll('#minus-btn'));
    const cartItems3 = Array.from(document.querySelectorAll('#plus-btn'));
    cartItems1.map((cartItems) => cartItems.addEventListener('click', deleteProduct));
    cartItems2.map((cartItems) => cartItems.addEventListener('click', minusQueantity));
    cartItems3.map((cartItems) => cartItems.addEventListener('click', plusQueantity));

    totalprice.innerHTML = `
        ${addCommas(sumPrice)}<span style="font-productSize:14px">원</span>`;
    
    if(sumPrice > 30000){
        document.getElementById('ship-pay').innerHTML = '무료';
        document.getElementById('payment').innerHTML = `
            ${addCommas(sumPrice)}<span style="font-productSize:14px">원</span>`
    }
    else{
        document.getElementById('ship-pay').innerHTML = '3500원';
        document.getElementById('payment').innerHTML = `
            ${addCommas(sumPrice + 3500)}<span style="font-productSize:14px">원</span>`
    }
}

const load = async (cartItems) => {
    // cartItems = await Api.get('/product/productlist');
    renderPage(cartItems);
}

load(cartItems);