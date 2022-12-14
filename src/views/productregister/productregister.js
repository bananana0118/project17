import * as Api from "../api.js";

const submmitBtn = document.querySelector('.product-register-btn')
const inputFile = document.querySelector('#image-input')
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const productCategory = document.querySelector('#input-category');
const productManufacturer = document.querySelector('#input-manufacturer');
const productSize = document.querySelector('#input-size');
const productQuantity = document.querySelector('#input-quantity');    
const productDescription = document.querySelector('#input-product-detail')
const inputItems = document.getElementsByName('product-input')

inputItems[0].focus();
let uploadFiles = []
let formData = new FormData();

const onLoad = async () => {
    const userInfo = await Api.get('/api/profile/myProfile')
    
    if(userInfo.role !== "admin"){
        alert("권한이 없습니다!!!")
        window.location.href = '/';
        return 
    }
}

onLoad();
/* 리펙토링 필요 
*  EnterKey 입력시 focus 이동 
*/
function keyevent(event){
    const code = event.key;
    const idx = Array.from(inputItems).indexOf(event.target);
    
    if(code === 'Enter'){
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
        console.log(formData)
        const res = await Api.post("/api/product/addproduct", formData);
        
        if(res.ok){
            window.location.href = "/";
        }
    } 
}

submmitBtn.addEventListener('click', register)

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
    formData.append('files', files);
    
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

