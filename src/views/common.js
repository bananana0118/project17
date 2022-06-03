import * as Api from '/api.js';
import { addCommas } from "../useful-functions.js";

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
                    <a href="${item.href}">${item.productName}</a>
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
                <span>KRW ${addCommas(item.productTotalprice)}</span>
            </div>
        </div>
        <div id="delete-item">X</div>`
    
    li.innerHTML = html;
    return li
}

export const createOrderItem = (item) => {
    const div = document.createElement('div');
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


/**
 * 
 * @param {myOrder} item 
 */
export const createMyOrderItem = (item) => {
    const div = document.createElement('div');
    const createDate = new Date(item.createdAt);
    const date = createDate.getFullYear() + "-" + (createDate.getMonth() + 1) + "-" + createDate.getDate() + " " + createDate.getHours() + ":" + createDate.getMinutes() + ":" + createDate.getSeconds();
    const style = item.status === "배송 준비 중" ? "color: blue" : "color:red"
    const html = `
            <div id="myOrderDate">${date.toLocaleString()}</div>
            <div id="myOrderInfo">${item.orderProduct[0].productName} 외 ${item.orderProduct.length -1}</div>
            <div id="myOrderState" style="${style}">${item.status}</div>
            <div id="askInfo">문의</div>
        `
    div.classList.add('myOrderBody')
    div.innerHTML = html;
    return div
}

export const isAdmin = async () => {
    const userInfo = await Api.get('/api/profile/myProfile')
    
    if(userInfo.role !== "admin"){
        alert("권한이 없습니다!!!")
        window.location.href = '/';
        return 
    }
}