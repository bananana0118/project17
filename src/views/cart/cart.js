import { addCommas } from "../useful-functions.js";
const dummyData = [{
    product:"Short Sleeve Comfor Shirt-Navy",
    size: 5,
    quantity: 1,
    price: 35000,
    totalprice: 35000,
    src: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    },
    {
        product:"Short Sleeve Comfor Shirt-Navy",
        size: 5,
        quantity: 1,
        price: 25000,
        totalprice: 25000,
        src: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    },
    {
        product:"Short Sleeve Comfor Shirt-Navy3",
        size: 5,
        quantity: 1,
        price: 45000,
        totalprice: 45000,
        src: "https://anotheroffice.co.kr/web/upload/NNEditor/20220519/SANTIAGO_SLACKS_GRAPHITE_SANGSE.jpg"
    },
    {
        product:"Short Sleeve Comfor Shirt-Navy",
        size: 5,
        quantity: 1,
        price: 25000,
        totalprice: 25000,
        src: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    }
]

const ul = document.querySelector('.item-list ul');
const totalprice = document.getElementById('total-price');
localStorage.setItem('cart', JSON.stringify(dummyData));
let data = JSON.parse(localStorage.getItem('cart'));
const deleteAllBtn = document.getElementById('delete-all-item');


let sumPrice = 0


/* 컴포넌트 클릭시 이벤트 종류마다 분기되도록 리펙토링 예정*/
const deleteProduct  = (e) => {
    const d = Array.from(document.querySelectorAll('#delete-item'));
    const idx = d.indexOf(e.target)
    if(idx > -1){
        data.splice(idx,1);
    }
    localStorage.setItem('cart', JSON.stringify(data));
    renderPage();
}

const plusQueantity = (e) => {
    const d = Array.from(document.querySelectorAll('#plus-btn'));
    const idx = d.indexOf(e.target);
    data[idx].quantity += 1;
    data[idx].totalprice = data[idx].quantity * data[idx].price
    localStorage.setItem('cart', JSON.stringify(data));
    renderPage();
}

const minusQueantity = (e) => {
    const d = Array.from(document.querySelectorAll('#minus-btn'));
    const idx = d.indexOf(e.target);
    
    if(data[idx].quantity > 0) {
        data[idx].quantity -= 1;
    }
    data[idx].totalprice = data[idx].quantity * data[idx].price
    localStorage.setItem('cart', JSON.stringify(data));
    renderPage();
}

const deleteAll = () => {
    localStorage.removeItem('cart');
    data = [];
    renderPage();
}

deleteAllBtn.addEventListener('click', deleteAll);

const renderPage = () =>{
    sumPrice = 0
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }

    data.map(el => {
        const li = document.createElement('li');
        const html = `<div class="item-list-img">
                <img src="${el.src}" class="item-img">
            </div>
            <div class="item-list-product">
                <div class="cart-list-name">
                    <p>
                        <b>제품</b>
                        <a href="/product/detail.html?product_no=961&amp;cate_no=186">${el.product}</a>
                    </p>
                    <p>
                        <b>사이즈</b>
                        <span> ${el.size}</span>
                    </p>
                </div>
                <div class="cart-list-quantity">
                    <b>수량</b>
                    <button id="minus-btn">-</button>
                    <span>${el.quantity}</span>
                    <button id="plus-btn">+</button> 
                </div>
                <div>
                    <b>금액</b>
                    <span>KRW ${el.totalprice}</span>
                </div>
            </div>
            <div id="delete-item">X</div>`   
        li.innerHTML = html;
        ul.appendChild(li);
        sumPrice += el.totalprice;
    })
    
    /* template literal 에서 메소드 처리할 수 잇도록 리펙토링 예정*/
    const datas = Array.from(document.querySelectorAll('#delete-item'));
    const datas1 = Array.from(document.querySelectorAll('#minus-btn'));
    const datas2 = Array.from(document.querySelectorAll('#plus-btn'));
    datas.map((data) => data.addEventListener('click', deleteProduct));
    datas1.map((data) => data.addEventListener('click', minusQueantity));
    datas2.map((data) => data.addEventListener('click', plusQueantity));

    totalprice.innerHTML = addCommas(sumPrice) + `<span style="font-size:14px">원</span>`;
    
    if(sumPrice > 30000){
        document.getElementById('ship-pay').innerHTML = '무료';
        document.getElementById('payment').innerHTML = addCommas(sumPrice) + `<span style="font-size:14px">원</span>`
    }
    else{
        document.getElementById('ship-pay').innerHTML = '3500원';
        document.getElementById('payment').innerHTML = addCommas(sumPrice + 3500) + `<span style="font-size:14px">원</span>`
    }
}

renderPage();