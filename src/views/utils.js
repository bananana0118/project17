/**
 * Template literal을 사용하여 생성된 html 반환
 * @param { 장바구니아이템 } item 
 * @returns li 반환
 */
 export const createItem = (item) => {
    const li = document.createElement('li');
    const html = `
        <div class="item-list-img">
            <img src="${item.productImg}" class="item-img">
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

