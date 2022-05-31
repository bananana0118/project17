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

        // 추후 id로 변경
        if (currentCart.find(x => x.product === `"${itemName.textContent}"`)) {
            var confirm = confirm("장바구니에 동일한 상품이 있습니다.<br>장바구니에 추가하시겠습니까?");
            if (confirm === true) {
                
            } else {
                closeCart();
            }    
        }   

        // 최신 추가 아이템
        localStorage.setItem("addCart", JSON.stringify(itemData));
        console.log(JSON.parse(localStorage.getItem("addCart")));
        currentCart.push(JSON.parse(localStorage.getItem("addCart")));
        console.log(currentCart);

        localStorage.setItem("cart", JSON.stringify(currentCart));
        localStorage.removeItem("addCart");

        // 장바구니에 추가 되었다는 Modal
        basketAdd.style.display = "block";

        // 뒷배경 흐릿하게
        document.querySelector("section").style.opacity = 0.2;

        // Nav 장바구니 아이콘 위에 숫자
        const addShoppingCart = document.querySelector(".count");
        var count = Number(currentCart.length);
        count += Number(quantityOption.value);
        addShoppingCart.innerHTML = `<span>${count}</span>`;
    }
}

function closeCart(e) {
    e.preventDefault();
    basketAdd.style.display = "none";
    document.querySelector("section").style.opacity = 1;
}

cartBtn.addEventListener("click", addCart);
closeBtn.addEventListener("click", closeCart);
stayHereBtn.addEventListener("click", closeCart);