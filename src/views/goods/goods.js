import * as Api from "/api.js";
import { addCommas } from "../useful-functions.js";

window.onload = async function () {
    const product = await Api.get("/api/product/get/43");
    console.log(product);

    const {
        productNo,
        productName,
        productPrice,
        productCategory,
        productDescription,
        productSize,
        productManufacturer,
        productImg
    } = product;

    const section = document.querySelector(".section");
    section.innerHTML = `<div class="main-image">
                            <img src="${productImg[0]}">
                        </div>
                        <div class="image-info">
                            <ul>
                                <li class="name">${productName}</li>
                                <li class="price">KRW ${addCommas(productPrice)}</li>
                                <br>
                                <hr>
                                <li class="description">${productDescription}
                                    <div class="delivery-info">
                                        구매혜택 ${addCommas(productPrice * 0.01)} 포인트 적립예정<br>
                                        배송 방법 택배<br>
                                        배송비 3,500원 (30,000원 이상 무료배송)
                                    </div>
                                </li>
                                <li class="quantity">수량</li>
                                <input type="number" value="1" class="quantity-option" />
                                <li class="size">SIZE*</li>
                                <select class="size-option">
                                    <option value="0">SIZE (필수)</option>
                                    <option value="1">S</option>
                                    <option value="2">M</option>
                                    <option value="3">L</option>
                                </select>
                                <br><br>
                            </ul>
                            <button class="cartBtn">장바구니</button>
                            <button class="buyBtn">구매하기</button>
                        </div>`;
    
    let cartItems = !JSON.parse(localStorage.getItem('cart')) ? [] : JSON.parse(localStorage.getItem('cart'));

    const sizeOption = document.querySelector(".size-option");
    const quantityOption = document.querySelector(".quantity-option");
    const cartBtn = document.querySelector(".cartBtn");
    const buyBtn = document.querySelector(".buyBtn");

    const basketAdd = document.querySelector(".basket-add");
    const closeBtn = document.querySelector(".close");
    const moveToCartBtn = document.querySelector(".move-to-cart");
    const stayHereBtn = document.querySelector(".stay-here");

        
    cartBtn.addEventListener("click", addCart);
    closeBtn.addEventListener("click", closeCart);
    stayHereBtn.addEventListener("click", closeCart);
    buyBtn.addEventListener("click", moveToBuy);
    moveToCartBtn.addEventListener("click", moveToCart);

    function addCart() {
        if (sizeOption.value === "0") {
            alert("필수 옵션을 선택해주세요.");
        } else {
            var itemData = {
                productNo,
                productName,
                productCategory,
                productDescription,
                productPrice: Number(productPrice),
                productSize: Number(sizeOption.value),
                productQuantity: Number(quantityOption.value),
                productManufacturer,
                productImg
            };


            //추후 id로 변경
            if (cartItems.find(x => x.productNo === itemData.productNo && x.productSize === itemData.productSize)) {
                var confirm = window.confirm(`장바구니에 동일한 상품이 있습니다. \n장바구니로 이동하시겠어요?`);
                if (confirm === true) {
                    window.location.href ="/cart";
                } else {
                    //아래 분기를 안타고 return
                    return
                }    
            }   

            // 최신 추가 아이템
            localStorage.setItem("addCart", JSON.stringify(itemData));
            cartItems.push(JSON.parse(localStorage.getItem("addCart")));

            localStorage.setItem("cart", JSON.stringify(cartItems));
            localStorage.removeItem("addCart");

            // 장바구니에 추가 되었다는 Modal
            basketAdd.style.display = "block";

            // 뒷배경 흐릿하게
            document.querySelector("section").style.opacity = 0.2;
            
        }
    }

    function closeCart(e) {
        e.preventDefault();
        basketAdd.style.display = "none";
        document.querySelector("section").style.opacity = 1;
    }

    function moveToCart(e) {
        e.preventDefault();

    }

    function moveToBuy(e) {
        if (sizeOption.value === "0") {
            alert("필수 옵션을 선택해주세요.");
        } else {
            var itemData = {
                productNo,
                productName,
                productCategory,
                productDescription,
                productPrice: Number(productPrice),
                productSize: Number(sizeOption.value),
                productQuantity: Number(quantityOption.value),
                productManufacturer,
                productImg
            };

            localStorage.setItem("buyItem", JSON.stringify(itemData));

            window.location.href = "/payment";
        }
    }
}

