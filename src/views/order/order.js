import { addCommas } from "../useful-functions.js";

// const dummycartItems = [
//     {
//         productNo: 1,
//         productName:"Short Sleeve Comfor Shirt-Navy",
//         productSize: 5,
//         productQuantity: 1,
//         productprice: 35000,
//         productTotalprice: 35000,
//         productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
//     },
//     {
//         productNumber: 2,
//         productName:"Short Sleeve Comfor Shirt-Navy",
//         productSize: 5,
//         productQuantity: 1,
//         productprice: 25000,
//         productTotalprice: 25000,
//         productImg: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
//     },
//     {
//         productNumber: 3,
//         productName:"Short Sleeve Comfor Shirt-Navy3",
//         productSize: 5,
//         productQuantity: 1,
//         productprice: 45000,
//         productTotalprice: 45000,
//         productImg: "https://anotheroffice.co.kr/web/upload/NNEditor/20220519/SANTIAGO_SLACKS_GRAPHITE_SANGSE.jpg"
//     },
//     {
//         productNumber: 4,
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
localStorage.setItem('cart', JSON.stringify(dummycartItems));
let cartItems = !JSON.parse(localStorage.getItem('cart')) ? [] : JSON.parse(localStorage.getItem('cart')) ;
let sumPrice = 0

function createItem(item) {
    const li = document.createElement('li');
    const html = `
        <div class="item-list-info">
            <div class="item-list-img">
                <img src="${item.productImg}" class="item-img">
            </div>
            <div class="item-list-product">
                <div class="order-list-name">
                    <p>
                        <b>??????</b>
                        <a href="/product/detail.html?product_no=961&amp;cate_no=186">${item.productName}</a>
                    </p>
                    <br>
                    <p>
                        <b>?????????</b>
                        <span>${item.productSize}</span>
                    </p>
                </div>    
            </div>
        </div>
        <div class="order-list-date">
            <span>${item.productDate}</span>
        </div>
        <div class="order-list-number">
            <span>${item.orderNumber}</span>
        </div>
        <div class="order-list-quantity">
            <span>${item.productprice}???</span>
            <span>${item.productQuantity}???</span>
        </div>
        <div class="order-list-status">
            <span>${item.productStatus}</span> 
        </div>`
    
    li.innerHTML = html;
    return li
}

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

    totalprice.innerHTML = `<span>??? ?????? ?????? : ${addCommas(sumPrice)}???</span>`;
}

const load = async (cartItems) => {
    cartItems = await Api.get('/order/cart/orderPage');
    renderPage(cartItems);
}

load(cartItems);