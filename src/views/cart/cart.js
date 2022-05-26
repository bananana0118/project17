const dummyData =[{
    product:"Short Sleeve Comfor Shirt-Navy",
    size: 5,
    quantity: 1,
    price: 35000,
    src: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    },
    {
        product:"Short Sleeve Comfor Shirt-Navy",
        size: 5,
        quantity: 1,
        price: 25000,
        src: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    },
    {
        product:"Short Sleeve Comfor Shirt-Navy3",
        size: 5,
        quantity: 1,
        price: 45000,
        src: "https://anotheroffice.co.kr/web/upload/NNEditor/20220519/SANTIAGO_SLACKS_GRAPHITE_SANGSE.jpg"
    },
    {
        product:"Short Sleeve Comfor Shirt-Navy",
        size: 5,
        quantity: 1,
        price: 25000,
        src: "//www.ptry.co.kr/web/product/tiny/202203/3de7dfaf7b490de83b166ed36d9505c2.jpg"
    }
]

const ul = document.querySelector('.item-list ul');
const totalprice = document.getElementById('total-price');
let sumPrice = 0

const deleteProduct  = () => {
    console.log(1234)
}
const renderPage = () =>{
    dummyData.map(el => {
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
                    <button>-</button>
                    <span>${el.quantity}</span>
                    <button>+</button>
                </div>
                <div>
                    <b>금액</b>
                    <span>KRW ${el.price}</span>
                </div>
            </div>
            <span id="delete-item" onclick= "${deleteProduct}">X</span>`   
        li.innerHTML = html;
        
        ul.appendChild(li);
        sumPrice += el.price
    })
    totalprice.innerHTML = sumPrice;
}

renderPage();