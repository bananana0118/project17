import * as Api from "../api.js";
import { isAdmin } from "../common.js";

const modifyBtn = document.querySelector('.product-modify-btn')
const deleteBtn = document.querySelector('.product-delete-btn');
const inputFile = document.querySelector('#image-input')
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const productSalePrice = document.querySelector('#product-sale-price');
const productCategory = document.querySelector('#input-category');
const productManufacturer = document.querySelector('#input-manufacturer');
const productSize = document.querySelector('#input-size');
const productQuantity = document.querySelector('#input-quantity');    
const productDescription = document.querySelector('#input-product-detail')
const inputItems = document.getElementsByTagName('input');

productName.focus();
let uploadFiles = []

async function getProductInfo() {
    const urlParams = new URLSearchParams(location.search).get("productNo");
    const product = !urlParams
        ? await Api.get(`/api/product/get/40`)
        : await Api.get(`/api/product/get/${urlParams}`);
    productName.value = product.productName;
    productCategory.value  = product.productCategory;
    productPrice.value  = product.productPrice;
    productManufacturer.value  = product.productManufacturer;
    productDescription.value = product.productDescription;
    productSalePrice.value = (product.productPrice) * 0.9;
}

getProductInfo();

// ================================================
// PATCH : 상품 정보 수정 (오류 생길 수 있음)
// ================================================
const updateItemInfo = async function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search).get("productNo");
    const product = !urlParams
        ? await Api.get(`/api/product/get/40`)
        : await Api.get(`/api/product/get/${urlParams}`);

    const name = productName.value;
    const category = productCategory.value;
    const price = productPrice.value;
    const manufacturer = productManufacturer.value;
    const description = productDescription.value;
    const size = productSize.value;
    try {
        const data = {
            name,
            category,
            price,
            manufacturer,
            description,
            size,
        }
        await Api.patch(`/api/product/patch/${product.no}`, "", data);
        alert("상품 정보가 수정되었습니다.");
        location.href = "/manageproduct";
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}

// ===================================================
// DELETE:상품 정보 지우기
// ===================================================
const deleteItem = async function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search).get("productNo");
    const product = !urlParams
        ? await Api.get(`/api/product/get/40`)
        : await Api.get(`/api/product/get/${urlParams}`);
    
    const confirm = window.confirm("정말 삭제하시나요?");
    if (confirm) {
        try {
            const password = prompt("관리자 계정 비밀번호를 입력해주세요");
            await Api.delete(`/api/product/delete/${product.no}`, "", { password: password });
            alert("상품 삭제 완료");
            location.href = "/manageproduct";
        } catch (err) {
            console.log(err.stack);
            alert(`${err.message}`);
        }
    }
}

modifyBtn.addEventListener("click", updateItemInfo);
deleteBtn.addEventListener("click", deleteItem);

isAdmin();
/* 리펙토링 필요 
*  EnterKey 입력시 focus 이동 
*/
function keyevent(event){
    const code = event.key;
    const idx = Array.from(inputItems).indexOf(event.target);
    
    if(code === 'Enter'){
        event.preventDefault();
        if(event.shiftKey){}
        else{
            if(idx === (inputItems.length -2)){}
            else{  
                inputItems[idx+1].focus();
            }
        }
    }
}
 
for(var i=0; i<inputItems.length; i++){
    inputItems[i].addEventListener('keydown', keyevent)        
};

const register = async () => {
    const data = { 
                productName: productName.value, 
                productPrice: productPrice.value,
                productCategory: 0,
                productSize: productSize.value,
                productDescription: productDescription.value,
                productQuantity: productQuantity.value,
                productManufacturer: productManufacturer.value,
                files: uploadFiles
            }

    if(data.productName === ''){
        alert('상품명을 입력해주세요!')
        productName.focus();
    }else if(data.productCategory === ''){
        alert('카테고리를 선택해주세요!!')
        productCategory.focus();
    }else if(data.productPrice === ''){
        alert('상품가격을 입력해주세요!')
        productPrice.focus();
    }else if(data.productQuantity === ''){
        alert('상품 수량을 선택해주세요!')
        productQuantity.focus();
    }
    else if(data.productManufacturer === ''){
        alert('상품제조사를 입력해주세요!')
        productManufacturer.focus();
    }
    else if(data.productSize === ''){
        alert('상품 사이즈를 선택해주세요!')
        productSize.focus();
    }
    else if(data.productDescription === ''){
        alert('상품정보를 입력해주세요!!')
        productDescription.focus();
    }
    else{
        // console.log(formData)
        // const res = await Api.post("/api/product/addproduct", formData);
        
        if(res.ok){
            window.location.href = "/";
        }
    } 
}

/**
 * 
 * @param {event} e 
 * @param {URLFIle} file 
 * @returns 
 */
const createElement = (e, file) => {
    const img = document.createElement('img');
    
    img.setAttribute('src', e.target.result);
    img.setAttribute('data-file', file.name);
    img.addEventListener('click', function(){
        console.log('clicked')
    })
    return img;
}

/**
 * 
 * @param {event} e 
 * 추가된 파일의 이미지 파일을 가지고 온다.
 */
const getImageFiles = (e) => {
    const files = e.currentTarget.files;
    
    if(files.length > 3){
        alert('사진은 3장 이하로 올려주세요!')
        return 
    }
    
    const imgPreview = document.querySelector('.image-preview');
    
    let lastImg = imgPreview.lastChild;
    while(lastImg){
        imgPreview.removeChild(lastImg);
        lastImg = imgPreview.lastChild;
    }

    [...files].forEach(file =>{
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const preview = createElement(e, file);
            imgPreview.appendChild(preview);
        }
        
        reader.readAsDataURL(file);
    })
}

inputFile.addEventListener('change', getImageFiles)

