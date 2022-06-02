import * as Api from "/api.js";
import { addCommas } from "../useful-functions.js";

const urlParams = new URLSearchParams(location.search).get("productNo");

async function render() {
    const categoryList = await Api.get(`/api/product/get/category/1`);
    const cate = categoryList.map(el => el.productCategory);
    var categoryName;
    console.log(cate);

    switch (cate[0]) {
        case 1:
            categoryName = "상의"
            break;
        case 2:
            categoryName = "하의"
            break;
        case 3:
            categoryName = "양말"
            break;
    }

    const category = document.querySelector(".items");
    category.insertAdjacentHTML('afterbegin', `<div class="category">${categoryName}</div>
                <div class="category-detail">
                    <li><a href="">ALL</a></li>
                    <li><a href="">롱팬츠</a></li>
                    <li><a href="">숏팬츠</a></li>
                    <li><a href="">슬랙스</a></li>
                </div>
                `); 
    
    console.log(document.querySelector(".items"));
    await handleProductList()
}



// 상품 이름, 가격, 할인 가격 불러오기
async function handleProductList() {
    const productList = await Api.get("/api/product/productlist");
    console.log(productList);

    
    productList.forEach(function (product) {
        const {
            _id,
            productName,
            productPrice,
            productCategory,
            productDescription,
            productSize,
            productManufacturer,
            productImg,
            no,
        } = product;

        const productSalePrice = productPrice * 0.9;

        const itemBox = document.querySelector(".item-box");
        itemBox.innerHTML += `<li class="item" id="item-1">
                                <div class="thumbnail">
                                    <a href="../goods?productNo=${no}">
                                        <img class="introimg" src="">
                                        <div class="white_cover"> </div>
                                    </a>
                                </div>
                                <div class="description">
                                    <strong class="name">${productName}</strong>
                                    <ul class="product-description">
                                        <li class="price">원가 : KRW ${addCommas(productPrice)}</li>
                                        <li class="sale">할인가 : KRW ${addCommas(productSalePrice)}</li>
                                    </ul>
                                </div>
                            </li>`;
    });

    // 이미지 슬라이드
    async function showImage() {
        const imgArray = productList.map(el => el.productImg);
        const objImg = document.getElementsByClassName("introimg");

        for (let i = 0; i < imgArray.length; i++) {
            objImg[i].src = imgArray[i][0];
        }

        setInterval(() => {
            for (let i = 0; i < imgArray.length; i++) {
                objImg[i].src = imgArray[i][1];
            }
        }, 2000);

        setTimeout(showImage, 4000);
    }

    showImage();

}

//await handleProductList();
await render();