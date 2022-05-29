const itemImg = document.querySelector(".main-image img").src;
const itemName = document.querySelector(".name");
const itemPrice = document.querySelector(".price");
const itemDescription = document.querySelector(".description");
const sizeOption = document.querySelector(".size-option");
const quantityOption = document.querySelector(".quantity-option");
const cartBtn = document.querySelector(".cart");
const buyBtn = document.querySelector(".buy");

const basketAdd = document.querySelector(".basket-add");
const closeBtn = document.querySelector(".close");
const moveToCartBtn = document.querySelector(".move-to-cart");
const stayHereBtn = document.querySelector(".stay-here");

// function pushItem(currentCart) {
//     var itemData = {
//         product: itemName.textContent,
//         size: sizeOption.value,
//         quantity: quantityOption.value,
//         price: itemPrice.textContent,
//         src: itemImg,
//     };

//     localStorage.setItem("addCart", JSON.stringify(itemData));
//     currentCart.push(localStorage.getItem("addCart"));
//     localStorage.setItem("cart", JSON.stringify(currentCart));
//     //localStorage.removeItem("addCart");

//     basketAdd.style.display = "block";

//     const addShoppingCart = document.querySelector(".count");
//     var count = addShoppingCart.innerText;
//     count = Number(quantityOption.value);
//     console.log(count);
//     addShoppingCart.innerHTML = `<span>${count}</span>`;
// }

function addCart() {
    if (sizeOption.value === "0") {
        alert("필수 옵션을 선택해주세요.");
    } else {
        var currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

        var itemData = {
            product: itemName.textContent,
            size: sizeOption.value,
            quantity: quantityOption.value,
            price: itemPrice.textContent,
            src: itemImg
        };

        // 최신 추가 아이템
        localStorage.setItem("addCart", JSON.stringify(itemData));
        console.log(localStorage.getItem("addCart"));
        currentCart.push(localStorage.getItem("addCart"));
        var pushResult = JSON.stringify(currentCart)
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
            //.replace(/\\/g, "");
        
        console.log(pushResult);
        pushResult = pushResult.replace(/[\u0000-\u0019]+/g, "");
        console.log(pushResult);

        localStorage.setItem("cart", pushResult);
        //localStorage.removeItem("addCart");

        basketAdd.style.display = "block";

        const addShoppingCart = document.querySelector(".count");
        var count = Number(addShoppingCart.innerText);
        count += Number(quantityOption.value);
        addShoppingCart.innerHTML = `<span>${count}</span>`;

        // for (let i = 0; i < currentCart.length; i++) {
        //     console.log(i);
        //     console.log(itemName.textContent);
        //     if (currentCart[i].product === itemName.textContent) {
        //         var confirm = confirm("장바구니에 동일한 상품이 있습니다.<br>장바구니에 추가하시겠습니까?");
        //         if (confirm === true) {
        //             pushItem();
        //         } else {
        //             closeCart();
        //         }
        //     }
        // }
    }
}

function closeCart(e) {
    e.preventDefault();
    basketAdd.style.display = "none";
}

cartBtn.addEventListener("click", addCart);
closeBtn.addEventListener("click", closeCart);
stayHereBtn.addEventListener("click", closeCart);