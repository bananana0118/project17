// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import { randomId, addCommas } from "/useful-functions.js";

const clickForMoreBtn = document.querySelector("#clickForMore");
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

function moveToShopAll(e) {
    e.preventDefault();
    window.location.href = "/shop";
}

async function bestItem() {
    var productList = await Api.get("/api/product/productlist/7");
    const productNo = productList.map((el) => el.no);
    const productName = productList.map((el) => el.productName);
    const productPrice = productList.map((el) => el.productPrice);

    for (let i = 0; i < 7; i++) {
        const productItems = document.querySelector(".product-items");
        productItems.innerHTML += `<li class="product-item">
                        <div class="product-item_imgCover">
                            <a href="/goods?productNo=${productNo[i]}">
                                <img src="" class="introimg">
                            </a>
                        </div>
                        <div class="product-item_info">
                            <span>Name : ${productName[i]}</span>
                            <span>Price : KRW ${addCommas(
                                productPrice[i]
                            )}</span>
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
        }, 3000);

        setTimeout(showImage, 6000);
    }
    showImage();
}

bestItem();

clickForMoreBtn.addEventListener("click", moveToShopAll);
mainSlides.addEventListener("click", moveToShopAll);

const bestBtn = document.querySelector(".best-btn");
bestBtn.addEventListener("click", () => {
    window.scrollTo({ top: 9999, behavior: 'smooth' });
});