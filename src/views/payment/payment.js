import { createItem } from "../common.js";
import * as Api from '../api.js';
const ul = document.querySelector('.order-item-list');
const selectedEmail = document.querySelector('#select-email')
const paymentBtn = document.querySelector('#payment-btn');
const zipcode = document.querySelector('#zipcode');

const changeDomain = () => {
    document.querySelector('#input-email-tail').value = selectedEmail.value 
}

selectedEmail.addEventListener('change', changeDomain);

const dummycartItems = [
    {
        productName:"Short Sleeve Comfor Shirt-Navy",
        productSize: 5,
        productQuantity: 1,
        productprice: 35000,
        productTotalprice: 35000,
        productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    },
    {
        productName:"Short Sleeve Comfor Shirt-Navy",
        productSize: 5,
        productQuantity: 1,
        productprice: 25000,
        productTotalprice: 25000,
        productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    },
    {
        productName:"Short Sleeve Comfor Shirt-Navy3",
        productSize: 5,
        productQuantity: 1,
        productprice: 45000,
        productTotalprice: 45000,
        productImg: "https://anotheroffice.co.kr/web/upload/NNEditor/20220519/SANTIAGO_SLACKS_GRAPHITE_SANGSE.jpg"
    },
    {
        productName:"Short Sleeve Comfor Shirt-Navy",
        productSize: 5,
        productQuantity: 1,
        productprice: 25000,
        productTotalprice: 25000,
        productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    }
]

let sumPrice = 0;

// 더미데이터 -> 장바구니 데이터로 교체 예정
localStorage.setItem('cart', JSON.stringify(dummycartItems));
let orderItems = JSON.parse(localStorage.getItem('cart'));

const register = async() => {
    const address = document.querySelector('#input-address1').value + document.querySelector('#input-address2').value;
    const phoneNumber = '010' + document.querySelector('#input-middle-num').value + document.querySelector('#input-last-num').value
    const totalprice = sumPrice;
    
    const data = {address, phoneNumber, totalprice};
    if(phoneNumber.length < 11){
        alert('전화번호를 입력해주세요!')
        document.querySelector('#input-middle-num').focus();
    }
    else if(zipcode.value === ''){
        alert('주소를 입력해주세요')
        zipcode.focus();
    }
    else{
        const res = Api.post('/api/order/orderPage', data);
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
    
    document.querySelector('.sumprice').innerHTML = Number(sumPrice);
    document.querySelector('.totalprice').innerHTML = Number(sumPrice)
}

renderItems();