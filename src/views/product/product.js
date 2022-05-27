import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const productNameInput = document.querySelector("#productName");
const productPriceInput = document.querySelector("#productPrice");
const productCategoryInput = document.querySelector(
    'input[name="productCategory"]'
);
const productDescriptionInput = document.querySelector("#productDescription");
const productSizeInput = document.querySelector("#productSize");
const productManufacturerInput = document.querySelector("#productManufacturer");
const productImgInput = document.querySelector("#productImg");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    submitButton.addEventListener("click", handleSubmit);
}

// 상품 등록 진행
async function handleSubmit(e) {
    e.preventDefault();
    console.log(productCategoryInput);
    const productName = productNameInput.value;
    const productPrice = productPriceInput.value;
    const productCategory = productCategoryInput.value;
    const productDescription = productDescriptionInput.value;
    const productSize = productSizeInput.value;
    const productManufacturer = productManufacturerInput.value;
    const productImg = productImgInput.value;

    try {
        const data = {
            productName,
            productPrice,
            productCategory,
            productDescription,
            productSize,
            productManufacturer,
            productImg,
        };

        await Api.post("/product/addproduct", data);

        alert(`정상적으로 등록되었습니다.`);

        // 기본 페이지로 이동
        window.location.href = "/product/productlist";
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
}
