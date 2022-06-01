import * as Api from "/api.js";
import { addCommas } from "../useful-functions.js";

/* 초기화 initView(ul엘리먼트의 id, 최초 보여지는 li 엘리먼트 갯수, display 값) */
async function initView(el_id, view_item_count, style) {
    var menu = document.getElementById(el_id);
    var menu_list = menu.getElementsByClassName('item');
    var menu_count = menu_list.length;
    style = (typeof (style) != 'undefined') ? style : 'block';
    for (var i = 0; i < menu_count; i++){
        if (i < view_item_count)
            menu_list[i].style.display = style;
        else
            menu_list[i].style.display = 'none';
    }
}

/* 목록 이동 moveList(이동시킬방향 prev 또는 next, 이동시킬 ul 엘리먼트의 id, 보여질 목록 갯수, 이동시킬 갯수, display 값) */
async function moveList(direction, el_id, view_item_count, scroll_count, style) {
    var menu = document.getElementById(el_id);
    var menu_list = menu.getElementsByClassName('item');
    console.log(menu_list);
    var menu_count = menu_list.length;
    var start_no = 0;
    style = (typeof (style) != 'undefined') ? style : 'block';
    
    // 현재 보여지고 있는 엘리먼트의 시작을 확인    
    for (var i = 0; i < menu_count; i++){
        if (menu_list[i].style.display == style) {
            start_no = i; break;
        }
    }

    // 방향에 따른 이동    
    if (direction == 'next') {
        if (menu_list[menu_count - 1].style.display == style)
            return false;
        else {
            for (var i = 0; i < menu_count; i++){
                if (i >= start_no + scroll_count && i < start_no + scroll_count + view_item_count) {
                    menu_list[i].style.display = style;
                } else {
                    menu_list[i].style.display = 'none';
                }
            }
        }
    } else if (direction == 'prev') {
        if (menu_list[0].style.display == style)
            return false;
        else {
            for (var i = 0; i < menu_count; i++){
                if (i >= start_no - scroll_count && i < start_no - scroll_count + view_item_count) {
                    menu_list[i].style.display = style;
                } else {
                    menu_list[i].style.display = 'none';
                }
            }
        }
    }
}

// 8개씩 출력
initView('ul', 1);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

prevBtn.addEventListener("click", moveList('prev', 'ul', 4, 1, 'inline'));
nextBtn.addEventListener("click", moveList('next', 'ul', 4, 1, 'inline'));

// 상품 이름, 가격, 할인 가격 불러오기
async function handleProductList() {
    const productList = await Api.get("/api/product/productlist");
    console.log(productList);
    productList.forEach(function (product) {
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

        const productSalePrice = productPrice * 0.9;

        const itemBox = document.querySelector(".item-box");
        itemBox.innerHTML += `<li class="item" id="item-1">
                                <div class="thumbnail">
                                    <a href="">
                                        <img class="introimg" src="${productImg[0]}">
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
                            </li>`
        

    });

    // 이미지 슬라이드
    // const imgNum = [0, 1, 2, 3, 4, 5, 6, 7];

    // async function showImage() {
    //     const imgArray = productList.map(el => el.productImg);
    //     console.log(imgArray);
    //     const objImg = document.getElementsByClassName("introimg");

    //     for (let i = 0; i < 8; i++) {
    //         for (let j = 0; j < 2; j++){
    //             objImg[i].src = imgArray[i][j];
    //             console.log(objImg[i].src);
    //         }
    //     }

    //     if (imgNum[0] > 1) {
    //         for (let i = 0; i < 8; i++) {
    //             imgNum[i] = i;
    //         }
    //     }

    //     setTimeout(showImage, 2000);
    // }

    // showImage();
}

await handleProductList();