import * as Api from '/api.js';

/**
 * Template literal을 사용하여 생성된 html 반환
 * @param { 장바구니아이템 } item 
 * @returns li 반환
 */
 export const createItem = (item) => {
    const li = document.createElement('li');
    const html = `
        <div class="item-list-img">
            <img src="${item.productImg[0]}" class="item-img">
        </div>
        <div class="item-list-product">
            <div class="cart-list-name">
                <p>
                    <b>제품</b>
                    <a href="/product/detail.html?product_no=961&amp;cate_no=186">${item.productName}</a>
                </p>
                <p>
                    <b>사이즈</b>
                    <span> ${item.productSize}</span>
                </p>
            </div>
            <div class="cart-list-quantity">
                <b>수량</b>
                <button id="minus-btn">-</button>
                <span>${item.productQuantity}</span>
                <button id="plus-btn">+</button> 
            </div>
            <div>
                <b>금액</b>
                <span>KRW ${item.productTotalprice}</span>
            </div>
        </div>
        <div id="delete-item">X</div>`
    
    li.innerHTML = html;
    return li
}

export const createOrderItem = (item) => {
    const div = document.createElement('div');
    console.log(item)
    const date = new Date(item.createdAt);
    const style = item.status === "배송 준비 중" ? "color: blue" : "color:red"
    const html = `
        <div id="data-info">${date.toLocaleString()}</div>
            <div id="order-info">${item.orderProduct[0].productName} 외 ${item.orderProduct.length -1}종</div>
            <div id="user-name">${item.userId.email}</div>
            <div id="order-state-info" style="${style}">${item.status}</div>
            <button id="state-change-btn" >상태 변경</button>
        </div>
    `
    div.innerHTML = html;
    return div
}