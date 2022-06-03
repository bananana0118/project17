// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import { randomId, addCommas } from "/useful-functions.js";

const clickForMoreBtn = document.querySelector("#clickForMore");
// const topBtn = document.querySelector("#top");
// const bottomBtn = document.querySelector("#bottom");
// const outerBtn = document.querySelector("#outer");
// const shoesBtn = document.querySelector("#shoes");

const mainSlides = document.querySelector(".main-slide_contents");
const mainSlide = document.querySelectorAll(".main-slide_content");

let currentSlide = 0;

setInterval(function () {
    let from;
    let to;
    if (matchMedia("screen and (max-width: 700px").matches) {
        from = -(100 * currentSlide);
        to = from - 100;
    } else {
        from = -(50 * currentSlide);
        to = from - 50;
    }
    mainSlides.animate(
        {
            marginLeft: [from + "%", to + "%"],
        },
        {
            duration: 1000,
            iterations: 1,
            easing: "ease",
            fill: "both",
        }
    );
    currentSlide++;
    if (currentSlide === mainSlide.length - 2) {
        currentSlide = 0;
    }
}, 2000);

// async function getDataFromApi() {
//     // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
//     const data = await Api.get("/api/user/data");
//     const random = randomId();

//     console.log({ data });
//     console.log({ random });
// }

function moveToShopAll(e) {
    e.preventDefault();
    window.location.href = "/shop";
}

<<<<<<< Updated upstream
async function bestItem() {
    var productList = await Api.get("/api/product/productlist");
    const productName = productList.map(el => el.productName);
    const productPrice = productList.map(el => el.productPrice);

    for (let i = 0; i < 7; i++) {
        const productItems = document.querySelector(".product-items");
        productItems.innerHTML += `<li class="product-item">
                        <div class="product-item_imgCover">
                            <img src="" href="" class="introimg">
                        </div>
                        <div class="product-item_info">
                            <span>Name : ${productName[i]}</span>
                            <span>Price : KRW ${addCommas(productPrice[i])}</span>
                        </div>
                    </li>`;
    }

    async function showImage() {
        const imgArray = productList.map((el) => el.productImg);
        const objImg = document.getElementsByClassName("introimg");

        for (let i = 0; i < 7; i++) {
            objImg[i].src = imgArray[i][0];
        }

        setInterval(() => {
            for (let i = 0; i < 7; i++) {
                objImg[i].src = imgArray[i][1];
            }
        }, 2000);

        setTimeout(showImage, 4000);
    }
    showImage();
}

bestItem();
// function moveToShopTop(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=1";
// }

// function moveToShopBottom(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=2";
// }

// function moveToShopOuter(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=3";
// }

// function moveToShopShoes(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=4";
// }

clickForMoreBtn.addEventListener("click", moveToShopAll);
mainSlides.addEventListener("click", moveToShopAll);

// topBtn.addEventListener("click", moveToShopTop);
// bottomBtn.addEventListener("click", moveToShopBottom);
// outerBtn.addEventListener("click", moveToShopOuter);
// shoesBtn.addEventListener("click", moveToShopShoes);
=======
// function moveToShopTop(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=1";
// }

// function moveToShopBottom(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=2";
// }

// function moveToShopOuter(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=3";
// }

// function moveToShopShoes(e) {
//     e.preventDefault();
//     window.location.href = "/shop?category=4";
// }

clickForMoreBtn.addEventListener("click", moveToShopAll);
mainSlides.addEventListener("click", moveToShopAll);

// topBtn.addEventListener("click", moveToShopTop);
// bottomBtn.addEventListener("click", moveToShopBottom);
// outerBtn.addEventListener("click", moveToShopOuter);
// shoesBtn.addEventListener("click", moveToShopShoes);
>>>>>>> Stashed changes
