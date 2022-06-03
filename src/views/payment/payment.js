import { createItem } from "../common.js";
import * as Api from '../api.js';
import { addCommas } from "../useful-functions.js";

const ul = document.querySelector('.order-item-list');
const selectedEmail = document.querySelector('#select-email')
const paymentBtn = document.querySelector('#payment-btn');
const zipcode = document.querySelector('#zipcode');

const changeDomain = () => {
    document.querySelector('#input-email-tail').value = selectedEmail.value 
}

selectedEmail.addEventListener('change', changeDomain);

let sumPrice = 0;

// 더미데이터 -> 장바구니 데이터로 교체 예정 
let orderItems = ! localStorage.getItem('buyOne') 
                 ? JSON.parse(localStorage.getItem('cart'))
                 : JSON.parse(localStorage.getItem('buyOne'));
localStorage.removeItem('buyOne');

const register = async () => {
    const orderProduct = orderItems;
    const address = document.querySelector('#input-address1').value + document.querySelector('#input-address2').value;
    const phoneNumber = '010' + document.querySelector('#input-middle-num').value + document.querySelector('#input-last-num').value
    const totalprice = sumPrice;
    
    const data = { orderProduct, address, phoneNumber, totalprice };
    if(phoneNumber.length < 11){
        alert('전화번호를 입력해주세요!')
        document.querySelector('#input-middle-num').focus();
    }
    else if(zipcode.value === ''){
        alert('주소를 입력해주세요')
        zipcode.focus();
    }
    else{
        const res = await Api.post('/api/order/cart', data);
        alert('결제가 완료되었습니다!')
        window.location.href = '/profile';
    }
}

paymentBtn.addEventListener('click', register);

const renderItems = () => {
    sumPrice = 0
    orderItems.map((el) => {
        const li = createItem(el);
        ul.appendChild(li);
        sumPrice += el.productTotalprice
    })
    
    document.querySelector('.sumprice').innerHTML = addCommas(Number(sumPrice));
    document.querySelector('.saleinfo').innerHTML = addCommas(Math.floor(Number(sumPrice) * 0.1));
    document.querySelector('.totalprice').innerHTML = addCommas(Math.floor(Number(sumPrice) * 0.9));
}

renderItems();