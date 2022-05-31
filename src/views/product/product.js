<<<<<<< HEAD
import * as Api from '/api.js';

// 요소(element), input 혹은 상수
const productNameInput = document.querySelector('#productName');
const productPriceInput = document.querySelector('#productPrice');
const productCategoryInput = document.querySelector('#productCategory');
const productDescriptionInput = document.querySelector('#productDescription');
const productSizeInput = document.querySelector('#productSize');
const productManufacturerInput = document.querySelector('#productManufacturer');
=======
import * as Api from "/api.js";

const formData = new FormData();

// 요소(element), input 혹은 상수
const productNameInput = document.querySelector("#productName");
const productPriceInput = document.querySelector("#productPrice");
const productCategoryInput = document.querySelector(".Category");
const productDescriptionInput = document.querySelector("#productDescription");
const productSizeInput = document.querySelector("#productSize");
const productManufacturerInput = document.querySelector("#productManufacturer");
<<<<<<< HEAD
const productImageInput = document.querySelector("#productImg");
const submitButton = document.querySelector("#submitButton");
=======
const productImgInput = document.querySelector("#productImg");
>>>>>>> fb303ef8d3277db5f720f8fb0982fe591b93379e
>>>>>>> 0372d8a87f7567591245d0348eafa00602418429

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
<<<<<<< HEAD
  submitButton.addEventListener('click', handleSubmit);
=======
    submitButton.addEventListener("click", handleSubmit);
<<<<<<< HEAD
    productImageInput.addEventListener("change", (e) => {
        formData.append("image", e.target.files[0]);
        console.log(formData);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }
    });
=======
>>>>>>> fb303ef8d3277db5f720f8fb0982fe591b93379e
>>>>>>> 0372d8a87f7567591245d0348eafa00602418429
}

// 상품 등록 진행
async function handleSubmit(e) {
<<<<<<< HEAD
  e.preventDefault();

  const productName = productNameInput.value;
  const productPrice = productPriceInput.value;
  const productCategory = productCategoryInput.value;
  const productDescription = productDescriptionInput.value;
  const productSize = productSizeInput.value;
  const productManufacturer = productManufacturerInput.value;


  try {
    const data = { productName, productPrice, productCategory, productDescription, productSize, productManufacturer};

    await Api.post('/pro/product', data);

    alert(`정상적으로 등록되었습니다.`);


    // 기본 페이지로 이동
    window.location.href = '/product';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
=======
    e.preventDefault();
    const productName = productNameInput.value;
    const productPrice = productPriceInput.value;
    const productCategory = productCategoryInput.value;
    const productDescription = productDescriptionInput.value;
    const productSize = productSizeInput.value;
    const productManufacturer = productManufacturerInput.value;
    const productImg = formData;

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

<<<<<<< HEAD
        await Api.post("/api/product/up", formData);

        // await Api.post("/api/product/addproduct", data);
=======
        await Api.post("/api/product/addproduct", data);
>>>>>>> 0372d8a87f7567591245d0348eafa00602418429

        alert(`정상적으로 등록되었습니다.`);

        // 기본 페이지로 이동
        window.location.href = "/api/product/productlist";
    } catch (err) {
        console.error(err.stack);
        alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
    }
>>>>>>> fb303ef8d3277db5f720f8fb0982fe591b93379e
}
